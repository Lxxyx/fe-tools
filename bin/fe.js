#!/usr/bin/env node

const program = require('commander')

program
  .version('1.00')
  .usage('<command>')
  .command('babel', 'set babel, use es2017')
  .command('eslint', 'set eslint')
  .command('ava', 'set ava test')
  .parse(process.argv)
