import fs from 'fs';
import path from 'path';

import buildAst from './ast/buildAst';

import getParser from './getParser';
import getFormatter from './formatters';

const getData = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const fileExt = path.extname(filePath).slice(1);
  const data = getParser(fileExt)(fileData);

  return data;
};

const genDiff = (pathToBefore, pathToAfter, format = 'diff') => {
  const before = getData(pathToBefore);
  const after = getData(pathToAfter);

  const render = getFormatter(format);
  const diff = buildAst(before, after);

  return render(diff);
};

export default genDiff;
