import gendiff from '../src/comporator';

it('#gendiff', () => {
  const pathBefore = '__tests__/fixtures/before.json';
  const pathAfter = '__tests__/fixtures/after.json';
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  const actual = gendiff(pathBefore, pathAfter);
  expect(actual).toBe(expected);
});
