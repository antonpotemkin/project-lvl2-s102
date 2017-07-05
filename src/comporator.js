import lodash from 'lodash';
import reader from './readerJson';

const div = '\n  ';

export default (path1, path2) => {
  const beforeJson = reader(path1);
  const afterJson = reader(path2);
  const mixedKeys = lodash.union(Object.keys(beforeJson), Object.keys(afterJson));
  const result = mixedKeys
    .reduce((acc, value) => {
      if (afterJson[value] === undefined) {
        return `${acc}${div}- ${value}: ${beforeJson[value]}`;
      } else if (beforeJson[value] === undefined) {
        return `${acc}${div}+ ${value}: ${afterJson[value]}`;
      } else if (afterJson[value] !== beforeJson[value]) {
        return `${acc}${div}+ ${value}: ${afterJson[value]}${div}- ${value}: ${beforeJson[value]}`;
      }
      return `${acc}${div}  ${value}: ${beforeJson[value]}`;
    }, '{');
  return `${result}\n}`;
};
