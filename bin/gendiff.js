#!/usr/bin/env node
const program = require('commander');

const packageData = require('../package.json');

program
  .version(packageData.version)
  .description(packageData.description)
  .parse(process.argv);
