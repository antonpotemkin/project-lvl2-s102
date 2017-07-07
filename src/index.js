import read from './reader';
import buildAst from './ast-builder';
import buildString from './string-builder';

// level need to define quantity of indent
// flag show parent operation


export default (firstQuery, secondQuery) => {
  const { firstConfig, secondConfig } = read(firstQuery, secondQuery);
  const ast = buildAst(firstConfig, secondConfig);
  return buildString(ast);
};
