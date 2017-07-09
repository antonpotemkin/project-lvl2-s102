import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAst from './ast-builder';
import getRenderes from './renderers';

export default (firstQuery, secondQuery, format) => {
  const { ext } = path.parse(firstQuery);
  const firstConfig = getParser(ext)(fs.readFileSync(`./${firstQuery}`, 'utf-8'));
  const secondConfig = getParser(ext)(fs.readFileSync(`./${secondQuery}`, 'utf-8'));
  const ast = buildAst(firstConfig, secondConfig);
  return getRenderes(format)(ast);
};
