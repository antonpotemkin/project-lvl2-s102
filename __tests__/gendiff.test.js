import gendiff from '../src/';

describe('Test gendiff', () => {
  const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

  it('#Json ext', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expected);
  });

  it('#Yaml ext', () => {
    const pathBefore = '__tests__/fixtures/yaml/before.yaml';
    const pathAfter = '__tests__/fixtures/yaml/after.yaml';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expected);
  });

  it('#Ini', () => {
    const pathBefore = '__tests__/fixtures/ini/before.ini';
    const pathAfter = '__tests__/fixtures/ini/after.ini';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expected);
  });
});
