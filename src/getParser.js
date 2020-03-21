import { isObject, flowRight } from 'lodash';
import jsYaml from 'js-yaml';
import ini from 'ini';

/**
 * К сожалению, парсер ini делает из числа строки, эта функция нужна для привода к общему виду
 * TODO: удалить после правки https://github.com/npm/ini/issues/75
 *
 * @param {Object} content
 */
const formatIni = (content) => Object.entries(content).reduce((acc, [key, value]) => {
  if (isObject(value)) {
    return { ...acc, [key]: formatIni(value) };
  }

  if (!Number.isNaN(Number.parseFloat(value))) {
    return { ...acc, [key]: Number(value) };
  }

  return { ...acc, [key]: value };
}, {});

const parserByExt = {
  json: JSON.parse,
  yml: jsYaml.safeLoad,
  yaml: jsYaml.safeLoad,
  ini: flowRight(formatIni, ini.parse),
};

export default (ext) => parserByExt[ext];
