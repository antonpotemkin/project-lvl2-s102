import lodash from 'lodash';

const reandAst = (ast, property = []) => {
  const result = ast
    .map((node) => {
      const newProperty = lodash.concat(property, node.key);
      switch (node.type) {
        case 'nested': {
          return reandAst(node.children, newProperty);
        }
        case 'removed': {
          return `Property '${newProperty.join('.')}' was removed`;
        }
        case 'added': {
          const value = lodash.isObject(node.newValue) ?
            'complex value' : `value: '${node.newValue}'`;
          return `Property '${newProperty.join('.')}' was added with ${value}`;
        }
        case 'updated': {
          const oldValue = lodash.isObject(node.oldValue) ?
            'complex value' : node.oldValue;
          const newValue = lodash.isObject(node.newValue) ?
            'complex value' : node.newValue;
          return `Property '${newProperty.join('.')}' was updated. From '${oldValue}' to '${newValue}'`;
        }
        default:
          return '';
      }
    });
  return result.filter(value => value !== '').join('\n');
};

export default reandAst;
