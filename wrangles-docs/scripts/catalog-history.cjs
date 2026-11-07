const keyPattern = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/;
const historyEntrySchema = {
  type: 'object', additionalProperties: false, required: ['status', 'catalog_key'],
  properties: {
    status: {enum: ['legacy', 'not active']},
    catalog_key: {type: 'string', pattern: keyPattern.source},
  },
};
function historyStatus(value) {
  return typeof value === 'string' ? value : value?.status;
}
function normalizeHistory(history = {}) {
  if (!history || typeof history !== 'object' || Array.isArray(history)) throw new Error('Invalid catalog history');
  return Object.fromEntries(Object.entries(history).map(([name, value]) => {
    const record = typeof value === 'string' ? {status: value, catalog_key: name} : value;
    if (!record || typeof record !== 'object' || Array.isArray(record)
      || Object.keys(record).sort().join(',') !== 'catalog_key,status'
      || !['legacy', 'not active'].includes(record.status)
      || typeof record.catalog_key !== 'string' || !keyPattern.test(record.catalog_key)) {
      throw new Error(`Invalid catalog history: ${name}`);
    }
    return [name, {...record}];
  }));
}
module.exports = {historyStatus, normalizeHistory, historyEntrySchema};
