import reader from './readerJson';

const div = '\n  ';

export default (path1, path2) => {
  const beforeJson = reader(path1);
  const afterJson = reader(path2);
  const changedJson = Object.keys(beforeJson)
    .reduce((acc, value) => {
      if (afterJson[value] === undefined) {
        return `${acc}${div}- ${value}: ${beforeJson[value]}`;
      } else if (afterJson[value] !== beforeJson[value]) {
        return `${acc}${div}+ ${value}: ${afterJson[value]}${div}- ${value}: ${beforeJson[value]}`;
      }
      return `${acc}${div}  ${value}: ${beforeJson[value]}`;
    }, '{');
  const result = Object.keys(afterJson)
    .reduce((acc, value) => {
      if (beforeJson[value] === undefined) {
        return `${acc}${div}+ ${value}: ${afterJson[value]}`;
      }
      return acc;
    }, changedJson);
  return `${result}\n}`;
};
