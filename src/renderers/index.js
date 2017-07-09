import defaultRend from './defaultRenderer';
import plainRend from './plainRenderer';

export default (format) => {
  if (format === 'plain') {
    return plainRend;
  } else if (format === 'json') {
    return ast => JSON.stringify(ast, '', 2);
  }
  return defaultRend;
};
