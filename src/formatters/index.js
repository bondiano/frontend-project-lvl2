import formatDiff from './formatDiff';
import formatPlain from './formatPlain';
import formatJson from './formatJson';

const getFormatter = (format) => ({
  diff: formatDiff,
  plain: formatPlain,
  json: formatJson,
})[format];

export default getFormatter;
