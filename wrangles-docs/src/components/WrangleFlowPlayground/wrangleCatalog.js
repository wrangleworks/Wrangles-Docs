import GENERATED_WRANGLE_CATALOG from './wrangleCatalog.generated';
import WRANGLE_CATALOG_OVERRIDES from './wrangleCatalog.overrides';

function parseListValue(value) {
  return Array.isArray(value)
    ? value.map((item) => String(item).replace(/^-\s*/, '').trim()).filter(Boolean)
    : String(value ?? '')
        .split('\n')
        .map((item) => item.replace(/^-\s*/, '').trim())
        .filter(Boolean);
}

function parseJsonValue(value) {
  if (value === '' || value === undefined || value === null) {
    return '';
  }

  if (typeof value !== 'string') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return value === '' || value === undefined || value === null || value === false;
}

function normalizeFieldValue(field, value) {
  if (field.type === 'list') {
    return parseListValue(value);
  }

  if (field.type === 'boolean') {
    return Boolean(value);
  }

  if (field.type === 'number') {
    if (value === '' || value === undefined || value === null) {
      return '';
    }

    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? value : numberValue;
  }

  if (field.type === 'json') {
    return parseJsonValue(value);
  }

  return value;
}

function buildConfigFromFields(fields, values) {
  return fields.reduce((config, field) => {
    const value = normalizeFieldValue(field, values[field.key]);

    if (field.required || !isEmptyValue(value)) {
      config[field.key] = value;
    }

    return config;
  }, {});
}

function applyOverride(entry) {
  const override = WRANGLE_CATALOG_OVERRIDES[entry.type] ?? {};
  const fieldOverrides = override.fields ?? {};
  const fields = entry.fields.map((field) => ({
    ...field,
    ...(fieldOverrides[field.key] ?? {}),
  }));
  const defaults = {
    ...entry.defaults,
    ...(override.defaults ?? {}),
  };

  const {fields: _fields, defaults: _defaults, ...entryOverride} = override;

  return {
    ...entry,
    ...entryOverride,
    defaults,
    fields,
    buildConfig(values) {
      return buildConfigFromFields(fields, values);
    },
  };
}

const WRANGLE_CATALOG = GENERATED_WRANGLE_CATALOG.map(applyOverride);

export const WRANGLE_MAP = Object.fromEntries(WRANGLE_CATALOG.map((item) => [item.type, item]));

export default WRANGLE_CATALOG;
