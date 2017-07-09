import lodash from 'lodash';

const getIndent = level => lodash.repeat('    ', level);
const div = '\n  ';

const valueToString = (obj, level) => {
  if (lodash.isObject(obj)) {
    const result = Object.keys(obj)
      .map(key => `${key}: ${valueToString(obj[key], level + 1)}`);
    return `{\n${getIndent(level + 1)}${result.join(div)}\n${getIndent(level)}}`;
  }
  return obj;
};

const buildDefaultString = (ast, level = 0) => {
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
          const body = buildDefaultString(node.oldValue, level + 1);
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

const buildPlainString = (ast, property = []) => {
  const result = ast
    .map((node) => {
      const newProperty = lodash.concat(property, node.key);
      switch (node.type) {
        case 'nested': {
          return buildPlainString(node.oldValue, newProperty);
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

export default (ast, format) => {
  if (format === 'plain') {
    return buildPlainString(ast);
  }
  return buildDefaultString(ast);
};
