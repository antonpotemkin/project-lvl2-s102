import defaultRend from './renderers/defaultRenderer';
import plainRend from './renderers/plainRenderer';

export default (format) => {
  if (format === 'plain') {
    return plainRend;
  }
  return defaultRend;
};
