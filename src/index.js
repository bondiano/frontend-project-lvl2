import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFirst, pathToSecond) => {
  const firstFileData = fs.readFileSync(pathToFirst, 'utf-8');
  const secondFileData = fs.readFileSync(pathToSecond, 'utf-8');

  const first = JSON.parse(firstFileData);
  const second = JSON.parse(secondFileData);
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
