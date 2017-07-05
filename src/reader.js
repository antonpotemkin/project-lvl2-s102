import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const readJson = query => JSON.parse(fs.readFileSync(`./${query}`, 'utf-8'));

const readYaml = query => yaml.safeLoad(fs.readFileSync(`./${query}`, 'utf-8'));

const readIni = query => ini.parse(fs.readFileSync(`./${query}`, 'utf-8'));

export default (query) => {
  const { ext } = path.parse(query);
  switch (ext) {
    case '.yaml':
      return readYaml(query);
    case '.ini':
      return readIni(query);
    default:
      return readJson(query);
  }
};
