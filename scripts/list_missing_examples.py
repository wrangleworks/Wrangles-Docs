"""List wrangle pages missing example YAML or an input/output sample table.

Run: python scripts/list_missing_examples.py
Reads the compiled Registry pages saved in the repo (including generated tables).
Checks presence only; does not run recipes or call AI. No extra packages needed.
"""
import argparse
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'wrangles-docs'


def has_table(body, label):
    panels = re.findall(rf'<div\b[^>]*data-sample-role="{label}"[^>]*>(.*?)</div>', body, re.S)
    # Require a header, separator and at least one data row.
    return any(re.search(r'(?m)^\s*\|[^\n]+\|\s*\n\s*\|[ :|\-]+\|\s*\n\s*\|[^\n]*\|', panel) for panel in panels)


def missing_examples(body):
    fences = re.findall(r'(?ms)^\s*```ya?ml[^\n]*\n(.*?)^\s*```', body)
    has_yaml = any(code.strip() for code in fences)
    # Code snippets cannot count as sample tables.
    prose = re.sub(r'(?ms)^\s*```[^\n]*\n.*?^\s*```', '', body)
    return not (has_yaml and has_table(prose, 'input') and has_table(prose, 'output'))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'audits/missing-wrangle-examples.md')
    args = parser.parse_args()
    rows = []
    entries = json.loads((SITE / 'static/registry/manifest.json').read_text(encoding='utf-8'))['entries']
    for entry in entries:
        page = SITE / 'registry-docs' / (entry['slug'] + '.md')
        body = page.read_text(encoding='utf-8').split('---', 2)[2]
        if missing_examples(body):
            rows.append((entry['wrangle_key'], entry['route']))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open('w', encoding='utf-8') as handle:
        handle.write(f'## Wrangle pages missing examples\n\n{len(rows)} of {len(entries)} pages are missing YAML or an input/output sample table.\n\n')
        if rows:
            handle.write('| Wrangle | Page |\n| --- | --- |\n')
            for name, route in sorted(rows):
                handle.write(f'| `{name}` | `{route}` |\n')
        else:
            handle.write('No pages are missing examples.\n')
    print(f'{len(rows)} of {len(entries)} wrangle pages need examples: {args.output}')


if __name__ == '__main__':
    main()
