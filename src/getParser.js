import jsYaml from 'js-yaml';

const parserByExt = {
  '.json': JSON.parse,
  '.yml': jsYaml.load,
  '.yaml': jsYaml.load,
};

const getParser = (ext) => parserByExt[ext];

export default getParser;
