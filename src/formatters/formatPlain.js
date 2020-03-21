import { isObject, flatten, isString } from 'lodash';

import nodeTypes from '../ast/nodeTypes';


const normalizeValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const buildStrByType = {
  [nodeTypes.CHANGED]: ({ oldValue, newValue, key }, path) => `Property '${path}${key}' was changed from ${normalizeValue(oldValue)} to ${normalizeValue(newValue)}`,
  [nodeTypes.UNCHANGED]: () => null,
  [nodeTypes.REMOVED]: ({ key }, path) => `Property '${path}${key}' was deleted`,
  [nodeTypes.ADDED]: ({ key, newValue }, path) => `Property '${path}${key}' was added with value: ${normalizeValue(newValue)}`,
  [nodeTypes.NESTED]: ({ children, key }, path, render) => render(children, `${path}${key}.`),
};

const render = (ast, path) => {
  const list = ast.map(({ type, ...data }) => buildStrByType[type](data, path, render));

  const result = flatten(list)
    .filter((element) => element !== null)
    .join('\n');

  return result;
};

export default (ast) => render(ast, '');
