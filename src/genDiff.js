import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import getParser from './getParser';

const genDiff = (pathToFirst, pathToSecond) => {
  const firstFileData = fs.readFileSync(pathToFirst, 'utf-8');
  const secondFileData = fs.readFileSync(pathToSecond, 'utf-8');

  const firstFileExt = path.extname(pathToFirst);
  const secondFileExt = path.extname(pathToSecond);


  const first = getParser(firstFileExt)(firstFileData);
  const second = getParser(secondFileExt)(secondFileData);
  const full = { ...first, ...second };

  const diffStr = Object.entries(full).reduce((acc, [key, value]) => {
    if (_.has(first, key) && _.has(second, key) && first[key] === second[key]) {
      return `${acc}\n    ${key}: ${value}`;
    }

    return `${acc}\n${_.has(second, key) ? `  + ${key}: ${value}\n` : ''}${_.has(first, key) ? `  - ${key}: ${first[key]}` : ''}`;
  }, '');

  return `{${diffStr}}`;
};

export default genDiff;
