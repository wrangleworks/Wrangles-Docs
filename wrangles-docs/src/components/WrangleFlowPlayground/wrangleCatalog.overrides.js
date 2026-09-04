const WRANGLE_CATALOG_OVERRIDES = {
  'convert.case': {
    label: 'Case Shift',
    description: 'Change text casing in a column.',
    color: 'sun',
    defaults: {
      input: 'Column A',
      output: 'Column A Upper',
      case: 'upper',
    },
    fields: {
      input: {
        label: 'Input Column',
        type: 'text',
        helper: 'Column to read text from.',
      },
      output: {
        label: 'Output Column',
        type: 'text',
        helper: 'New column name for the transformed text.',
      },
      case: {
        label: 'Case',
      },
    },
  },
  'convert.data_type': {
    label: 'Type Cast',
    description: 'Convert text or numbers into another data type.',
    color: 'lagoon',
    defaults: {
      input: 'Column A',
      output: 'Column A Int',
      data_type: 'int',
      default: '',
    },
    fields: {
      input: {
        label: 'Input Column',
        type: 'text',
      },
      output: {
        label: 'Output Column',
        type: 'text',
      },
      data_type: {
        label: 'Data Type',
      },
      default: {
        label: 'Fallback Value',
        helper: 'Optional value to use when conversion fails.',
      },
    },
  },
  'merge.concatenate': {
    label: 'Concatenate',
    description: 'Join multiple columns or list elements into one string.',
    color: 'ember',
    defaults: {
      input: ['Column A', 'Column B'],
      output: 'Joined Text',
      char: ', ',
      skip_empty: false,
    },
    fields: {
      input: {
        label: 'Input Columns',
        helper: 'Drop one or more columns to join.',
      },
      output: {
        label: 'Output Column',
        type: 'text',
      },
      char: {
        label: 'Join Character',
        placeholder: ', ',
      },
    },
  },
  'merge.to_list': {
    label: 'Make List',
    description: 'Collect multiple columns into a list.',
    color: 'forest',
    defaults: {
      input: ['Column A', 'Column B', 'Column C'],
      output: 'Collected List',
      include_empty: false,
    },
    fields: {
      input: {
        label: 'Input Columns',
      },
      output: {
        label: 'Output Column',
        type: 'text',
      },
      include_empty: {
        label: 'Include Empty',
      },
    },
  },
  'split.text': {
    label: 'Split Text',
    description: 'Split a text column by a separator.',
    color: 'violet',
    defaults: {
      input: 'Column A',
      output: 'Split Parts',
      char: ', ',
      element: '',
      inclusive: false,
      pad: false,
      skip_empty: false,
    },
    fields: {
      input: {
        label: 'Input Column',
        type: 'text',
      },
      output: {
        label: 'Output',
        type: 'text',
        helper: 'Use a single column or a wildcard like Result*.',
      },
      char: {
        label: 'Separator',
        placeholder: ', ',
      },
      element: {
        label: 'Specific Element',
        placeholder: 'Leave blank to return the full split result',
      },
    },
  },
  'split.dictionary': {
    label: 'Break Dictionary',
    description: 'Expand dictionary keys into columns.',
    color: 'sky',
    defaults: {
      input: 'Dictionary Column',
      output: 'Expanded*',
      default: '',
    },
    fields: {
      input: {
        label: 'Input Column',
        type: 'text',
      },
      output: {
        label: 'Output Pattern',
        type: 'text',
        placeholder: 'Expanded*',
      },
    },
  },
  'select.columns': {
    label: 'Select Columns',
    description: 'Keep only the columns you want to continue with.',
    color: 'slate',
    defaults: {
      input: ['Column A', 'Column B'],
    },
    fields: {
      input: {
        label: 'Columns to Keep',
      },
    },
  },
};

export default WRANGLE_CATALOG_OVERRIDES;
