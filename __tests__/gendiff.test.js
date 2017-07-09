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

  const expectedJson =
`[
  {
    "key": "common",
    "type": "nested",
    "oldValue": {
      "setting1": "Value 1",
      "setting2": "200",
      "setting3": true,
      "setting6": {
        "key": "value"
      }
    },
    "newValue": {
      "setting1": "Value 1",
      "setting3": true,
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      }
    },
    "children": [
      {
        "key": "setting1",
        "type": "notUpdated",
        "oldValue": "Value 1",
        "newValue": "Value 1",
        "children": []
      },
      {
        "key": "setting2",
        "type": "removed",
        "oldValue": "200",
        "children": []
      },
      {
        "key": "setting3",
        "type": "notUpdated",
        "oldValue": true,
        "newValue": true,
        "children": []
      },
      {
        "key": "setting6",
        "type": "removed",
        "oldValue": {
          "key": "value"
        },
        "children": []
      },
      {
        "key": "setting4",
        "type": "added",
        "newValue": "blah blah",
        "children": []
      },
      {
        "key": "setting5",
        "type": "added",
        "newValue": {
          "key5": "value5"
        },
        "children": []
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "oldValue": {
      "baz": "bas",
      "foo": "bar"
    },
    "newValue": {
      "foo": "bar",
      "baz": "bars"
    },
    "children": [
      {
        "key": "baz",
        "type": "updated",
        "oldValue": "bas",
        "newValue": "bars",
        "children": []
      },
      {
        "key": "foo",
        "type": "notUpdated",
        "oldValue": "bar",
        "newValue": "bar",
        "children": []
      }
    ]
  },
  {
    "key": "group2",
    "type": "removed",
    "oldValue": {
      "abc": "12345"
    },
    "children": []
  },
  {
    "key": "group3",
    "type": "added",
    "newValue": {
      "fee": "100500"
    },
    "children": []
  }
]`;

  it('#Json ext, format default', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter);
    expect(actual).toBe(expectedDefault);
  });

  it('#Json ext, format plain', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter, 'plain');
    expect(actual).toBe(expectedPlain);
  });

  it('#Json ext, format json', () => {
    const pathBefore = '__tests__/fixtures/json/before.json';
    const pathAfter = '__tests__/fixtures/json/after.json';
    const actual = gendiff(pathBefore, pathAfter, 'json');
    expect(actual).toBe(expectedJson);
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

  it('#Yaml ext, format json', () => {
    const pathBefore = '__tests__/fixtures/yaml/before.yaml';
    const pathAfter = '__tests__/fixtures/yaml/after.yaml';
    const actual = gendiff(pathBefore, pathAfter, 'json');
    expect(actual).toBe(expectedJson);
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

  it('#Ini ext, format json', () => {
    const pathBefore = '__tests__/fixtures/ini/before.ini';
    const pathAfter = '__tests__/fixtures/ini/after.ini';
    const actual = gendiff(pathBefore, pathAfter, 'json');
    expect(actual).toBe(expectedJson);
  });
});
