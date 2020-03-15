import jsYaml from 'js-yaml';
import ini from 'ini';

const parserByExt = {
  '.json': JSON.parse,
  '.yml': jsYaml.load,
  '.yaml': jsYaml.load,
  '.ini': ini.parse,
};

const getParser = (ext) => parserByExt[ext];

export default getParser;
