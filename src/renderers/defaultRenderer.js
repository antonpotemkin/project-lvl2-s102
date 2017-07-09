import lodash from 'lodash';

const getIndent = level => lodash.repeat('    ', level);
const div = '\n  ';

const valueToString = (value, level) => {
  if (lodash.isObject(value)) {
    const result = Object.keys(value)
      .map(key => `${key}: ${valueToString(value[key], level + 1)}`);
    return `{\n${getIndent(level + 1)}${result.join(div)}\n${getIndent(level)}}`;
  }
  return value;
};

const rendAst = (ast, level = 0) => {
  const indent = lodash.repeat('    ', level);
  const result = ast
    .reduce((acc, node) => {
      switch (node.type) {
        case 'added': {
          const operation = '+ ';
          const body = valueToString(node.newValue, level + 1);
          return `${acc}${div}${indent}${operation}${node.key}: ${body}`;
        }
        case 'removed': {
          const operation = '- ';
          const body = valueToString(node.oldValue, level + 1);
          return `${acc}${div}${indent}${operation}${node.key}: ${body}`;
        }
        case 'updated': {
          const newValue = valueToString(node.newValue, level + 1);
          const oldValue = valueToString(node.oldValue, level + 1);
          return `${acc}${div}${indent}+ ${node.key}: ${newValue}`
           + `${div}${indent}- ${node.key}: ${oldValue}`;
        }
        case 'nested': {
          const body = rendAst(node.children, level + 1);
          return `${acc}${div}${indent}  ${node.key}: ${body}`;
        }
        default: {
          const body = node.oldValue;
          return `${acc}${div}${indent}  ${node.key}: ${body}`;
        }
      }
    }, '{');
  return `${result}\n${indent}}`;
};

export default rendAst;
