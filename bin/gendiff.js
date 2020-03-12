#!/usr/bin/env node --experimental-json-modules --no-warnings
import program from 'commander';

import genDiff from '../src/index.js';
import config from '../package.json';

program
  .version(config.version)
  .description(config.description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
