import formatDiff from './format-diff';
import formatPlain from './format-plain';
import formatJson from './format-json';

const getFormatter = (format) => ({
  diff: formatDiff,
  plain: formatPlain,
  json: formatJson,
})[format];

export default getFormatter;
