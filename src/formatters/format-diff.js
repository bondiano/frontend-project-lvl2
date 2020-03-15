import { isObject, flatten } from 'lodash';

import { sortByKeys } from './utils';
import nodeTypes from '../ast/node-types';

const DEFAULT_INDENT_LEVEL = 1;
const TAB = '  ';
const TAB_STEP = 2;


const getIndent = (level) => TAB.repeat(level);

const stringify = (value, indentLevel) => {
  if (isObject(value)) {
    const string = Object.entries(value).map(([key, _value]) => `${getIndent(indentLevel + 3)}${key}: ${_value}`).join('\n');

    return `{\n${string}\n${getIndent(indentLevel + 1)}}`;
  }

  return value;
};

const render = (node, indentLevel) => {
  const indent = getIndent(indentLevel);

  /* eslint-disable max-len */
  const diffFormatterByType = {
    [nodeTypes.CHANGED]: (data) => [diffFormatterByType[nodeTypes.ADDED](data), diffFormatterByType[nodeTypes.REMOVED](data)],
    [nodeTypes.UNCHANGED]: ({ key, oldValue }) => `${indent}  ${key}: ${oldValue}`,
    [nodeTypes.REMOVED]: ({ key, oldValue }) => `${indent}- ${key}: ${stringify(oldValue, indentLevel)}`,
    [nodeTypes.ADDED]: ({ key, newValue }) => `${indent}+ ${key}: ${stringify(newValue, indentLevel)}`,
    [nodeTypes.NESTED]: ({ children, key }) => `${indent}${TAB}${key}: {\n${render(children, indentLevel + TAB_STEP)}\n${indent}${TAB}}`,
  };
  /* eslint-enable max-len */

  return flatten(
    sortByKeys(node)
      .map(({ type, ...data }) => {
        const format = diffFormatterByType[type];

        return format(data);
      }),
  ).join('\n');
};

export default (ast) => `{\n${render(ast, DEFAULT_INDENT_LEVEL)}\n}`;
