"""Bounded interpreter for data-only schema builders. Never imports upstream code."""
import ast


class Returned(Exception):
    def __init__(self, value):
        self.value = value


class SchemaFunctions:
    def __init__(self, tree, constants=None):
        self.functions = {n.name: n for n in tree.body if isinstance(n, ast.FunctionDef)}
        self.constants = constants or {}
        self.remaining = 100000

    def tick(self):
        self.remaining -= 1
        if self.remaining < 0:
            raise ValueError('Schema evaluation limit exceeded')

    def expr(self, n, scope):
        self.tick()
        if isinstance(n, ast.Constant):
            return n.value
        if isinstance(n, ast.Name):
            return scope[n.id] if n.id in scope else self.constants[n.id]
        if isinstance(n, (ast.List, ast.Tuple)):
            return [self.expr(x, scope) for x in n.elts]
        if isinstance(n, ast.Dict):
            result = {}
            for k, v in zip(n.keys, n.values):
                if k is None:
                    result.update(self.expr(v, scope))
                else:
                    result[self.expr(k, scope)] = self.expr(v, scope)
            return result
        if isinstance(n, ast.Subscript):
            return self.expr(n.value, scope)[self.expr(n.slice, scope)]
        if isinstance(n, ast.BinOp) and isinstance(n.op, ast.Add):
            return self.expr(n.left, scope) + self.expr(n.right, scope)
        if isinstance(n, ast.Compare) and len(n.ops) == 1:
            left, right = self.expr(n.left, scope), self.expr(n.comparators[0], scope)
            if isinstance(n.ops[0], ast.Eq):
                return left == right
            if isinstance(n.ops[0], ast.Is) and right is None:
                return left is None
        if isinstance(n, ast.Call):
            args = [self.expr(a, scope) for a in n.args]
            kwargs = {k.arg: self.expr(k.value, scope) for k in n.keywords}
            if isinstance(n.func, ast.Name):
                if n.func.id == 'len' and len(args) == 1 and not kwargs:
                    return len(args[0])
                return self.call(n.func.id, args, kwargs)
            if isinstance(n.func, ast.Attribute) and not kwargs:
                receiver = self.expr(n.func.value, scope)
                if n.func.attr == 'append' and type(receiver) is list and len(args) == 1:
                    receiver.append(args[0])
                    return None
                if n.func.attr == 'join' and type(receiver) is str and len(args) == 1:
                    return receiver.join(args[0])
        raise ValueError('Unsupported schema expression: ' + ast.dump(n))

    def assign(self, target, value, scope):
        if isinstance(target, ast.Name):
            scope[target.id] = value
        elif isinstance(target, (ast.Tuple, ast.List)) and len(target.elts) == len(value):
            for child, item in zip(target.elts, value):
                self.assign(child, item, scope)
        elif isinstance(target, ast.Subscript):
            self.expr(target.value, scope)[self.expr(target.slice, scope)] = value
        else:
            raise ValueError('Unsupported schema assignment')

    def statements(self, body, scope):
        for n in body:
            self.tick()
            if isinstance(n, ast.Assign):
                value = self.expr(n.value, scope)
                for target in n.targets:
                    self.assign(target, value, scope)
            elif isinstance(n, ast.If):
                self.statements(n.body if self.expr(n.test, scope) else n.orelse, scope)
            elif isinstance(n, ast.For):
                for value in self.expr(n.iter, scope):
                    self.tick()
                    self.assign(n.target, value, scope)
                    self.statements(n.body, scope)
                if n.orelse:
                    raise ValueError('Unsupported schema loop else')
            elif isinstance(n, ast.Return):
                raise Returned(self.expr(n.value, scope))
            elif isinstance(n, ast.Expr):
                self.expr(n.value, scope)
            else:
                raise ValueError('Unsupported schema statement: ' + ast.dump(n))

    def call(self, name, args, kwargs):
        self.tick()
        fn = self.functions[name]
        names = [a.arg for a in fn.args.args]
        if fn.args.vararg or fn.args.kwarg or fn.args.kwonlyargs or len(args) > len(names):
            raise ValueError('Unsupported schema function signature')
        scope = {key: self.expr(default, {}) for key, default in
                 zip(names[len(names) - len(fn.args.defaults):], fn.args.defaults)}
        scope.update(zip(names, args))
        if set(kwargs) - set(names) or set(kwargs) & set(names[:len(args)]):
            raise ValueError('Invalid schema function arguments')
        scope.update(kwargs)
        if set(scope) != set(names):
            raise ValueError('Missing schema function arguments')
        try:
            self.statements(fn.body, scope)
        except Returned as result:
            return result.value
        raise ValueError('Schema function did not return data')


def generated_docstrings(tree, root):
    """Recognize globals()[name].__doc__ = yaml.safe_dump(builder(...)).

    Only literal imported constants are resolved; all function bodies go through
    the restricted interpreter. Unsupported builders remain explicit errors.
    """
    constants = {}
    imports = {}
    for n in tree.body:
        if isinstance(n, ast.ImportFrom) and n.level == 2 and n.module is None:
            for alias in n.names:
                imports[alias.asname or alias.name] = alias.name
        if isinstance(n, ast.Assign) and len(n.targets) == 1 and isinstance(n.targets[0], ast.Name):
            try:
                value = ast.literal_eval(n.value)
            except (ValueError, TypeError):
                if not (isinstance(n.value, ast.Attribute) and isinstance(n.value.value, ast.Name)
                        and n.value.value.id in imports):
                    continue
                module = imports[n.value.value.id]
                source = ast.parse((root / 'wrangles' / (module + '.py')).read_text())
                matches = [a.value for a in source.body if isinstance(a, ast.Assign)
                           and any(isinstance(t, ast.Name) and t.id == n.value.attr for t in a.targets)]
                if len(matches) != 1:
                    continue
                try:
                    value = ast.literal_eval(matches[0])
                except (ValueError, TypeError):
                    continue
            constants[n.targets[0].id] = value
    evaluator = SchemaFunctions(tree, constants)
    results = {}
    for loop in tree.body:
        if not isinstance(loop, ast.For):
            continue
        for assignment in loop.body:
            if not isinstance(assignment, ast.Assign) or len(assignment.targets) != 1:
                continue
            target = assignment.targets[0]
            if not (isinstance(target, ast.Attribute) and target.attr == '__doc__'
                    and isinstance(target.value, ast.Subscript)
                    and isinstance(target.value.value, ast.Call)
                    and isinstance(target.value.value.func, ast.Name)
                    and target.value.value.func.id == 'globals'):
                continue
            for item in ast.literal_eval(loop.iter):
                scope = {}
                evaluator.assign(loop.target, item, scope)
                name = evaluator.expr(target.value.slice, scope)
                try:
                    call = assignment.value
                    if not (isinstance(call, ast.Call) and isinstance(call.func, ast.Attribute)
                            and call.func.attr == 'safe_dump' and len(call.args) == 1):
                        raise ValueError('Unsupported schema serialization')
                    results[name] = {'schema': evaluator.expr(call.args[0], scope)}
                except (ValueError, KeyError, TypeError, RecursionError) as error:
                    results[name] = {'error': str(error)}
    return results
