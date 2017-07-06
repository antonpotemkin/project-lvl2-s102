import gendiff from '../src/';

describe('Test gendiff', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  it('#Json', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expected);
  });

  it('#Yaml', () => {
    const pathBefore = '__tests__/fixtures/yaml/before.yaml';
    const pathAfter = '__tests__/fixtures/yaml/after.yaml';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expected);
  });
});
