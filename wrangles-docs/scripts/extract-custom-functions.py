"""Extract read-only UI source from the runner's function file without importing it."""
import ast
import json
from pathlib import Path


def extract(path):
    source = Path(path).read_text()
    tree = ast.parse(source)
    definitions = {}
    for node in tree.body:
        names = []
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            names = [node.name]
        elif isinstance(node, (ast.Import, ast.ImportFrom)):
            names = [alias.asname or alias.name.split('.')[0] for alias in node.names]
        elif isinstance(node, (ast.Assign, ast.AnnAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            names = [child.id for target in targets for child in ast.walk(target) if isinstance(child, ast.Name)]
        for name in names:
            definitions[name] = node

    result = {}
    for node in tree.body:
        if not isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) or node.name.startswith('_'):
            continue
        needed = set()

        def include(definition):
            if definition in needed:
                return
            needed.add(definition)
            for child in ast.walk(definition):
                if isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load) and child.id in definitions:
                    include(definitions[child.id])

        include(node)
        lines = source.splitlines()
        result[node.name] = '\n\n'.join(
            '\n'.join(lines[min([n.lineno] + [d.lineno for d in getattr(n, 'decorator_list', [])])-1:n.end_lineno])
            for n in tree.body if n in needed
        ) + '\n'
    return result


if __name__ == '__main__':
    print(json.dumps(extract(Path(__file__).resolve().parents[1] / 'customFunctions.py'), indent=2))
