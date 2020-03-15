import fs from 'fs';
import getDiff from '../src';

const extensions = ['.json', '.yaml', '.ini'];
const formats = ['diff', 'plain', 'json'];

const path = `${__dirname}/__fixtures__/`;
const getBeforeAfterFiles = (acc, format) => [...acc, [format, `${path}before${format}`, `${path}after${format}`]];

const getExpected = (format) => fs.readFileSync(`${path}expected.${format}.txt`, 'utf-8');
const filesByExtension = extensions
  .reduce(getBeforeAfterFiles, []);

describe('Gendiff', () => {
  describe.each(formats)('Test %s format', (format) => {
    it.each(filesByExtension)('should work with %s extension', (_, before, after) => {
      const expected = getExpected(format);

      expect(getDiff(before, after, format)).toEqual(expected);
    });
  });
});
