import React, {useEffect, useMemo, useRef, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import yaml from 'js-yaml';
import {runRecipeRequest} from '../recipeRunnerClient';
import runPolicy from '../recipeRunPolicy.cjs';
import REGISTRY_CATALOG, {WRANGLE_MAP} from './registryCatalog';
import styles from './styles.module.css';
import recipeModel from './recipeModel.cjs';
const {parseRecipe, recipeSteps, buildRecipeYaml, updateConfig} = recipeModel;

const MAX_COLUMNS = 10;
const MAX_ROWS = 10;
const MIN_COLUMNS = 1;
const MIN_ROWS = 1;
const DEFAULT_COLUMNS = 3;
const DEFAULT_ROWS = 4;
const WRANGLE_FLOW_TRANSFER_KEY = 'wrangle-flow-playground-transfer';

let nextBlockId = 1;

const CATEGORY_ICONS = {
  AI: 'AI',
  Compare: 'Cp',
  Compute: 'Fx',
  Convert: 'Cv',
  Create: 'Cr',
  Extract: 'Ex',
  Format: 'Fmt',
  Generate: 'AI',
  Lookup: 'Lk',
  Merge: 'Mg',
  Select: 'Sl',
  Split: 'Sp',
  Transform: 'Tr',
  Utility: 'Ut',
};

function createColumnName(index) {
  return `Column ${String.fromCharCode(65 + index)}`;
}

function createRows(rowCount, columnCount) {
  return Array.from({length: rowCount}, () => Array.from({length: columnCount}, () => ''));
}

function createInitialTable() {
  const columns = Array.from({length: DEFAULT_COLUMNS}, (_, index) => createColumnName(index));
  return {
    columns,
    rows: createRows(DEFAULT_ROWS, columns.length),
  };
}

function definitionFor(type) {
  return (Object.hasOwn(WRANGLE_MAP, type) ? WRANGLE_MAP[type] : null) || {type, label: type, category: 'Recipe', color: 'slate',
    description: 'Edit this step using its YAML configuration.', fields: [], defaults: {}};
}

function createBlock(type, config) {
  const definition = definitionFor(type);
  return {id: `${type}-${nextBlockId++}`, type,
    config: structuredClone(config === undefined ? definition.buildConfig?.(definition.defaults) || {} : config),
    fieldErrors: {}, drafts: {}};
}

function blocksFromRecipe(recipe) {
  return recipeSteps(parseRecipe(recipe)).map(({type, config}) => createBlock(type, config));
}

// Form controls must reflect the actual value, including union types. Complex
// values use YAML rather than being flattened into strings or checkbox values.
function fieldForValue(field, value) {
  if (field.key === 'input' && ((Array.isArray(value) && value.every(item => typeof item === 'string')) || (value === undefined && field.type === 'list'))) return {...field, type: 'input-list'};
  if (field.key === 'input' && typeof value === 'number') return {...field, type: 'yaml'};
  if (value === undefined) return ['list', 'json'].includes(field.type) ? {...field, type: 'yaml'} : field;
  if (value === null || typeof value === 'object') return {...field, type: 'yaml'};
  if (typeof value === 'boolean') return {...field, type: 'boolean'};
  if (typeof value === 'number') return {...field, type: 'number'};
  return {...field, type: field.type === 'select' ? 'select' : 'text'};
}
function controlValue(field, value) {
  return field.type === 'yaml' ? yaml.dump(value === undefined ? [] : value, {lineWidth: -1}).trimEnd() : value ?? '';
}

function tableFromTransfer(table) {
  const columns = Array.isArray(table?.columns) ? table.columns.map((column, index) => String(column || createColumnName(index))) : [];
  const rows = Array.isArray(table?.rows)
    ? table.rows.map((row) => (Array.isArray(row) ? row.map((cell) => cell && typeof cell === 'object' ? JSON.stringify(cell) : String(cell ?? '')) : []))
    : [];
  return limitTable(columns, rows).table;
}

function consumePlaygroundTransfer() {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(WRANGLE_FLOW_TRANSFER_KEY);
  if (!raw) {
    return null;
  }

  window.localStorage.removeItem(WRANGLE_FLOW_TRANSFER_KEY);

  try {
    const payload = JSON.parse(raw);
    const blocks = blocksFromRecipe(payload.recipe);
    const table = tableFromTransfer(payload.table);

    if (!blocks.length && !table.columns.length) {
      return null;
    }

    return {
      blocks,
      table,
      options: Object.fromEntries(Object.entries(parseRecipe(payload.recipe)).filter(([key]) => key !== 'wrangles')),
    };
  } catch (error) {
    console.error('[wrangle-flow-playground] Could not load transferred recipe example:', error);
    return null;
  }
}

function moveItem(items, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
}

function limitTable(columns, rows) {
  const nextColumns = (columns.length ? columns : [createColumnName(0)]).slice(0, MAX_COLUMNS);
  const nextRows = rows.slice(0, MAX_ROWS).map((row) => nextColumns.map((_, index) => row[index] ?? ''));
  return {
    table: {
      columns: nextColumns,
      rows: nextRows,
    },
    truncated: columns.length > MAX_COLUMNS || rows.length > MAX_ROWS,
  };
}

function copyRows(rows) {
  return rows.map((row) => [...row]);
}

function getBlockOutputNames(block) {
  const output = block.config?.output;
  return (Array.isArray(output) ? output : [output]).filter(value => typeof value === 'string');
}

function uniqueOptions(options) {
  return [...new Set(options.map((option) => String(option ?? '').trim()).filter(Boolean))];
}

function WrangleIcon({category}) {
  return <span className={styles.wrangleIcon}>{CATEGORY_ICONS[category] ?? category.slice(0, 2)}</span>;
}

function RecipeIcon() {
  return (
    <svg aria-hidden="true" className={styles.recipeIcon} viewBox="0 0 24 24" fill="none">
      <path d="m4 20 4.25-1 10.9-10.9a2.15 2.15 0 0 0-3.05-3.04L5.2 15.95 4 20Z" />
      <path d="m14.75 6.4 3.05 3.05" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className={styles.playIcon} viewBox="0 0 24 24">
      <path d="M7.5 4.75v14.5L19 12 7.5 4.75Z" />
    </svg>
  );
}

function TableEditor({
  table,
  onCellChange,
  onColumnChange,
  onAddRow,
  onAddColumn,
  onRemoveRowAt,
  onRemoveColumnAt,
}) {
  return (
    <section className={styles.dataPanel}>
      <div className={styles.panelHeader}>
        <div>
          <h2>Data Board</h2>
          <p>{table.rows.length} rows · {table.columns.length} columns</p>
        </div>
      </div>

      <div className={styles.tableShell}>
        <div className={styles.tableScroll}>
          <table className={styles.playTable}>
            <thead>
              <tr>
                <th className={styles.indexHeader}>#</th>
                {table.columns.map((column, columnIndex) => (
                  <th key={`column-${columnIndex}`}>
                    <div className={styles.columnHeaderCell}>
                      <input
                        className={styles.columnInput}
                        value={column}
                        onChange={(event) => onColumnChange(columnIndex, event.target.value)}
                        spellCheck={false}
                      />
                      <button
                        type="button"
                        className={styles.inlineDangerButton}
                        onClick={() => onRemoveColumnAt(columnIndex)}
                        disabled={table.columns.length <= MIN_COLUMNS}
                        aria-label={`Remove ${column || `column ${columnIndex + 1}`}`}>
                        ×
                      </button>
                    </div>
                  </th>
                ))}
                <th className={styles.addColumnHeader}>
                  <button
                    type="button"
                    onClick={onAddColumn}
                    disabled={table.columns.length >= MAX_COLUMNS}
                    aria-label="Add column">
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  <td className={styles.indexCell}>
                    <span>{rowIndex + 1}</span>
                    <button
                      type="button"
                      className={styles.inlineDangerButton}
                      onClick={() => onRemoveRowAt(rowIndex)}
                      disabled={table.rows.length <= MIN_ROWS}
                      aria-label={`Remove row ${rowIndex + 1}`}>
                      ×
                    </button>
                  </td>
                  {table.columns.map((column, columnIndex) => (
                    <td key={`${column}-${rowIndex}`}>
                      <textarea
                        className={styles.cellInput}
                        rows={1}
                        value={row[columnIndex] ?? ''}
                        onChange={(event) => onCellChange(rowIndex, columnIndex, event.target.value)}
                        spellCheck={false}
                      />
                    </td>
                  ))}
                  <td className={styles.addColumnSpacer} aria-hidden="true" />
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className={styles.addRowButton}
            onClick={onAddRow}
            disabled={table.rows.length >= MAX_ROWS}>
            + Add Row
          </button>
        </div>
      </div>
    </section>
  );
}

function getDroppedInput(event, options) {
  const input = event.dataTransfer.getData('text/wrangle-input');
  return options.includes(input) ? input : '';
}

function InputDropZone({children, isEmpty, onDropInput}) {
  return (
    <div
      className={clsx(styles.inputDropZone, isEmpty && styles.inputDropZoneEmpty)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onDropInput(event);
      }}>
      {children}
    </div>
  );
}

function SingleInputPicker({value, options, onChange}) {
  const currentValue = String(value ?? '').trim();

  function setInput(input) {
    if (input) {
      onChange(input);
    }
  }

  return (
    <InputDropZone
      isEmpty={!currentValue}
      onDropInput={(event) => setInput(getDroppedInput(event, options))}>
      {currentValue ? (
        <button type="button" className={styles.inputChip} onClick={() => onChange('')}>
          {currentValue}
          <span>×</span>
        </button>
      ) : (
        <span className={styles.emptyInputHint}>Drop an input here</span>
      )}
    </InputDropZone>
  );
}

function MultiInputPicker({value, options, onChange}) {
  const selectedInputs = Array.isArray(value) ? value : [];

  function removeInput(input) {
    onChange(selectedInputs.filter((item) => item !== input));
  }

  function addInput(input) {
    if (!input) {
      return;
    }
    onChange([...new Set([...selectedInputs, input])]);
  }

  return (
    <div className={styles.inputPicker}>
      <InputDropZone
        isEmpty={!selectedInputs.length}
        onDropInput={(event) => addInput(getDroppedInput(event, options))}>
        {selectedInputs.length ? (
          selectedInputs.map((input) => (
            <button key={input} type="button" className={styles.inputChip} onClick={() => removeInput(input)}>
              {input}
              <span>×</span>
            </button>
          ))
        ) : (
          <span className={styles.emptyInputHint}>Drop one or more inputs here</span>
        )}
      </InputDropZone>
    </div>
  );
}

function FieldControl({field, value, onChange, availableInputs}) {
  if (field.type === 'yaml') return <textarea className={styles.fieldInput} rows={5} value={value} onChange={event => onChange(event.target.value)} spellCheck={false} />;
  const isInputField = field.key === 'input';

  if (isInputField && field.type === 'input-list') {
    return <MultiInputPicker value={value} options={availableInputs} onChange={onChange} />;
  }

  if (isInputField) {
    return <SingleInputPicker value={value} options={availableInputs} onChange={onChange} />;
  }

  if (field.type === 'select') {
    return (
      <select className={styles.fieldInput} value={String(value ?? '')} onChange={(event) => onChange(event.target.value)}>
        {!field.required ? <option value="">Use default</option> : null}
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'boolean') {
    return (
      <label className={styles.toggle}>
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        <span>{value ? 'Enabled' : 'Disabled'}</span>
      </label>
    );
  }

  if (field.type === 'number') {
    return (
      <input
        className={styles.fieldInput}
        type="number"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        spellCheck={false}
      />
    );
  }


  return (
    <input
      className={styles.fieldInput}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder={field.placeholder}
      spellCheck={false}
    />
  );
}

function BlockInspectorModal({block, availableInputs, currentColumns, onChange, onConfigChange, onClose}) {
  if (!block) {
    return null;
  }

  const definition = definitionFor(block.type);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.eyebrow}>{definition.category}</p>
            <div className={styles.modalTitleGroup}>
              <h2>{definition.label}</h2>
              <span className={clsx(styles.colorBadge, styles[`badge${definition.color}`])}>
                {definition.type}
              </span>
            </div>
          </div>
          <button type="button" className={styles.closeModalButton} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.helperText}>{definition.description}</p>

          <div className={styles.fieldGrid}>
            {definition.fields.map((original) => {
              const field = fieldForValue(original, block.config?.[original.key]);
              return (
              <label key={field.key} className={styles.fieldCard}>
                <span className={styles.fieldLabel}>{field.label}</span>
                <FieldControl 
                  field={field} 
                  value={block.drafts[field.key] ?? controlValue(field, block.config?.[field.key])}
                  availableInputs={availableInputs}
                  onChange={(value) => onChange(block.id, field, value)}
                />
                {block.fieldErrors[field.key] ? <span role="alert">{block.fieldErrors[field.key]}</span> : null}
                {field.helper ? <span className={styles.fieldHint}>{field.helper}</span> : null}
              </label>
            );})}
          </div>

          <label className={styles.fieldCard}>
            <span className={styles.fieldLabel}>Full configuration (YAML)</span>
            <textarea aria-label="Full configuration (YAML)" className={styles.fieldInput} rows={10}
              value={block.configDraft ?? yaml.dump(block.config, {lineWidth: -1})}
              onChange={event => onConfigChange(block.id, event.target.value)} spellCheck={false} />
            {block.configError ? <span role="alert">{block.configError}</span> : null}
          </label>

          <div className={styles.columnStrip}>
            <span>Available inputs</span>
            <div className={styles.columnChips}>
              {availableInputs.map((column, index) => (
                <button
                  key={`${column}-${index}`}
                  type="button"
                  draggable
                  onClick={() => {
                    const inputField = definition.fields.find((field) => field.key === 'input');
                    if (!inputField) {
                      return;
                    }

                    const currentValue = block.config?.input;
                    const field = fieldForValue(inputField, currentValue);
                    const nextValue = Array.isArray(currentValue) ? [...new Set([...currentValue, column])] : column;
                    onChange(block.id, field, field.type === 'yaml' ? yaml.dump(nextValue).trimEnd() : nextValue);
                  }}
                  onDragStart={(event) => event.dataTransfer.setData('text/wrangle-input', column)}
                  className={styles.availableInputChip}>
                  {column}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button type="button" className={styles.primaryButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function PipelineCard({block, isActive, index, isLast, onSelect, onMove, onDuplicate, onRemove}) {
  const definition = definitionFor(block.type);

  return (
    <div className={styles.pipelineNode}>
      <div
        role="button"
        tabIndex={0}
        className={clsx(styles.pipelineCard, isActive && styles.pipelineCardActive, styles[`card${definition.color}`])}
        onClick={() => onSelect(block.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(block.id);
          }
        }}>
        <span className={styles.nodeIndex}>{index + 1}</span>
        <span className={styles.nodeMain}>
          <WrangleIcon category={definition.category} />
          <span>
            <strong>{definition.label}</strong>
            <span>{definition.type}</span>
          </span>
        </span>
        <span className={styles.nodeActions}>
          <button type="button" onClick={(event) => { event.stopPropagation(); onMove(index, -1); }} aria-label="Move block up">
            ↑
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onMove(index, 1); }} aria-label="Move block down">
            ↓
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onDuplicate(block.id); }} aria-label="Duplicate block">
            ⧉
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onRemove(block.id); }} aria-label="Remove block">
            ×
          </button>
        </span>
      </div>
      {!isLast ? <div className={styles.connector} aria-hidden="true" /> : null}
    </div>
  );
}

function Palette({onAdd}) {
  const [openCategory, setOpenCategory] = useState('Convert');
  const groupRefs = useRef({});
  const categories = REGISTRY_CATALOG.reduce((grouped, item) => {
    grouped[item.category] = grouped[item.category] ?? [];
    grouped[item.category].push(item);
    return grouped;
  }, {});

  useEffect(() => {
    if (!openCategory) {
      return;
    }

    groupRefs.current[openCategory]?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [openCategory]);

  return (
    <div className={styles.palette}>
      {Object.entries(categories).map(([category, items]) => {
        const isOpen = openCategory === category;

        return (
          <section
            key={category}
            ref={(element) => {
              groupRefs.current[category] = element;
            }}
            className={clsx(styles.paletteGroup, isOpen && styles.paletteGroupOpen)}>
            <button
              type="button"
              className={styles.groupHeader}
              aria-expanded={isOpen}
              onClick={() => setOpenCategory(isOpen ? '' : category)}>
              <span className={styles.categoryTitle}>{category}</span>
              <span className={styles.categoryMeta}>
                {items.length} {items.length === 1 ? 'block' : 'blocks'}
                <span className={styles.categoryChevron}>{isOpen ? '-' : '+'}</span>
              </span>
            </button>
            {isOpen ? (
              <div className={styles.paletteCards}>
                {items.map((item) => (
                  <div
                    key={item.type}
                    className={clsx(styles.paletteCard, styles[`card${item.color}`])}
                    draggable
                    onDragStart={(event) => event.dataTransfer.setData('text/wrangle-type', item.type)}>
                    <WrangleIcon category={item.category} />
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.description}</p>
                    </div>
                    <button type="button" onClick={() => onAdd(item.type)}>
                      Add
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

export default function WrangleFlowPlayground() {
  const {siteConfig} = useDocusaurusContext();
  const runnerUrl = siteConfig.customFields?.recipeRunnerUrl || '/run-recipe';
  const [table, setTable] = useState(createInitialTable);
  const [blocks, setBlocks] = useState([]);
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [recipeOptions, setRecipeOptions] = useState({});

  useEffect(() => {
    const transfer = consumePlaygroundTransfer();
    if (!transfer) {
      return;
    }

    setTable(transfer.table);
    setRecipeOptions(transfer.options);
    setBlocks(transfer.blocks);
    setActiveBlockId(transfer.blocks[0]?.id ?? null);
    setNotice('Loaded the recipe example into the playground.');
    setError('');
  }, []);

  const activeBlock = useMemo(
    () => blocks.find((block) => block.id === activeBlockId) ?? null,
    [activeBlockId, blocks],
  );

  const activeBlockAvailableInputs = useMemo(() => {
    if (!activeBlock) {
      return uniqueOptions(table.columns);
    }

    const activeIndex = blocks.findIndex((block) => block.id === activeBlock.id);
    const previousOutputs = blocks.slice(0, Math.max(activeIndex, 0)).flatMap(getBlockOutputNames);
    return uniqueOptions([...table.columns, ...previousOutputs]);
  }, [activeBlock, blocks, table.columns]);

  const recipeYaml = useMemo(() => buildRecipeYaml(blocks, recipeOptions), [blocks, recipeOptions]);
  const runDisabledReason = (blocks.some(block => block.configError || Object.values(block.fieldErrors).some(Boolean)) ? 'Fix the invalid YAML configuration before running.' : '') || runPolicy.getRunDisabledReason(recipeYaml);

  function setCellValue(rowIndex, columnIndex, nextValue) {
    setTable((previousTable) => ({
      ...previousTable,
      rows: previousTable.rows.map((row, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? row.map((cell, currentColumnIndex) => (currentColumnIndex === columnIndex ? nextValue : cell))
          : row,
      ),
    }));
  }

  function setColumnName(columnIndex, nextValue) {
    setTable((previousTable) => ({
      ...previousTable,
      columns: previousTable.columns.map((column, currentColumnIndex) =>
        currentColumnIndex === columnIndex ? nextValue : column,
      ),
    }));
  }

  function addRow() {
    setTable((previousTable) => ({
      ...previousTable,
      rows:
        previousTable.rows.length >= MAX_ROWS
          ? previousTable.rows
          : [...previousTable.rows, Array.from({length: previousTable.columns.length}, () => '')],
    }));
  }

  function removeRowAt(rowIndex) {
    setTable((previousTable) => ({
      ...previousTable,
      rows:
        previousTable.rows.length <= MIN_ROWS
          ? previousTable.rows
          : previousTable.rows.filter((_, currentIndex) => currentIndex !== rowIndex),
    }));
  }

  function addColumn() {
    setTable((previousTable) => {
      if (previousTable.columns.length >= MAX_COLUMNS) {
        return previousTable;
      }

      return {
        columns: [...previousTable.columns, createColumnName(previousTable.columns.length)],
        rows: previousTable.rows.map((row) => [...row, '']),
      };
    });
  }

  function removeColumnAt(columnIndex) {
    setTable((previousTable) => {
      if (previousTable.columns.length <= MIN_COLUMNS) {
        return previousTable;
      }

      return {
        columns: previousTable.columns.filter((_, currentIndex) => currentIndex !== columnIndex),
        rows: previousTable.rows.map((row) => row.filter((_, currentIndex) => currentIndex !== columnIndex)),
      };
    });
  }

  function addBlock(type) {
    const nextBlock = createBlock(type);
    setBlocks((previousBlocks) => [...previousBlocks, nextBlock]);
    setActiveBlockId(nextBlock.id);
    setNotice(`Added ${WRANGLE_MAP[type].label} to the pipeline.`);
  }

  function updateBlockValue(blockId, field, value) {
    setBlocks(previous => previous.map(block => {
      if (block.id !== blockId) return block;
      try {
        const parsed = field.type === 'yaml' ? yaml.load(value) : field.type === 'number' && value !== '' ? Number(value) : value;
        if (parsed === undefined) throw new Error('Enter a YAML value (use null for an empty value).');
        JSON.stringify(parsed);
        return {...block, config: updateConfig(block.config, field.key, parsed), configDraft: undefined, configError: '',
          drafts: {...block.drafts, [field.key]: value}, fieldErrors: {...block.fieldErrors, [field.key]: ''}};
      } catch (error) {
        return {...block, drafts: {...block.drafts, [field.key]: value}, fieldErrors: {...block.fieldErrors, [field.key]: error.message}};
      }
    }));
  }

  function updateBlockConfig(blockId, source) {
    setBlocks(previous => previous.map(block => {
      if (block.id !== blockId) return block;
      try {
        const config = yaml.load(source);
        if (config === undefined) throw new Error('Enter a YAML configuration.');
        JSON.stringify(config); // Recursive YAML aliases cannot be executed as a recipe.
        return {...block, config, configDraft: source, configError: '', drafts: {}, fieldErrors: {}};
      } catch (error) { return {...block, configDraft: source, configError: error.message}; }
    }));
  }

  function moveBlock(index, direction) {
    setBlocks((previousBlocks) => moveItem(previousBlocks, index, index + direction));
  }

  function duplicateBlock(blockId) {
    const block = blocks.find((item) => item.id === blockId);
    if (!block) {
      return;
    }

    const duplicate = {
      ...block,
      id: `${block.type}-${nextBlockId++}`,
      config: structuredClone(block.config), drafts: {...block.drafts}, fieldErrors: {...block.fieldErrors},
    };

    setBlocks((previousBlocks) => {
      const nextBlocks = [...previousBlocks];
      const index = nextBlocks.findIndex((item) => item.id === blockId);
      nextBlocks.splice(index + 1, 0, duplicate);
      return nextBlocks;
    });
    setActiveBlockId(duplicate.id);
  }

  function removeBlock(blockId) {
    const remainingBlocks = blocks.filter((block) => block.id !== blockId);
    setBlocks(remainingBlocks);
    if (activeBlockId === blockId) {
      setActiveBlockId(remainingBlocks[0]?.id ?? null);
    }
  }

  function resetBoard() {
    setRecipeOptions({});
    setBlocks([]);
    setActiveBlockId(null);
    setTable(createInitialTable());
    setError('');
    setNotice('Board reset. Add new blocks to build another recipe.');
  }

  function validateTable() {
    const normalizedColumns = table.columns.map((column, index) => column.trim() || createColumnName(index));
    const uniqueColumns = new Set(normalizedColumns);

    if (uniqueColumns.size !== normalizedColumns.length) {
      throw new Error('Column names need to be unique before you run the board.');
    }

    return {
      columns: normalizedColumns,
      rows: copyRows(table.rows),
    };
  }

  async function runBoard() {
    if (runDisabledReason) {
      setError(runDisabledReason);
      return;
    }
    setError('');
    setNotice('');

    if (!blocks.length) {
      setNotice('Add at least one wrangle block before running the board.');
      return;
    }

    setIsRunning(true);
    try {
      const input = validateTable();
      const payload = await runRecipeRequest({
        runnerUrl,
        recipe: recipeYaml,
        input,
        outputColumns: [],
      });

      const {table: nextTable, truncated} = limitTable(payload.columns || [], payload.rows || []);
      setTable(nextTable);
      setNotice(
        truncated
          ? 'Recipe ran successfully. Output was trimmed to the 10x10 playground limit.'
          : 'Recipe ran successfully. The board now shows your latest output.',
      );
    } catch (runError) {
      const message =
        runError instanceof TypeError
          ? `Could not reach the local recipe runner at ${runnerUrl}. Make sure the site is running and check the runner logs.`
          : runError.message;

      console.error('[wrangle-flow-playground] Run failed:', runError);
      setError(message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.appBar}>
        <div className={styles.appTitle}>
          <RecipeIcon />
          <div>
            <h1>Recipe Playground</h1>
            <span>Build, preview, and run a Wrangles recipe</span>
          </div>
        </div>
        <div className={styles.appActions}>
          <button type="button" className={styles.secondaryButton} onClick={resetBoard}>
            Reset
          </button>
          <button
            type="button"
            className={styles.runButton}
            onClick={runBoard}
            disabled={isRunning || Boolean(runDisabledReason)}
            aria-label={isRunning ? 'Recipe is running' : 'Run recipe'}
            title={runDisabledReason || (isRunning ? 'Recipe is running' : 'Run recipe')}>
            <PlayIcon />
          </button>
        </div>
      </header>
      {runDisabledReason && <p role="status">{runDisabledReason}</p>}

      <div className={styles.workspace}>
        <aside className={styles.leftPane}>
          <div className={styles.paneHeader}>
            <h2>Wrangle Blocks</h2>
            <p>Drag or add a block to the pipeline.</p>
          </div>
          <Palette onAdd={addBlock} />
        </aside>

        <main className={styles.centerPane}>
          <div
            className={styles.pipelineBoard}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const droppedType = event.dataTransfer.getData('text/wrangle-type');
              if (WRANGLE_MAP[droppedType]) {
                addBlock(droppedType);
              }
            }}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Pipeline Builder</h2>
                <p>{blocks.length ? `${blocks.length} configured ${blocks.length === 1 ? 'step' : 'steps'}` : 'Drop blocks here to start a recipe.'}</p>
              </div>
            </div>
            {blocks.length ? (
              <div className={styles.pipelineTrack}>
                {blocks.map((block, index) => (
                  <PipelineCard
                    key={block.id}
                    block={block}
                    index={index}
                    isActive={block.id === activeBlockId}
                    isLast={index === blocks.length - 1}
                    onSelect={setActiveBlockId}
                    onMove={moveBlock}
                    onDuplicate={duplicateBlock}
                    onRemove={removeBlock}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyPipeline}>
                <strong>Drop wrangle cards here</strong>
                <p>Your recipe steps will stack in order as connected nodes.</p>
              </div>
            )}
          </div>

          <TableEditor
            table={table}
            onCellChange={setCellValue}
            onColumnChange={setColumnName}
            onAddRow={addRow}
            onAddColumn={addColumn}
            onRemoveRowAt={removeRowAt}
            onRemoveColumnAt={removeColumnAt}
          />
        </main>

        <aside className={styles.rightPane}>
          <div className={styles.recipePanel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Recipe</h2>
                <p>Live YAML preview</p>
              </div>
              <span className={styles.recipeMeta}>{blocks.length} wrangles</span>
            </div>
            <CodeBlock language="yaml" showLineNumbers>{recipeYaml}</CodeBlock>
            {notice ? <p className={styles.notice}>{notice}</p> : null}
            {error ? <p className={styles.error}>{error}</p> : null}
          </div>
        </aside>
      </div>

      <BlockInspectorModal 
        block={activeBlock} 
        availableInputs={activeBlockAvailableInputs}
        currentColumns={table.columns} 
        onChange={updateBlockValue}
        onConfigChange={updateBlockConfig}
        onClose={() => setActiveBlockId(null)} 
      />
    </div>
  );
}
