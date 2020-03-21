import {
  union, isObject, isUndefined, isEqual,
} from 'lodash';

import nodeTypes from './nodeTypes';

const nodeTypeMappers = [
  {
    check: (before, after) => isObject(before) && isObject(after),
    process: (before, after, build) => ({ children: build(before, after), type: nodeTypes.NESTED }),
  },
  {
    check: (before, after) => isUndefined(before) && !isUndefined(after),
    process: (_, after) => ({ newValue: after, type: nodeTypes.ADDED }),
  },
  {
    check: (before, after) => !isUndefined(before) && isUndefined(after),
    process: (before) => ({ oldValue: before, type: nodeTypes.REMOVED }),
  },
  {
    check: (before, after) => !isEqual(before, after),
    process: (before, after) => ({ oldValue: before, newValue: after, type: nodeTypes.CHANGED }),
  },
  {
    check: (before, after) => isEqual(before, after),
    process: (before) => ({ oldValue: before, type: nodeTypes.UNCHANGED }),
  },
];

const buildAst = (before, after) => {
  const keys = union(Object.keys(before), Object.keys(after)).sort();

  return keys.map((key) => {
    const beforeValue = before[key];
    const afterValue = after[key];

    const { process } = nodeTypeMappers.find(({ check }) => check(beforeValue, afterValue));

    return { key, ...process(beforeValue, afterValue, buildAst) };
  });
};

export default buildAst;
