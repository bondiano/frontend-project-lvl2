
import fs from 'fs';
import getDiff from '../src';

const path = `${__dirname}/__fixtures__/`;
const expected = fs.readFileSync(`${path}expected.txt`, 'utf-8');

const formats = ['.json', '.yaml', '.ini'];

const filesByFormat = formats
  .reduce((acc, format) => [...acc, [format, `${path}before${format}`, `${path}after${format}`]], []);

describe('Gendiff', () => {
  it.each(filesByFormat)('should work with %s', (_, before, after) => {
    expect(getDiff(before, after)).toEqual(expected);
  });
});
