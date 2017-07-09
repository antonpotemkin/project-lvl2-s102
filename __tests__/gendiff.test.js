import gendiff from '../src/';

describe('Test gendiff', () => {
  const expectedDefault = `{
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

  const expectedPlain =
`Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

  it('#Json ext, format default', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expectedDefault);
  });

  it('#Json ext, format plain ', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter, 'plain');
    expect(actual).toBe(expectedPlain);
  });

  it('#Yaml ext', () => {
    const pathBefore = '__tests__/fixtures/yaml/before.yaml';
    const pathAfter = '__tests__/fixtures/yaml/after.yaml';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expectedDefault);
  });

  it('#Yaml ext, format plain', () => {
    const pathBefore = '__tests__/fixtures/yaml/before.yaml';
    const pathAfter = '__tests__/fixtures/yaml/after.yaml';
    const actual = gendiff(pathBefore, pathAfter, 'plain');
    expect(actual).toBe(expectedPlain);
  });

  it('#Ini ext', () => {
    const pathBefore = '__tests__/fixtures/ini/before.ini';
    const pathAfter = '__tests__/fixtures/ini/after.ini';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expectedDefault);
  });

  it('#Ini ext, format plain', () => {
    const pathBefore = '__tests__/fixtures/ini/before.ini';
    const pathAfter = '__tests__/fixtures/ini/after.ini';
    const actual = gendiff(pathBefore, pathAfter, 'plain');
    expect(actual).toBe(expectedPlain);
  });
});
