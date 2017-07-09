import defaultRend from './defaultRenderer';
import plainRend from './plainRenderer';

export default (format) => {
  if (format === 'plain') {
    return plainRend;
  }
  return defaultRend;
};
