import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const read = query => fs.readFileSync(`./${query}`, 'utf-8');

export default (firstQuery, secondQuery) => {
  const { ext } = path.parse(firstQuery);
  const firstConfig = getParser(ext)(read(firstQuery));
  const secondConfig = getParser(ext)(read(secondQuery));
  return { firstConfig, secondConfig };
};
