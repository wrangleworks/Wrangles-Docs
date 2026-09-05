import React, {useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import yaml from 'js-yaml';
import {RecipePlaygroundProvider} from './context';
import {runRecipeRequest} from '../recipeRunnerClient';
import styles from './styles.module.css';

const WRANGLE_FLOW_TRANSFER_KEY = 'wrangle-flow-playground-transfer';

function trimCell(value) {
  return String(value ?? '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(?:code|p)[^>]*>/gi, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
    .replace(/^```[^\n]*\n([\s\S]*?)\n```$/, '$1')
    .replace(/^`([\s\S]*)`$/, '$1')
    .replace(/\\([{}|*+])/g, '$1');
}

function splitMarkdownRow(line) {
  let value = line.trim();
  if (value.startsWith('|')) value = value.slice(1);
  if (value.endsWith('|')) value = value.slice(0, -1);
  return value.split('|').map((cell) => trimCell(cell));
}

function isAlignmentRow(cells) {
  return cells.every((cell) => /^:?-{2,}:?$/.test(cell.replace(/\s+/g, '')) || cell === '');
}

function parseMarkdownTable(markdown) {
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'));

  if (lines.length < 2) {
    return null;
  }

  const rows = lines.map(splitMarkdownRow);
  const header = rows[0];
  const body = isAlignmentRow(rows[1]) ? rows.slice(2) : rows.slice(1);

  if (!header.length || !body.length) {
    return null;
  }

  return {
    columns: header,
    rows: body.map((row) => header.map((_, index) => row[index] ?? '')),
  };
}

function parseCompactMarkdownExample(markdown) {
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2 || !lines.every((line) => line.startsWith('|'))) {
    return null;
  }

  const rows = lines.map(splitMarkdownRow);
  const header = rows[0];
  const body = rows.slice(2);
  const columnCount = header.length;

  const separatorColumns = Array.from({length: columnCount}, (_, index) => {
    const values = [header[index], ...body.map((row) => row[index] ?? '')].map((value) => value.trim());
    return values.every((value) => value === '' || value === '→' || value === '+');
  });

  const groups = [];
  let currentGroup = [];

  separatorColumns.forEach((isSeparator, index) => {
    if (isSeparator) {
      if (currentGroup.length) {
        groups.push(currentGroup);
        currentGroup = [];
      }
      return;
    }
    currentGroup.push(index);
  });

  if (currentGroup.length) {
    groups.push(currentGroup);
  }

  if (groups.length < 2) {
    return null;
  }

  const tables = groups.map((group) => ({
    columns: group.map((index) => header[index]),
    rows: body.map((row) => group.map((index) => row[index] ?? '')),
  }));

  if (!tables.length) {
    return null;
  }

  return {
    input: tables[0] ?? null,
    output: tables[tables.length - 1] ?? null,
  };
}

function extractTdContents(source) {
  return [...source.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => match[1].trim());
}

function extractTagContents(source, tagName) {
  const expression = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  return [...source.matchAll(expression)].map((match) => trimCell(match[1]));
}

function extractSimpleHtmlTables(source) {
  const matches = [...source.matchAll(/<table\b[^>]*>((?:(?!<table\b)[\s\S])*?)<\/table>/gi)].map((match) => match[0]);
  return matches.length ? matches : [source];
}

function parseHtmlTable(source) {
  const rows = [...source.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) => match[1]);
  if (!rows.length) {
    return null;
  }

  const columnRow = rows.find((row) => /<th\b/i.test(row));
  const columns = columnRow ? extractTagContents(columnRow, 'th') : [];
  const bodyRows = rows
    .filter((row) => /<td\b/i.test(row))
    .map((row) => extractTagContents(row, 'td'))
    .filter((row) => row.length);

  if (!columns.length || !bodyRows.length) {
    return null;
  }

  return {
    columns,
    rows: bodyRows.map((row) => columns.map((_, index) => row[index] ?? '')),
  };
}

function extractTablesFromHtmlExample(source) {
  const tableSources = extractSimpleHtmlTables(source);
  const markdownTables = tableSources
    .flatMap((tableSource) => extractTdContents(tableSource))
    .map((cell) => parseMarkdownTable(cell))
    .filter(Boolean);

  if (markdownTables.length) {
    return markdownTables;
  }

  return tableSources
    .map((tableSource) => parseHtmlTable(tableSource))
    .filter(Boolean);
}

function normalizeColumnName(column) {
  return String(column ?? '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase();
}

function columnMatches(column, target) {
  const normalizedColumn = normalizeColumnName(column);
  const normalizedTarget = normalizeColumnName(target);

  return (
    normalizedColumn === normalizedTarget ||
    normalizedColumn.startsWith(normalizedTarget + ' ') ||
    normalizedColumn.endsWith(' ' + normalizedTarget)
  );
}

function normalizeConfigColumns(value) {
  if (!value) return [];
  if (typeof value === 'string') return value.includes('*') ? [] : [value];
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (typeof item === 'string') {
      return item.includes('*') ? [] : [item];
    }
    if (item && typeof item === 'object') {
      return Object.values(item)
        .filter((itemValue) => typeof itemValue === 'string' && !itemValue.includes('*'));
    }
    return [];
  });
}

function inferInputFromOutput(recipe, outputTable) {
  if (!outputTable) return null;

  try {
    const parsed = yaml.load(recipe);
    const firstWrangle = Array.isArray(parsed?.wrangles) ? parsed.wrangles[0] : null;
    const config =
      firstWrangle && typeof firstWrangle === 'object'
        ? firstWrangle[Object.keys(firstWrangle)[0]]
        : null;
    const configuredInputColumns = normalizeConfigColumns(config?.input);
    const configuredOutputColumns = normalizeConfigColumns(config?.output);

    const inferredInputColumns = outputTable.columns.filter(
      (column) =>
        !configuredOutputColumns.some((outputColumn) => columnMatches(column, outputColumn)),
    );
    const configuredInputMatches = configuredInputColumns.length
      ? outputTable.columns.filter((column) =>
          configuredInputColumns.some((inputColumn) => columnMatches(column, inputColumn)),
        )
      : [];
    const inputColumns = configuredInputMatches.length ? configuredInputMatches : inferredInputColumns;

    if (!inputColumns.length) {
      return null;
    }

    const indices = inputColumns.map((column) => outputTable.columns.indexOf(column));
    return {
      columns: inputColumns,
      rows: outputTable.rows.map((row) => indices.map((index) => row[index] ?? '')),
    };
  } catch (_error) {
    return null;
  }
}

function parseExampleSource(recipe, exampleSource) {
  if (!exampleSource) {
    return null;
  }

  const raw = exampleSource.trim();
  if (!raw) {
    return null;
  }

  if (raw.startsWith('<')) {
    const tables = extractTablesFromHtmlExample(raw);
    if (!tables.length) {
      return null;
    }

    if (tables.length === 1) {
      const output = tables[0];
      return {
        input: inferInputFromOutput(recipe, output),
        output,
      };
    }

    return {
      input: tables[0],
      output: tables[tables.length - 1],
    };
  }

  const compact = parseCompactMarkdownExample(raw);
  if (compact) {
    return compact;
  }

  const singleTable = parseMarkdownTable(raw);
  if (!singleTable) {
    return null;
  }

  return {
    input: inferInputFromOutput(recipe, singleTable),
    output: singleTable,
  };
}

function fallbackInputTable(recipe) {
  try {
    const parsed = yaml.load(recipe);
    const firstWrangle = Array.isArray(parsed?.wrangles) ? parsed.wrangles[0] : null;
    const config =
      firstWrangle && typeof firstWrangle === 'object'
        ? firstWrangle[Object.keys(firstWrangle)[0]]
        : null;
    const input = config?.input;
    const columns = Array.isArray(input)
      ? input.filter((item) => typeof item === 'string')
      : typeof input === 'string'
        ? [input]
        : [];

    if (columns.length) {
      return {
        columns,
        rows: [columns.map(() => '')],
      };
    }
  } catch (_error) {
    // Fall through to a generic input table.
  }

  return {
    columns: ['input'],
    rows: [['']],
  };
}

function TableCell({value, editable, onChange}) {
  if (!editable) {
    return <code className={styles.cellValue}>{value}</code>;
  }

  return (
    <textarea
      className={styles.cellInput}
      rows={1}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      spellCheck={false}
    />
  );
}

function DataTable({columns, rows, editable, onCellChange}) {
  return (
    <div className={clsx('table-scroll', styles.panelTable)}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {columns.map((column, columnIndex) => (
                <td key={`${column}-${rowIndex}`}>
                  <TableCell
                    value={row[columnIndex] ?? ''}
                    editable={editable}
                    onChange={(nextValue) => onCellChange?.(rowIndex, columnIndex, nextValue)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RecipePlayground({
  recipe,
  editable = true,
  inputColumns,
  inputRows,
  outputColumns,
  outputRows,
  exampleSource,
}) {
  const normalizedRecipe = useMemo(() => recipe.replace(/\t/g, '  '), [recipe]);
  const initialTables = useMemo(() => {
    const parsedExample = exampleSource ? parseExampleSource(normalizedRecipe, exampleSource) : null;
    return {
      inputColumns: inputColumns ?? parsedExample?.input?.columns ?? [],
      inputRows: inputRows ?? parsedExample?.input?.rows ?? [],
      outputColumns: outputColumns ?? parsedExample?.output?.columns ?? [],
      outputRows: outputRows ?? parsedExample?.output?.rows ?? [],
    };
  }, [exampleSource, inputColumns, inputRows, normalizedRecipe, outputColumns, outputRows]);

  const resolvedInputColumns = initialTables.inputColumns;
  const resolvedInputRows = initialTables.inputRows;
  const resolvedOutputColumns = initialTables.outputColumns;
  const resolvedOutputRows = initialTables.outputRows;
  const hasInputTable = resolvedInputColumns.length > 0;
  const hasOutputTable = resolvedOutputColumns.length > 0;
  const fallbackTable = useMemo(() => fallbackInputTable(normalizedRecipe), [normalizedRecipe]);

  const {siteConfig} = useDocusaurusContext();
  const runnerUrl = siteConfig.customFields?.recipeRunnerUrl || '/run-recipe';
  const [currentInputRows, setCurrentInputRows] = useState(() => resolvedInputRows.map((row) => [...row]));
  const [currentOutput, setCurrentOutput] = useState({
    columns: resolvedOutputColumns,
    rows: resolvedOutputRows.map((row) => [...row]),
  });
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentInputRows(resolvedInputRows.map((row) => [...row]));
    setCurrentOutput({
      columns: resolvedOutputColumns,
      rows: resolvedOutputRows.map((row) => [...row]),
    });
    setError('');
  }, [initialTables]);

  async function runRecipe() {
    setIsRunning(true);
    setError('');

    try {
      const inputTable = hasInputTable
        ? {
            columns: resolvedInputColumns,
            rows: currentInputRows,
          }
        : fallbackTable;

      const payload = await runRecipeRequest({
        runnerUrl,
        recipe: normalizedRecipe,
        input: inputTable,
        outputColumns: resolvedOutputColumns,
      });

      setCurrentOutput({
        columns: payload.columns?.length ? payload.columns : resolvedOutputColumns,
        rows: payload.rows || [],
      });
    } catch (runError) {
      const message =
        runError instanceof TypeError
          ? `Could not reach the local recipe runner at ${runnerUrl}. Make sure npm start is running and check the terminal for runner logs.`
          : runError.message;

      console.error('[recipe-playground] Run failed:', runError);
      setError(message);
    } finally {
      setIsRunning(false);
    }
  }

  function openInPlayground() {
    const table = hasInputTable
      ? {
          columns: resolvedInputColumns,
          rows: currentInputRows,
        }
      : hasOutputTable
        ? {
            columns: currentOutput.columns,
            rows: currentOutput.rows,
          }
        : fallbackTable;

    window.localStorage.setItem(
      WRANGLE_FLOW_TRANSFER_KEY,
      JSON.stringify({
        recipe: normalizedRecipe,
        table,
        createdAt: Date.now(),
      }),
    );

    window.location.assign('/playground');
  }

  function handleCellChange(rowIndex, columnIndex, nextValue) {
    setCurrentInputRows((previousRows) =>
      previousRows.map((row, currentRowIndex) => {
        if (currentRowIndex !== rowIndex) {
          return row;
        }

        return row.map((cell, currentColumnIndex) =>
          currentColumnIndex === columnIndex ? nextValue : cell,
        );
      }),
    );
  }

  return (
    <div className={styles.playground}>
      <RecipePlaygroundProvider
        value={{
          runRecipe,
          openInPlayground,
          isRunning,
          canOpenInPlayground: true,
        }}>
        <CodeBlock language="yaml">{recipe}</CodeBlock>
      </RecipePlaygroundProvider>

      {hasInputTable && hasOutputTable ? (
        <div className={styles.resultLayout}>
          <DataTable
            columns={resolvedInputColumns}
            rows={currentInputRows}
            editable={editable}
            onCellChange={editable ? handleCellChange : undefined}
          />
          <div className={styles.arrow} aria-hidden="true">
            →
          </div>
          <DataTable columns={currentOutput.columns} rows={currentOutput.rows} editable={false} />
        </div>
      ) : hasOutputTable ? (
        <div className={styles.singleTableLayout}>
          <DataTable columns={currentOutput.columns} rows={currentOutput.rows} editable={false} />
        </div>
      ) : null}

      {error ? <p className={styles.error}>{error}</p> : null}
      {editable && hasInputTable ? <p className={styles.hint}>Edit the input cells, then click Run on the recipe block.</p> : null}
      {!hasInputTable && hasOutputTable ? <p className={styles.hint}>This example is displayed from the documented output and is not editable.</p> : null}
    </div>
  );
}
