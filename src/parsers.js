import yaml from 'js-yaml';
import ini from 'ini';

export default (ext) => {
  switch (ext) {
    case '.yaml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      return JSON.parse;
  }
};
