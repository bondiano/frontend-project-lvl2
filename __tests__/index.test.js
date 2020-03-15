
import fs from 'fs';
import getDiff from '../src';

const path = `${__dirname}/__fixtures__/`;
const expected = fs.readFileSync(`${path}expected.txt`, 'utf-8');

describe('Gendiff', () => {
  it('should work with json', () => {
    const before = `${path}before.json`;
    const after = `${path}after.json`;
    expect(getDiff(before, after)).toEqual(expected);
  });
});
