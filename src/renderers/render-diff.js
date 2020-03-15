import { isObject, flatten } from 'lodash';

import nodeTypes from '../ast/node-types';

const DEFAULT_INDENT_LEVEL = 1;
const TAB = '  ';
const TAB_STEP = 2;

const sortByKeys = (ast) => [...ast].sort(({ key: keyA }, { key: keyB }) => {
  if (keyA === keyB) {
    return 0;
  }

  if (keyA < keyB) {
    return -1;
  }

  return 1;
});

const getIndent = (level) => TAB.repeat(level);

const stringify = (value, indentLevel) => {
  if (isObject(value)) {
    const string = Object.entries(value).map(([key, _value]) => `${getIndent(indentLevel + 3)}${key}: ${_value}`).join('\n');

    return `{\n${string}\n${getIndent(indentLevel + 1)}}`;
  }

  return value;
};

const render = (ast, indentLevel) => {
  const indent = getIndent(indentLevel);

  /* eslint-disable max-len */
  const diffFormetterByType = {
    [nodeTypes.CHANGED]: (data) => [diffFormetterByType[nodeTypes.ADDED](data), diffFormetterByType[nodeTypes.REMOVED](data)],
    [nodeTypes.UNCHANGED]: ({ key, oldValue }) => `${indent}  ${key}: ${oldValue}`,
    [nodeTypes.REMOVED]: ({ key, oldValue }) => `${indent}- ${key}: ${stringify(oldValue, indentLevel)}`,
    [nodeTypes.ADDED]: ({ key, newValue }) => `${indent}+ ${key}: ${stringify(newValue, indentLevel)}`,
    [nodeTypes.NESTED]: ({ children, key }) => `${indent}${TAB}${key}: {\n${render(children, indentLevel + TAB_STEP)}\n${indent}${TAB}}`,
  };
  /* eslint-enable max-len */

  return flatten(
    sortByKeys(ast)
      .map(({ type, ...data }) => {
        const format = diffFormetterByType[type];

        return format(data);
      }),
  ).join('\n');
};

export default (ast) => `{\n${render(ast, DEFAULT_INDENT_LEVEL)}\n}`;
