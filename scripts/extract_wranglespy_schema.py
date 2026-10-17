#!/usr/bin/env python3
"""Read schema definitions from a pinned WranglesPY checkout without importing it.

Usage: python3 scripts/extract_wranglespy_schema.py /path/to/WranglesPY
Prints JSON to stdout for import-wranglespy-schema.cjs. Uses only the standard library.
Literal schemas and bounded data-only schema builders are interpreted without
executing/importing upstream modules. Unsupported builders are reported per entry.
"""
import ast
import json
from pathlib import Path
import subprocess
import sys
from schema_functions import generated_docstrings


class Extractor:
    def __init__(self, root):
        self.root = Path(root)
        self.modules = {}

    def evaluate(self, node, scope):
        if isinstance(node, ast.Constant):
            return node.value
        if isinstance(node, ast.Dict):
            return {self.evaluate(k, scope): self.evaluate(v, scope)
                    for k, v in zip(node.keys, node.values)}
        if isinstance(node, (ast.List, ast.Tuple)):
            return [self.evaluate(v, scope) for v in node.elts]
        if isinstance(node, ast.Name):
            value = scope[node.id]
            return self.module(value[1]) if isinstance(value, tuple) else value
        if isinstance(node, ast.Attribute):
            return self.evaluate(node.value, scope)[node.attr]
        if isinstance(node, ast.Subscript):
            return self.evaluate(node.value, scope)[self.evaluate(node.slice, scope)]
        if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                and node.func.attr == 'replace' and not node.keywords):
            return self.evaluate(node.func.value, scope).replace(
                *[self.evaluate(a, scope) for a in node.args])
        raise ValueError('Unsupported schema expression: ' + ast.dump(node))

    def walk(self, body, scope):
        for node in body:
            if isinstance(node, ast.ImportFrom) and node.level:
                for alias in node.names:
                    scope[alias.asname or alias.name] = ('module', alias.name)
            elif isinstance(node, ast.ClassDef):
                child = dict(scope)
                child.pop('_schema', None)
                self.walk(node.body, child)
                scope[node.name] = child
            elif isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name) and target.id == '_schema':
                        scope['_schema'] = self.evaluate(node.value, scope)
                    elif (isinstance(target, ast.Subscript)
                          and isinstance(target.value, ast.Name)
                          and target.value.id == '_schema'):
                        scope.setdefault('_schema', {})[self.evaluate(target.slice, scope)] = self.evaluate(node.value, scope)

    def module(self, name):
        if name not in self.modules:
            tree = ast.parse((self.root / 'wrangles/connectors' / (name + '.py')).read_text())
            scope = {}
            self.modules[name] = scope
            self.walk(tree.body, scope)
        return self.modules[name]

    def extract(self):
        connectors = {}
        init = ast.parse((self.root / 'wrangles/connectors/__init__.py').read_text())
        names = [a.name for n in init.body if isinstance(n, ast.ImportFrom)
                 for a in n.names if not a.name.startswith('_')]
        for name in names:
            scope = self.module(name)
            if scope.get('_schema'):
                connectors[name] = scope['_schema']
            tree = ast.parse((self.root / 'wrangles/connectors' / (name + '.py')).read_text())
            for child in tree.body:
                if isinstance(child, ast.ClassDef) and not child.name.startswith('_'):
                    if scope[child.name].get('_schema'):
                        connectors[name + '.' + child.name] = scope[child.name]['_schema']
        generator = ast.parse((self.root / 'schema/generate_recipe_schema.py').read_text())
        for node in generator.body:
            if not isinstance(node, ast.Assign):
                continue
            target = node.targets[0]
            if (isinstance(target, ast.Subscript) and isinstance(target.value, ast.Subscript)
                    and isinstance(target.value.value, ast.Name) and target.value.value.id == 'schema'
                    and isinstance(node.value, ast.Call)):
                operation = ast.literal_eval(target.value.slice)
                key = ast.literal_eval(target.slice)
                connectors.setdefault(key, {})[operation] = ast.literal_eval(node.value.args[0])
        wrangles = {}
        for path in sorted((self.root / 'wrangles/recipe_wrangles').glob('*.py')):
            if path.stem.startswith('_'):
                continue
            tree = ast.parse(path.read_text())
            generated = generated_docstrings(tree, self.root)
            for node in tree.body:
                if isinstance(node, ast.FunctionDef) and not node.name.startswith('_'):
                    key = node.name if path.stem in ('main', 'pandas') else path.stem + '.' + node.name
                    if key == 'Try':
                        key = 'try'
                    args = node.args
                    positional = args.posonlyargs + args.args
                    defaults = [None] * (len(positional) - len(args.defaults)) + args.defaults
                    parameters = []
                    for arg, default in zip(positional + args.kwonlyargs, defaults + args.kw_defaults):
                        parameter = {'name': arg.arg, 'required': default is None,
                                     'kind': 'positional_only' if arg in args.posonlyargs else
                                     'keyword_only' if arg in args.kwonlyargs else 'positional_or_keyword'}
                        if arg.annotation:
                            parameter['annotation'] = ast.unparse(arg.annotation)
                        if default is not None:
                            try:
                                parameter['default'] = ast.literal_eval(default)
                            except ValueError:
                                # Preserve a non-JSON sentinel explicitly, never claim it is null.
                                parameter['default_expression'] = ast.unparse(default)
                        parameters.append(parameter)
                    wrangles[key] = {'docstring': ast.get_docstring(node), 'signature': '(' + ast.unparse(args) + ')',
                                     'python_symbol': 'wrangles.recipe_wrangles.' + path.stem + '.' + node.name,
                                     'parameters': parameters,
                                     'variadic': {'positional': args.vararg.arg if args.vararg else None,
                                                  'keyword': args.kwarg.arg if args.kwarg else None},
                                     'source_file': str(path.relative_to(self.root))}
                    if node.name in generated:
                        result = generated[node.name]
                        if 'schema' in result:
                            wrangles[key]['generated_schema'] = result['schema']
                        else:
                            wrangles[key]['schema_extraction_error'] = result['error']
        controls = {}
        for node in ast.parse((self.root / 'wrangles/config.py').read_text()).body:
            if isinstance(node, ast.Assign) and isinstance(node.targets[0], ast.Name):
                if node.targets[0].id in ('where_overwrite_output', 'where_not_implemented'):
                    controls[node.targets[0].id] = ast.literal_eval(node.value)
        revision = subprocess.check_output(['git', '-C', str(self.root), 'rev-parse', 'HEAD'], text=True).strip()
        version = None
        for node in ast.walk(ast.parse((self.root / 'setup.py').read_text())):
            if isinstance(node, ast.keyword) and node.arg == 'version':
                version = ast.literal_eval(node.value)
        return {'source': {'repository': 'https://github.com/wrangleworks/WranglesPY', 'revision': revision,
                           'version': version, 'extraction': 'static-python-ast'},
                'connectors': connectors, 'wrangle_definitions': wrangles, 'controls': controls,
                'recipe_base': json.loads((self.root / 'schema/recipe_base_schema.json').read_text())}


if __name__ == '__main__':
    print(json.dumps(Extractor(sys.argv[1]).extract(), indent=2))
