import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readerJson = query => JSON.parse(fs.readFileSync(`./${query}`, 'utf-8'));

const readerYaml = query => yaml.safeLoad(fs.readFileSync(`./${query}`, 'utf-8'));

export default (query) => {
  const { ext } = path.parse(query);
  switch (ext) {
    case '.yaml':
      return readerYaml(query);
    default:
      return readerJson(query);
  }
};
