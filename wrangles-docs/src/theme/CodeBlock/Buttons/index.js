import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {translate} from '@docusaurus/Translate';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import yaml from 'js-yaml';
import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import Button from '@theme/CodeBlock/Buttons/Button';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';
import {useRecipePlayground} from '@site/src/components/RecipePlayground/context';
import {runRecipeRequest} from '@site/src/components/recipeRunnerClient';
import styles from './styles.module.css';

const WRANGLE_FLOW_TRANSFER_KEY = 'wrangle-flow-playground-transfer';

function normalizeRecipe(recipe) {
  return String(recipe || '').replace(/\t/g, '  ');
}

function parseRecipe(recipe) {
  try {
    return yaml.load(normalizeRecipe(recipe));
  } catch (_error) {
    return null;
  }
}

function isRecipeYaml(metadata) {
  if (!/ya?ml/i.test(metadata?.language || '')) {
    return false;
  }

  const parsed = parseRecipe(metadata.code);
  return Array.isArray(parsed?.wrangles) && parsed.wrangles.length > 0;
}

function fallbackInputTable(recipe) {
  const parsed = parseRecipe(recipe);
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

  return {
    columns: columns.length ? columns : ['input'],
    rows: [Array.from({length: Math.max(columns.length, 1)}, () => '')],
  };
}

function tableFromElement(table) {
  if (!table) {
    return null;
  }

  const columns = [...table.querySelectorAll('thead th')].map((cell) =>
    cell.textContent.trim(),
  );
  const rows = [...table.querySelectorAll('tbody tr')].map((row) =>
    [...row.querySelectorAll('th, td')].map((cell) => cell.textContent.trim()),
  );

  if (!columns.length || !rows.length) {
    return null;
  }

  return {
    columns,
    rows: rows.map((row) => columns.map((_, index) => row[index] ?? '')),
  };
}

function findSampleGrid(control) {
  const codeBlock = control.closest('.theme-code-block');
  let candidate = codeBlock?.nextElementSibling ?? null;

  while (candidate) {
    if (/^H[2-4]$/.test(candidate.tagName)) {
      break;
    }

    if (candidate.classList.contains('ww-sample-grid')) {
      return candidate;
    }

    candidate = candidate.nextElementSibling;
  }

  return null;
}

function findSamplePanel(grid, label) {
  return [...(grid?.querySelectorAll('.ww-sample-panel') ?? [])].find((panel) => {
    const heading = panel.querySelector('h5');
    const headingLabel = heading?.firstChild?.textContent.trim().toLowerCase();
    return headingLabel === label;
  });
}

function findInputTable(control, recipe) {
  const grid = findSampleGrid(control);
  const inputPanel = findSamplePanel(grid, 'input sample');
  const table = tableFromElement(inputPanel?.querySelector('table'));

  return table || fallbackInputTable(recipe);
}

function enableInputEditing(control) {
  const grid = findSampleGrid(control);
  const inputPanel = findSamplePanel(grid, 'input sample');
  const table = inputPanel?.querySelector('table');
  const columns = [...(table?.querySelectorAll('thead th') ?? [])].map((cell) =>
    cell.textContent.trim(),
  );
  const cells = [...(table?.querySelectorAll('tbody td') ?? [])];

  cells.forEach((cell, index) => {
    const columnIndex = columns.length ? index % columns.length : 0;
    const rowIndex = columns.length ? Math.floor(index / columns.length) : index;
    cell.contentEditable = 'true';
    cell.spellcheck = false;
    cell.classList.add('ww-editable-sample-cell');
    cell.setAttribute(
      'aria-label',
      `${columns[columnIndex] || 'Input'}, row ${rowIndex + 1}`,
    );
  });

  return cells;
}

function setRunError(control, message) {
  const grid = findSampleGrid(control);
  if (!grid) {
    return;
  }

  const parent = grid.parentElement;
  let error = parent?.querySelector(':scope > .ww-recipe-run-error');

  if (!message) {
    error?.remove();
    return;
  }

  if (!error) {
    error = document.createElement('p');
    error.className = 'ww-recipe-run-error';
    grid.insertAdjacentElement('afterend', error);
  }

  error.textContent = message;
}

function replaceOutputTable(control, payload, documentedColumns) {
  const grid = findSampleGrid(control);
  const outputPanel = findSamplePanel(grid, 'output sample');
  const columns = payload.columns?.length ? payload.columns : documentedColumns;
  const rows = Array.isArray(payload.rows) ? payload.rows : [];

  if (!outputPanel || !columns.length) {
    return;
  }

  let table = outputPanel.querySelector('table');
  if (!table) {
    table = document.createElement('table');
    outputPanel.querySelector(':scope > p')?.remove();
    outputPanel.appendChild(table);
  }

  const thead = document.createElement('thead');
  const headingRow = document.createElement('tr');
  columns.forEach((column) => {
    const heading = document.createElement('th');
    heading.textContent = String(column ?? '');
    headingRow.appendChild(heading);
  });
  thead.appendChild(headingRow);

  const tbody = document.createElement('tbody');
  rows.forEach((row) => {
    const tableRow = document.createElement('tr');
    columns.forEach((_, columnIndex) => {
      const cell = document.createElement('td');
      cell.textContent = String(row?.[columnIndex] ?? '');
      tableRow.appendChild(cell);
    });
    tbody.appendChild(tableRow);
  });

  table.replaceChildren(thead, tbody);
}

function openCodeBlockInPlayground(control, recipe) {
  const normalizedRecipe = normalizeRecipe(recipe);
  window.localStorage.setItem(
    WRANGLE_FLOW_TRANSFER_KEY,
    JSON.stringify({
      recipe: normalizedRecipe,
      table: findInputTable(control, normalizedRecipe),
      createdAt: Date.now(),
    }),
  );
  window.location.assign('/playground');
}

function RunButton() {
  const recipePlayground = useRecipePlayground();
  const {metadata} = useCodeBlockContext();
  const {siteConfig} = useDocusaurusContext();
  const rawControlRef = useRef(null);
  const [isRawRunning, setIsRawRunning] = useState(false);
  const isCurrentPlayground =
    window.location.pathname.replace(/\/$/, '') === '/playground';
  const canRunRawRecipe = !isCurrentPlayground && isRecipeYaml(metadata);
  const runnerUrl = siteConfig.customFields?.recipeRunnerUrl || '/run-recipe';

  useEffect(() => {
    if (recipePlayground || !canRunRawRecipe || !rawControlRef.current) {
      return undefined;
    }

    const cells = enableInputEditing(rawControlRef.current);
    return () => {
      cells.forEach((cell) => {
        cell.removeAttribute('contenteditable');
        cell.removeAttribute('spellcheck');
        cell.removeAttribute('aria-label');
        cell.classList.remove('ww-editable-sample-cell');
      });
    };
  }, [canRunRawRecipe, recipePlayground]);

  if (!recipePlayground && !canRunRawRecipe) {
    return null;
  }

  if (recipePlayground) {
    const {runRecipe, isRunning} = recipePlayground;

    return (
      <Button
        aria-label={translate({
          id: 'theme.CodeBlock.runRecipeAriaLabel',
          message: 'Run recipe example',
          description: 'The ARIA label for the recipe run button on code blocks',
        })}
        title={translate({
          id: 'theme.CodeBlock.runRecipeTitle',
          message: 'Run',
          description: 'The title for the recipe run button on code blocks',
        })}
        className={styles.runButton}
        disabled={isRunning}
        onClick={runRecipe}>
        <span className={styles.runButtonLabel}>{isRunning ? 'Running' : 'Run'}</span>
      </Button>
    );
  }

  const runRawRecipe = async () => {
    const control = rawControlRef.current;
    const normalizedRecipe = normalizeRecipe(metadata.code);
    const grid = findSampleGrid(control);
    const outputPanel = findSamplePanel(grid, 'output sample');
    const documentedOutput = tableFromElement(outputPanel?.querySelector('table'));

    setIsRawRunning(true);
    setRunError(control, '');

    try {
      const payload = await runRecipeRequest({
        runnerUrl,
        recipe: normalizedRecipe,
        input: findInputTable(control, normalizedRecipe),
        outputColumns: documentedOutput?.columns ?? [],
      });
      replaceOutputTable(control, payload, documentedOutput?.columns ?? []);
    } catch (runError) {
      const message =
        runError instanceof TypeError
          ? `Could not reach the local recipe runner at ${runnerUrl}. Make sure npm start is running and check the terminal for runner logs.`
          : runError.message;

      console.error('[raw-recipe-playground] Run failed:', runError);
      setRunError(control, message);
    } finally {
      setIsRawRunning(false);
    }
  };

  return (
    <span ref={rawControlRef} className={styles.rawButtonControl}>
      <Button
        aria-label={translate({
          id: 'theme.CodeBlock.runRecipeAriaLabel',
          message: 'Run recipe example',
          description: 'The ARIA label for the recipe run button on code blocks',
        })}
        title={translate({
          id: 'theme.CodeBlock.runRecipeTitle',
          message: 'Run',
          description: 'The title for the recipe run button on code blocks',
        })}
        className={styles.runButton}
        disabled={isRawRunning}
        onClick={runRawRecipe}>
        <span className={styles.runButtonLabel}>{isRawRunning ? 'Running' : 'Run'}</span>
      </Button>
    </span>
  );
}

function PlaygroundButton() {
  const recipePlayground = useRecipePlayground();
  const {metadata} = useCodeBlockContext();
  const isCurrentPlayground =
    window.location.pathname.replace(/\/$/, '') === '/playground';
  const canOpenRawRecipe =
    !isCurrentPlayground && isRecipeYaml(metadata);

  if (!recipePlayground?.canOpenInPlayground && !canOpenRawRecipe) {
    return null;
  }

  const handleClick = (event) => {
    if (recipePlayground?.canOpenInPlayground) {
      recipePlayground.openInPlayground();
      return;
    }

    openCodeBlockInPlayground(event.currentTarget, metadata.code);
  };

  return (
    <Button
      aria-label={translate({
        id: 'theme.CodeBlock.openRecipePlaygroundAriaLabel',
        message: 'Open recipe example in the playground',
        description: 'The ARIA label for the playground button on recipe code blocks',
      })}
      title={translate({
        id: 'theme.CodeBlock.openRecipePlaygroundTitle',
        message: 'Open in Playground',
        description: 'The title for the playground button on recipe code blocks',
      })}
      className={styles.playgroundButton}
      onClick={handleClick}>
      <span className={styles.runButtonLabel}>Playground</span>
    </Button>
  );
}

export default function CodeBlockButtons({className}) {
  return (
    <BrowserOnly>
      {() => (
        <div className={clsx(className, styles.buttonGroup)}>
          <WordWrapButton />
          <CopyButton />
          <RunButton />
          <PlaygroundButton />
        </div>
      )}
    </BrowserOnly>
  );
}
