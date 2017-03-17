'use strict';
import minimist from 'minimist';
import packageInfo from '../package';
import Pack from './Pack';
import Init from './Init';

let argv = minimist(process.argv.slice(2));

if(argv.v) {
  console.log(packageInfo.version);
  process.exit(0);
}
if (argv._.length < 1) {
  console.error('>> arguments not enough.');
  process.exit(0);
}
const action = argv._.shift(0);

switch (action) {
  case 'pack':
    new Pack(argv);
    break;
  case 'init':
    new Init(argv);
    break;
  default:
    console.error('>> invalid arguments: ' + action);
}