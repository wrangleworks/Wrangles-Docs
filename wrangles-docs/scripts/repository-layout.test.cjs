const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const {normalizeApiCatalog} = require('./api-core-catalog.cjs');

test('content compilation validates before committing and all CI consumers regenerate', () => {
  const yaml = require('js-yaml');
  const read = name => yaml.load(fs.readFileSync(path.join(root, '.github/workflows', name), 'utf8'));
  const workflow = read('compile-registry.yml');
  assert.deepEqual(workflow.on.push.branches, ['**']);
  assert.equal(workflow.permissions.contents, 'write');
  assert.equal(workflow.concurrency['cancel-in-progress'], false);
  const steps = workflow.jobs.compile.steps;
  const generation = steps.findIndex(step => step.run?.includes('npm run compile:registry'));
  const commit = steps.findIndex(step => step.run?.includes('git commit'));
  assert.ok(generation >= 0 && commit > generation);
  assert.match(steps[generation].run, /npm run check:registry\s+npm run build/);
  assert.match(steps[commit].run, /git diff --cached --quiet/);
  assert.match(steps[commit].run, /HEAD:refs\/heads\/\$TARGET_BRANCH/);
  assert.doesNotMatch(steps[commit].run, /git push[^\n]*--force|git add \./);
  assert.ok(!JSON.stringify(workflow).includes('refresh_registry.py'));
  for (const name of ['registry.yml', 'publish.yml']) {
    const job = Object.values(read(name).jobs)[0];
    const check = job.steps.find(step => step.run?.includes('npm run check:registry'));
    assert.ok(check.run.indexOf('npm run compile:registry') < check.run.indexOf('npm run check:registry'));
    assert.ok(check.run.includes('npm run generate:playground-registry'));
  }
});

test('sidebar separates wrangles and connectors without nesting Registry or Python', () => {
  const source = fs.readFileSync(path.join(root, 'wrangles-docs/sidebarsRegistry.js'), 'utf8');
  const sidebar = require('node:vm').runInNewContext(source.replace('export default sidebarsRegistry;', 'sidebarsRegistry;')).registrySidebar;
  assert.equal(sidebar.map(item => item.label).join(','), 'Registry,Python,Wrangles,Connectors');
  assert.equal(sidebar[0].className, 'registry-sidebar-intro');
  assert.equal(sidebar[1].className, 'registry-sidebar-intro');
  for (const section of sidebar.slice(2)) {
    assert.equal(section.className, 'registry-sidebar-section');
    assert.equal(section.collapsible, true);
    assert.equal(section.collapsed, false);
  }
  assert.ok(sidebar[2].items.every(item => item.id.startsWith('namespaces/')));
  assert.ok(sidebar[3].items.every(item => item.id.startsWith('connectors/')));
  assert.equal(sidebar[3].items.length, fs.readdirSync(path.join(root, 'registry/input_connectors')).filter(name => name.endsWith('.md')).length);
  for (const section of sidebar.slice(2)) {
    const labels = Array.from(section.items, item => item.label);
    assert.deepEqual(labels, [...labels].sort((a, b) => a.localeCompare(b)));
  }
});

test('retired migration and alternate production scripts cannot return unnoticed', () => {
  for (const file of [
    'migrate.py', 'my-docs-site/wrangle-docs/compare/compare.md',
    'scripts/seed_connector_catalog.py', 'scripts/seed_wranglesio_content.py',
    'scripts/seed_wrangle_examples.py', 'scripts/generate_wrangle_docs_from_db.py',
    'scripts/test_api_core_paths.sh', 'scripts/test_api_core_all_paths.sh',
    'scripts/probe_api_core.sh',
    'wrangles-docs/scripts/convert-recipe-examples.cjs',
    'wrangles-docs/scripts/start-prod.cjs', 'wrangles-docs/deploy/default.conf',
  ]) assert.equal(fs.existsSync(path.join(root, file)), false, file);
});

test('editor authoring folders exist and exclude generated reference copies', () => {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'frontmatter.json')));
  const expected = ['wrangles-docs/docs', 'wrangles-docs/registry-docs/python',
    'registry/input_wrangles', 'registry/input_connectors'];
  assert.deepEqual(config['frontMatter.content.pageFolders'].map(folder =>
    folder.path.replace('[[workspace]]/', '')), expected);
  for (const folder of expected) assert.ok(fs.statSync(path.join(root, folder)).isDirectory());
  for (const old of ['wrangles', 'connectors']) {
    assert.equal(fs.existsSync(path.join(root, 'registry', old)), false);
  }
});

test('catalog normalization preserves runtime bindings separately from identity', () => {
  const payload = {catalog: [{catalog_id: '1', catalog_kind: 'wrangle',
    catalog_key: 'lookup.semantic', wranglesPY_key: 'lookup', status: 'active',
    okf_path: null, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z'}]};
  const entry = normalizeApiCatalog(payload, 'test').entries[0];
  assert.equal(entry.wrangle_key, 'lookup.semantic');
  assert.equal(entry.runtime_key, 'lookup');
  assert.equal(entry.catalog_id, '1');
});

test('input folder names do not leak into public Markdown URLs', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'wrangles-docs/static/registry/manifest.json')));
  for (const [collection, folder] of [['entries', 'wrangles'], ['connectors', 'connectors']]) {
    for (const entry of manifest[collection]) {
      assert.ok(entry.raw_markdown.startsWith(`/registry/${folder}/`));
      assert.ok(fs.existsSync(path.join(root, 'wrangles-docs/static', entry.raw_markdown)));
    }
  }
});
