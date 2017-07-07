import lodash from 'lodash';

// ast = [{ key:value, operation: operation, oldValue: oldValue, newValue: newValue}, ..., {}

const buildAst = (firstConfig, secondConfig) => {
  const mixedKeys = lodash.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const hasChildren = value => firstConfig[value] instanceof Object
    || secondConfig[value] instanceof Object;

  const result = mixedKeys
    .map((value) => {
      if (firstConfig[value] === undefined) {
        const body = hasChildren(value) ? buildAst({}, secondConfig[value]) : secondConfig[value];
        return { key: value,
          operation: 'add',
          newValue: body,
        };
      } else if (secondConfig[value] === undefined) {
        const body = hasChildren(value) ? buildAst(firstConfig[value], {}) : firstConfig[value];
        return { key: value,
          operation: 'del',
          oldValue: body,
        };
      } else if (firstConfig[value] !== secondConfig[value] && !hasChildren(value)) {
        return { key: value,
          operation: 'mod',
          oldValue: firstConfig[value],
          newValue: secondConfig[value],
        };
      }
      const body = hasChildren(value) ?
        buildAst(firstConfig[value], secondConfig[value]) : secondConfig[value];
      return { key: value,
        newValue: body,
      };
    });
  return result;
};

export default buildAst;
