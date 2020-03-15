
import fs from 'fs';
import getDiff from '../src';

const formats = ['.json', '.yaml', '.ini'];

const path = `${__dirname}/__fixtures__/`;
const getBeforeAfterFiles = (acc, format) => [...acc, [format, `${path}before${format}`, `${path}after${format}`]];

const expected = fs.readFileSync(`${path}expected.txt`, 'utf-8');
const filesByFormat = formats
  .reduce(getBeforeAfterFiles, []);

describe('Gendiff', () => {
  it.each(filesByFormat)('should work with %s extension', (_, before, after) => {
    expect(getDiff(before, after)).toEqual(expected);
  });
});
