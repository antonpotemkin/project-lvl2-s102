import lodash from 'lodash';
import read from './reader';

const div = '\n  ';

const buildStringDiff = (firstConfig, secondConfig) => {
  const mixedKeys = lodash.union(Object.keys(firstConfig), Object.keys(secondConfig));
  const result = mixedKeys
    .reduce((acc, value) => {
      if (secondConfig[value] === undefined) {
        return `${acc}${div}- ${value}: ${firstConfig[value]}`;
      } else if (firstConfig[value] === undefined) {
        return `${acc}${div}+ ${value}: ${secondConfig[value]}`;
      } else if (secondConfig[value] !== firstConfig[value]) {
        return `${acc}${div}+ ${value}: ${secondConfig[value]}${div}- ${value}: ${firstConfig[value]}`;
      }
      return `${acc}${div}  ${value}: ${firstConfig[value]}`;
    }, '{');
  return `${result}\n}`;
};

export default (firstQuery, secondQuery) => {
  const { firstConfig, secondConfig } = read(firstQuery, secondQuery);
  return buildStringDiff(firstConfig, secondConfig);
};
