import lodash from 'lodash';
import read from './reader';
import buildAst from './ast-builder';

// level need to define quantity of indent
// flag show parent operation
const buildString = (ast, level = 0, flag = false) => {
  const div = '\n  ';
  const indent = lodash.repeat('    ', level);
  const result = ast
    .reduce((acc, value) => {
      const hasChildren = value.newValue instanceof Array || value.oldValue instanceof Array;
      switch (value.operation) {
        case 'add': {
          const operation = flag ? '  ' : '+ ';
          const body = hasChildren ? buildString(value.newValue, level + 1, true) : value.newValue;
          return `${acc}${div}${indent}${operation}${value.key}: ${body}`;
        }
        case 'del': {
          const operation = flag ? '  ' : '- ';
          const body = hasChildren ? buildString(value.oldValue, level + 1, true) : value.oldValue;
          return `${acc}${div}${indent}${operation}${value.key}: ${body}`;
        }
        case 'mod': {
          return `${acc}${div}${indent}+ ${value.key}: ${value.newValue}`
           + `${div}${indent}- ${value.key}: ${value.oldValue}`;
        }
        default: {
          const body = hasChildren ? buildString(value.newValue, level + 1) : value.newValue;
          return `${acc}${div}${indent}  ${value.key}: ${body}`;
        }
      }
    }, '{');
  return `${result}\n${indent}}`;
};

export default (firstQuery, secondQuery) => {
  const { firstConfig, secondConfig } = read(firstQuery, secondQuery);
  const ast = buildAst(firstConfig, secondConfig);
  return buildString(ast);
};
