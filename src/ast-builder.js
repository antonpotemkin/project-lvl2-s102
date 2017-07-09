import lodash from 'lodash';

// node {
//  key : value
//  type: added, removed, updated, notUpdated, nested
//  oldValue: value or Object
//  newValue: value or Object
//  children: node
// }

const createNode = (key, type, oldValue, newValue, children) =>
  ({ key, type, oldValue, newValue, children });

const hasChilden = (firstValue, secondValue) =>
  lodash.isObject(firstValue) && lodash.isObject(secondValue);

const isEqual = (firstValue, secondValue) => firstValue === secondValue;

const hasNotValue = (config, key) => !lodash.has(config, key);

const buildAst = (firstConfig, secondConfig) => {
  const unionKeys = lodash.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const result = unionKeys
    .map((key) => {
      if (hasChilden(firstConfig[key], secondConfig[key])) {
        const children = buildAst(firstConfig[key], secondConfig[key]);
        return createNode(key, 'nested', firstConfig[key], secondConfig[key], children);
      } else if (hasNotValue(firstConfig, key)) {
        return createNode(key, 'added', firstConfig[key], secondConfig[key], []);
      } else if (hasNotValue(secondConfig, key)) {
        return createNode(key, 'removed', firstConfig[key], secondConfig[key], []);
      } else if (isEqual(firstConfig[key], secondConfig[key])) {
        return createNode(key, 'notUpdated', firstConfig[key], secondConfig[key], []);
      }
      return createNode(key, 'updated', firstConfig[key], secondConfig[key], []);
    });
  return result;
};

export default buildAst;
