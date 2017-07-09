import defaultRend from './defaultRenderer';
import plainRend from './plainRenderer';
import json from './jsonRenderer';

export default (format) => {
  if (format === 'plain') {
    return plainRend;
  } else if (format === 'json') {
    return json;
  }
  return defaultRend;
};
