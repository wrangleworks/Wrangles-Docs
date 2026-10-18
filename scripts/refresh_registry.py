#!/usr/bin/env python3
"""Refresh documentation from a local WranglesPY checkout, without installing it.

python3 scripts/refresh_registry.py --checkout /path/to/WranglesPY
Requires npm ci in wrangles-docs. No DB writes, credentials, AI, commits or pushes.
Changes are staged in a temporary copy and copied back only after checks/build.
Per-entry rejection keeps the previous source and Markdown. Reports are always
written to --report-dir (default registry-refresh-report, suitable for artifacts).
"""
import argparse
import copy
import json
import hashlib
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import urllib.error
import urllib.request


def required(schema, name):
    """Unconditional requiredness from the schema, never from Python defaults."""
    if not isinstance(schema, dict):
        return False
    return (name in schema.get('required', [])
            or any(required(branch, name) for branch in schema.get('allOf', []))
            or any(schema.get(key) and all(required(branch, name) for branch in schema[key])
                   for key in ('anyOf', 'oneOf')))


def properties(schema):
    result = dict(schema.get('properties', {})) if isinstance(schema, dict) else {}
    if isinstance(schema, dict):
        for key in ('allOf', 'anyOf', 'oneOf'):
            for branch in schema.get(key, []):
                result.update(properties(branch))
        for key in ('then', 'else'):
            if key in schema:
                result.update(properties(schema[key]))
    return result


def mismatches(snapshot):
    """Deterministic observations; a Python/schema Required difference is not fatal."""
    findings = []
    for key, definition in sorted(snapshot['wrangle_definitions'].items()):
        schema = snapshot['wrangles'].get(key, {}).get('schema')
        if schema is None:
            findings.append({'key': key, 'code': 'missing_literal_schema',
                             'policy': 'maths uses math; other new entries are skipped'})
            continue
        fields = properties(schema)
        signature_names = {parameter['name'] for parameter in definition['parameters']}
        for name in sorted(set(fields) - signature_names - {'if', 'where', 'where_params'}):
            findings.append({'key': key, 'parameter': name, 'code': 'schema_parameter_not_in_python_signature',
                             'policy': 'include_in_documentation',
                             'python_accepts_kwargs': bool(definition.get('variadic', {}).get('keyword'))})
        for parameter in definition['parameters']:
            name = parameter['name']
            if name in ('df', 'functions', 'error') or (name == 'variables' and name not in fields):
                continue
            if name not in fields:
                findings.append({'key': key, 'parameter': name, 'code': 'python_parameter_not_in_schema'})
            elif required(schema, name) != parameter['required']:
                findings.append({'key': key, 'parameter': name, 'code': 'required_difference',
                                 'schema_required': required(schema, name),
                                 'python_required': parameter['required'], 'policy': 'schema_wins'})
    return findings


def run(command, cwd):
    result = subprocess.run(command, cwd=cwd, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if result.returncode:
        raise RuntimeError(f"{' '.join(map(str, command))}\n{result.stdout}")
    return result.stdout


def save(path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n')


def generated_files(stage):
    return {file for relative in ('wrangles-docs/registry-docs', 'wrangles-docs/static/registry',
                                 'wrangles-docs/static/schemas/recipes', 'wrangles-docs/static/py')
            for file in (stage / relative).rglob('*') if file.is_file()}


def fingerprint(root):
    """Guard authoritative inputs against concurrent editing during a long build."""
    return {str(file.relative_to(root)): hashlib.sha256(file.read_bytes()).hexdigest()
            for file in (root / 'registry').rglob('*') if file.is_file()}


def source_file(key):
    if not re.fullmatch(r'[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)?', key):
        raise ValueError(f'Unsupported key/path: {key}')
    parts = key.split('.')
    return Path('registry/wrangles') / (parts[0] if len(parts) == 2 else '_root') / (parts[-1].replace('_', '-') + '.md')


def documentation_lookup(root, key):
    """Find existing prose first. Never scrape arbitrary HTML into Markdown."""
    matches = []
    filename = key.split('.')[-1].replace('_', '-').lower()
    for directory in ('wrangles-docs/docs', 'wrangles-docs/registry-docs/python'):
        for path in (root / directory).rglob('*.md'):
            if path.stem.lower().replace('_', '-') == filename:
                matches.append(str(path.relative_to(root)))
    if matches:
        return {'local_candidates': matches, 'action': 'review_existing_prose_before_new_page'}
    # The original site groups wrangles on namespace pages, not one URL per key.
    namespace = key.split('.')[0] if '.' in key else 'standalone'
    url = 'https://wrangles.io/en/python/recipes/wrangles/' + namespace
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'Wrangles-Docs-schema-refresh'})
        with urllib.request.urlopen(request, timeout=10) as response:
            body = response.read(2_000_000).decode('utf-8', errors='replace')
            # Existing web guidance is reported for review; HTML is not an authoring source.
            found = key in body and 'page not found' not in body.lower()
            return {'url': url, 'found': found, 'action': 'schema_description_only; web_prose_requires_review'}
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        return {'url': url, 'found': False, 'error': str(error), 'action': 'schema_description_only'}


def refresh(root, checkout, report_dir, skip_build=False):
    report = {'status': 'running', 'accepted': [], 'rejected': [], 'observations': [], 'documentation': {}}
    applying = False
    report_dir.mkdir(parents=True, exist_ok=True)
    try:
        original_inputs = fingerprint(root)
        with tempfile.TemporaryDirectory(prefix='wrangles-registry-refresh-') as temporary:
            stage = Path(temporary)
            shutil.copy2(root / 'frontmatter.json', stage / 'frontmatter.json')
            for directory in ('registry', 'scripts', 'wrangles-docs'):
                shutil.copytree(root / directory, stage / directory,
                                ignore=shutil.ignore_patterns('node_modules', '.venv', 'build', '.docusaurus', '__pycache__'))
            (stage / 'wrangles-docs/node_modules').symlink_to(root / 'wrangles-docs/node_modules', target_is_directory=True)
            site = stage / 'wrangles-docs'
            snapshot_path = stage / 'registry/runtime/wranglespy-source-schema.json'
            accepted = json.loads(snapshot_path.read_text())
            candidate_path = stage / 'candidate.json'
            run(['node', 'scripts/import-wranglespy-schema.cjs', str(checkout), '--snapshot-only', str(candidate_path)], site)
            candidate = json.loads(candidate_path.read_text())
            report['requested_source'] = candidate['source']
            report['observations'] = mismatches(candidate)
            # Each accepted entry records its exact pin; retained data is never
            # represented as if it came from the newly requested revision.
            accepted.setdefault('entry_sources', {key: accepted['source'] for key in accepted['wrangle_definitions']})
            accepted['source'] = candidate['source']
            save(snapshot_path, accepted)
            # Connectors remain at their own saved pin until individually refreshed.
            run(['node', 'scripts/refresh-connector-pins.cjs'], site)
            accepted = json.loads(snapshot_path.read_text())
            accepted.setdefault('recipe_base_source', json.loads((root / 'registry/runtime/wranglespy-source-schema.json').read_text())['source'])
            requirements = site / 'requirements.txt'
            requirements.write_text(re.sub(r'WranglesPY/archive/[a-f0-9]{40}\.tar\.gz',
                f"WranglesPY/archive/{candidate['source']['revision']}.tar.gz", requirements.read_text()))
            # Try new shared definitions first, so new entry references resolve
            # during this same run. If incompatible, retain them and retry after
            # the entry updates below (coordinated breaking changes stay reported).
            if candidate['recipe_base'] != accepted['recipe_base']:
                previous_base = accepted['recipe_base']
                accepted['recipe_base'] = candidate['recipe_base']
                save(snapshot_path, accepted)
                try:
                    run(['node', 'scripts/import-runtime-snapshot.cjs'], site)
                    run(['node', 'scripts/compile-registry.cjs'], site)
                    run(['node', '--test', 'scripts/schema-alignment.test.cjs'], site)
                    accepted['recipe_base_source'] = candidate['source']
                except RuntimeError:
                    accepted['recipe_base'] = previous_base
                    save(snapshot_path, accepted)
            for key, definition in sorted(candidate['wrangle_definitions'].items()):
                print(f'Checking {key}', flush=True)
                previous = copy.deepcopy(accepted)
                try:
                    filename = stage / source_file(key)
                except ValueError as error:
                    report['rejected'].append({'key': key, 'action': 'skipped_new', 'error': str(error)})
                    continue
                old_text = filename.read_text() if filename.exists() else None
                alias_file = stage / 'registry/wrangles/_root/maths.md'
                alias_text = alias_file.read_text() if key == 'math' and alias_file.exists() else None
                same_controls = all((key in candidate['controls'].get(control, [])) == (key in accepted['controls'].get(control, [])) for control in set(candidate['controls']) | set(accepted['controls']))
                if (old_text is not None and definition == accepted['wrangle_definitions'].get(key)
                        and candidate['wrangles'].get(key) == accepted['wrangles'].get(key) and same_controls):
                    accepted['entry_sources'][key] = (accepted['entry_sources']['math']
                        if key == 'maths' and key not in candidate['wrangles'] else candidate['source'])
                    report['accepted'].append({'key': key, 'action': 'unchanged'})
                    continue
                if old_text is None:
                    lookup = documentation_lookup(root, key)
                    report['documentation'][key] = lookup
                    if lookup.get('local_candidates'):
                        report['rejected'].append({'key': key, 'action': 'skipped_new', 'error': 'Existing documentation needs migration', **lookup})
                        continue
                accepted['wrangle_definitions'][key] = definition
                accepted['entry_sources'][key] = (accepted['entry_sources']['math']
                    if key == 'maths' and key not in candidate['wrangles'] else candidate['source'])
                if key in candidate['wrangles']:
                    accepted['wrangles'][key] = candidate['wrangles'][key]
                else:
                    accepted['wrangles'].pop(key, None)
                for control, keys in candidate['controls'].items():
                    accepted['controls'][control] = sorted((set(accepted['controls'].get(control, [])) - {key}) | ({key} if key in keys else set()))
                save(snapshot_path, accepted)
                existing_outputs = generated_files(stage)
                try:
                    args = ['node', 'scripts/import-runtime-snapshot.cjs', '--sync-registry', '--only', key]
                    if old_text is None:
                        args.append('--create')
                    run(args, site)
                    if alias_text is not None:
                        run(['node', 'scripts/import-runtime-snapshot.cjs', '--sync-registry', '--only', 'maths'], site)
                        accepted['entry_sources']['maths'] = candidate['source']
                        save(snapshot_path, accepted)
                    run(['node', 'scripts/compile-registry.cjs'], site)
                    # Validate edited examples too, without executing any recipe.
                    run(['node', 'scripts/validate-registry-mdx.cjs', str(filename)], site)
                    run(['node', '--test', 'scripts/schema-alignment.test.cjs'], site)
                    report['accepted'].append({'key': key, 'action': 'updated' if old_text else 'created'})
                except RuntimeError as error:
                    accepted = previous
                    save(snapshot_path, accepted)
                    if old_text is None:
                        filename.unlink(missing_ok=True)
                    else:
                        filename.write_text(old_text)
                    if alias_text is not None:
                        alias_file.write_text(alias_text)
                    for output in generated_files(stage) - existing_outputs:
                        output.unlink()
                    report['rejected'].append({'key': key, 'action': 'retained_previous' if old_text else 'skipped_new',
                                               'retained_source': previous['entry_sources'].get(key), 'error': str(error)})
            for key in sorted(set(accepted['wrangle_definitions']) - set(candidate['wrangle_definitions'])):
                report['rejected'].append({'key': key, 'action': 'retained_previous', 'error': 'Removed upstream; manual retirement required',
                                          'retained_source': accepted['entry_sources'][key]})
            for key in sorted(set(candidate['connectors']) | set(accepted['connectors'])):
                if key not in candidate['connectors'] or key not in accepted['connectors']:
                    report['rejected'].append({'key': f'connector.{key}', 'action': 'retained_or_skipped',
                                              'error': 'Connector addition/removal needs catalog reconciliation; no database identity invented.'})
                    continue
                previous = copy.deepcopy(accepted)
                filename = stage / 'registry/connectors' / (key + '.md')
                old_text = filename.read_text()
                accepted['connectors'][key] = candidate['connectors'][key]
                accepted['connector_sources'][key] = candidate['source']
                save(snapshot_path, accepted)
                try:
                    run(['node', 'scripts/refresh-connector-pins.cjs', key], site)
                    if candidate['connectors'][key] == previous['connectors'][key]:
                        continue
                    run(['node', 'scripts/import-runtime-snapshot.cjs'], site)
                    run(['node', 'scripts/compile-registry.cjs'], site)
                    run(['node', 'scripts/validate-registry-mdx.cjs', str(filename)], site)
                    run(['node', '--test', 'scripts/connector-registry.test.cjs'], site)
                except RuntimeError as error:
                    accepted = previous
                    filename.write_text(old_text)
                    save(snapshot_path, accepted)
                    report['rejected'].append({'key': f'connector.{key}', 'action': 'retained_previous', 'error': str(error)})
            # Shared recipe definitions affect every entry: isolate their update too.
            previous_base = accepted['recipe_base']
            accepted['recipe_base'] = candidate['recipe_base']
            save(snapshot_path, accepted)
            try:
                run(['node', 'scripts/import-runtime-snapshot.cjs'], site)
                run(['node', 'scripts/compile-registry.cjs'], site)
                run(['node', '--test', 'scripts/schema-alignment.test.cjs'], site)
                accepted['recipe_base_source'] = candidate['source']
            except RuntimeError as error:
                accepted['recipe_base'] = previous_base
                report['rejected'].append({'key': '$recipe_base', 'action': 'retained_previous', 'error': str(error)})
            accepted['unresolved_wrangles'] = candidate['unresolved_wrangles']
            save(snapshot_path, accepted)
            run(['node', 'scripts/import-runtime-snapshot.cjs'], site)
            requirements = site / 'requirements.txt'
            requirements.write_text(re.sub(r'WranglesPY/archive/[a-f0-9]{40}\.tar\.gz',
                f"WranglesPY/archive/{candidate['source']['revision']}.tar.gz", requirements.read_text()))
            run(['npm', 'run', 'compile:registry'], site)
            run(['npm', 'run', 'generate:playground-registry'], site)
            run(['npm', 'run', 'check:registry'], site)
            if not skip_build:
                print('Registry checks passed; building site...', flush=True)
                run(['npm', 'run', 'build'], site)
            if fingerprint(root) != original_inputs:
                raise RuntimeError('Registry files changed while refresh was running; rerun to preserve those edits.')
            # Copy only explicitly owned outputs. Never replace the workspace or
            # unrelated local changes. Rejected candidates' new outputs were removed above.
            applying = True
            for relative in ('registry', 'wrangles-docs/registry-docs', 'wrangles-docs/static/registry',
                             'wrangles-docs/static/schemas/recipes', 'wrangles-docs/static/py'):
                shutil.copytree(stage / relative, root / relative, dirs_exist_ok=True)
            for relative in ('wrangles-docs/sidebarsRegistry.js', 'wrangles-docs/requirements.txt',
                             'wrangles-docs/src/components/WrangleFlowPlayground/registryCatalog.generated.js'):
                shutil.copy2(stage / relative, root / relative)
            report['status'] = 'completed_with_warnings' if report['rejected'] else 'completed'
            report['site_build'] = 'skipped_for_test' if skip_build else 'passed'
    except Exception as error:
        report['status'] = 'failed_during_apply' if applying else 'failed_no_changes_applied'
        report['error'] = str(error)
        raise
    finally:
        save(report_dir / 'report.json', report)
        lines = [f"Registry refresh: {report['status']}", f"Accepted: {len(report['accepted'])}",
                 f"Rejected/retained: {len(report['rejected'])}"]
        lines += [f"{item['key']}: {item['action']}\n{item.get('error', '')}" for item in report['rejected']]
        if report.get('error'):
            lines.append(report['error'])
        (report_dir / 'report.txt').write_text('\n\n'.join(lines) + '\n')
        print('\n'.join(lines[:3]), flush=True)
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--checkout', type=Path, required=True)
    parser.add_argument('--report-dir', type=Path, default=Path('registry-refresh-report'))
    args = parser.parse_args()
    refresh(Path(__file__).resolve().parents[1], args.checkout.resolve(), args.report_dir.resolve())
