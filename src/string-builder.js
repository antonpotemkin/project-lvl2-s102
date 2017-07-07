import lodash from 'lodash';

const buildString = (ast, level = 0) => {
  const div = '\n  ';
  const indent = lodash.repeat('    ', level);
  const result = ast
    .reduce((acc, node) => {
      switch (node.operation) {
        case 'added': {
          const operation = '+ ';
          const body = node.type === 'tree' ? buildString(node.child, level + 1) : node.value;
          return `${acc}${div}${indent}${operation}${node.key}: ${body}`;
        }
        case 'removed': {
          const operation = '- ';
          const body = node.type === 'tree' ? buildString(node.child, level + 1) : node.value;
          return `${acc}${div}${indent}${operation}${node.key}: ${body}`;
        }
        case 'updated': {
          return `${acc}${div}${indent}+ ${node.key}: ${node.updatedValue}`
           + `${div}${indent}- ${node.key}: ${node.value}`;
        }
        default: {
          const body = node.type === 'tree' ? buildString(node.child, level + 1) : node.value;
          return `${acc}${div}${indent}  ${node.key}: ${body}`;
        }
      }
    }, '{');
  return `${result}\n${indent}}`;
};

export default buildString;
