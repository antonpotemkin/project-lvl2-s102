import lodash from 'lodash';

// node {
//  key : value
//  type: added, removed, updated, notUpdated, nested
//  oldValue: value or Object
//  newValue: value or Object
//  children: node
// }

const buildAst = (firstConfig, secondConfig) => {
  const mixedKeys = lodash.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const result = mixedKeys
    .map((value) => {
      const node = { key: value };
      if (!lodash.has(firstConfig, value)) {
        node.type = 'added';
      } else if (!lodash.has(secondConfig, value)) {
        node.type = 'removed';
      } else if (firstConfig[value] === secondConfig[value]) {
        node.type = 'notUpdated';
      } else if (lodash.isObject(firstConfig[value]) && lodash.isObject(secondConfig[value])) {
        node.type = 'nested';
        node.children = buildAst(firstConfig[value], secondConfig[value]);
      } else {
        node.type = 'updated';
      }
      node.oldValue = firstConfig[value];
      node.newValue = secondConfig[value];
      return node;
    });
  return result;
};

export default buildAst;
