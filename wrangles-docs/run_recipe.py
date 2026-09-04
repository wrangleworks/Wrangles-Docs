import ast
import json
import os
import sys
import tempfile
import traceback
from pathlib import Path


def load_env_file(env_path: Path) -> None:
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'\"")
        os.environ.setdefault(key, value)


def coerce_cell(value):
    if value is None:
        return None
    if not isinstance(value, str):
        return value

    stripped = value.strip()
    if stripped == "":
        return ""

    try:
        return ast.literal_eval(stripped)
    except (SyntaxError, ValueError):
        return value


def display_cell(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    if isinstance(value, (dict, list, tuple, set)):
        return repr(value)
    return str(value)


def fail(message: str, *, include_traceback: bool = False) -> int:
    if include_traceback:
        traceback.print_exc(file=sys.stderr)
    print(json.dumps({"error": message}), file=sys.stderr)
    return 1


def main() -> int:
    site_dir = Path(__file__).resolve().parent
    load_env_file(site_dir / ".env")
    load_env_file(site_dir.parent / ".env")

    try:
        import pandas as pd
        import wrangles
    except ImportError as exc:
        return fail(
            "Missing Python dependency. Install the Wrangles runner requirements before using the interactive recipe button: "
            f"{exc}"
        )

    if not os.environ.get("WRANGLES_USER") or not os.environ.get("WRANGLES_PASSWORD"):
        return fail("Missing WRANGLES_USER or WRANGLES_PASSWORD in .env")

    payload = json.load(sys.stdin)
    recipe = payload["recipe"].replace("\t", "  ")
    input_columns = payload["input"]["columns"]
    input_rows = payload["input"]["rows"]
    output_columns = payload.get("outputColumns") or []

    records = []
    for row in input_rows:
        record = {}
        for index, column in enumerate(input_columns):
            cell = row[index] if index < len(row) else ""
            record[column] = coerce_cell(cell)
        records.append(record)

    dataframe = pd.DataFrame(records)

    with tempfile.NamedTemporaryFile("w", suffix=".wrgl.yml", delete=False, encoding="utf-8") as handle:
        handle.write(recipe)
        recipe_path = handle.name

    try:
        result = wrangles.recipe.run(recipe=recipe_path, dataframe=dataframe)
        if not hasattr(result, "columns"):
            result = pd.DataFrame(result)

        selected_columns = [column for column in output_columns if column in result.columns]
        if selected_columns:
            result = result[selected_columns]

        response = {
            "columns": list(result.columns),
            "rows": [
                [display_cell(value) for value in row]
                for row in result.itertuples(index=False, name=None)
            ],
        }
        print(json.dumps(response))
        return 0
    finally:
        try:
            os.unlink(recipe_path)
        except OSError:
            pass


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        raise SystemExit(fail(str(exc), include_traceback=True))
