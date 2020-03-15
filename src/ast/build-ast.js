import { union, isObject, isUndefined } from 'lodash';

import nodeTypes from './node-types';

const getNodeType = (before, after) => {
  if (isObject(before) && isObject(after)) {
    return nodeTypes.NESTED;
  }

  if (isUndefined(before) && !isUndefined(after)) {
    return nodeTypes.ADDED;
  }

  if (!isUndefined(before) && isUndefined(after)) {
    return nodeTypes.REMOVED;
  }

  if (!isUndefined(before) && !isUndefined(after) && before !== after) {
    return nodeTypes.CHANGED;
  }

  return nodeTypes.UNCHANGED;
};

/* eslint-disable max-len */
const processByType = {
  [nodeTypes.CHANGED]: (beforeValue, afterValue) => ({ oldValue: beforeValue, newValue: afterValue }),
  [nodeTypes.UNCHANGED]: (beforeValue) => ({ oldValue: beforeValue }),
  [nodeTypes.REMOVED]: (beforeValue) => ({ oldValue: beforeValue }),
  [nodeTypes.ADDED]: (_, afterValue) => ({ newValue: afterValue }),
  [nodeTypes.NESTED]: (beforeValue, afterValue, buildAst) => ({ children: buildAst(beforeValue, afterValue) }),
};
/* eslint-enable max-len */

const buildAst = (before, after) => {
  const keys = union(Object.keys(before), Object.keys(after));

  return keys.map((key) => {
    const beforeValue = before[key];
    const afterValue = after[key];

    const type = getNodeType(beforeValue, afterValue);

    const process = processByType[type];

    return { key, type, ...process(beforeValue, afterValue, buildAst) };
  });
};

export default buildAst;
