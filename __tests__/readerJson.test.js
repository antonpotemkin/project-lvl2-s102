import reader from '../src/readerJson';

it('get Json from file', () => {
  const json = {
    host: "hexlet.io",
    timeout: 50,
    proxy: "123.234.53.22"
  };
  const actual = reader('jsons/before.json').toString();
  const expected = json.toString();
  expect(actual).toBe(expected);
});
