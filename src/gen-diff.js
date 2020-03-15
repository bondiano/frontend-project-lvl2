import fs from 'fs';
import path from 'path';

import getParser from './get-parser';
import getFormatter from './formatters';
import buildAst from './ast/build-ast';

const getData = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const fileExt = path.extname(filePath);
  const data = getParser(fileExt)(fileData);

  return data;
};

const genDiff = (pathToBefore, pathToAfter, format = 'diff') => {
  const before = getData(pathToBefore);
  const after = getData(pathToAfter);

  const render = getFormatter(format);
  const diffAst = buildAst(before, after);

  return render(diffAst);
};

export default genDiff;
