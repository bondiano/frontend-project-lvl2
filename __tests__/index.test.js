
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
  it('should work with yaml', () => {
    const before = `${path}before.yaml`;
    const after = `${path}after.yaml`;
    expect(getDiff(before, after)).toEqual(expected);
  });
});
