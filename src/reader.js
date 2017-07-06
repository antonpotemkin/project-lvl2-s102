import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readJson = query => JSON.parse(fs.readFileSync(`./${query}`, 'utf-8'));

const readYaml = query => yaml.safeLoad(fs.readFileSync(`./${query}`, 'utf-8'));

const getConfig = (query) => {
  const { ext } = path.parse(query);
  switch (ext) {
    case '.yaml':
      return readYaml(query);
    default:
      return readJson(query);
  }
};

export default (firstQuery, secondQuery) => {
  const firstConfig = getConfig(firstQuery);
  const secondConfig = getConfig(secondQuery);
  return { firstConfig, secondConfig };
};
