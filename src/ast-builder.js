import lodash from 'lodash';

// node {
//  key : value
//  type: tree, leaf
//  operation: added, removed, updated, notUpdated, modifinedParent
//  child [node...]
//  parent: node
//  value: value
//  updatedValue: value
// }

const buildAst = (firstConfig, secondConfig, parent) => {
  const mixedKeys = lodash.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const hasChildren = value => firstConfig[value] instanceof Object
    || secondConfig[value] instanceof Object;

  const result = mixedKeys
    .map((value) => {
      const node = { parent };
      node.key = value;
      node.type = hasChildren(value) ? 'tree' : 'leaf';
      if (parent.operation === 'added' || parent.operation === 'removed') {
        node.operation = 'modifinedParent';
      } else if (!lodash.has(firstConfig, value)) {
        node.operation = 'added';
      } else if (!lodash.has(secondConfig, value)) {
        node.operation = 'removed';
      } else if (firstConfig[value] !== secondConfig[value] && node.type === 'leaf') {
        node.operation = 'updated';
      } else {
        node.operation = 'notUpdated';
      }
      node.child = node.type === 'tree' ? buildAst(lodash.get(firstConfig, value, {}),
        lodash.get(secondConfig, value, {}), node) : [];
      node.updatedValue = node.type === 'leaf' ? lodash.get(secondConfig, value, '') : '';
      node.value = node.type === 'leaf' ? lodash.get(firstConfig, value, node.updatedValue) : '';
      return node;
    });
  return result;
};

export default buildAst;
