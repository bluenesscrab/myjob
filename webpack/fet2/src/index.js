'use strict';
import path from 'path';
import packageInfo from '../package';
import minimist from 'minimist';
import Table from 'cli-table-zh';
import Dev from './dev.js';
import Pro from './pro.js';

let argv = minimist(process.argv.slice(2));

let options = {
  toolsName:'fet2',
  toolsVersion: packageInfo.version,
  watch: false,
  root:path.join(process.cwd()), // 当前路径
  currentPath: '' // 工作路径
};//参数

if(argv.v || argv.version) {
  console.log(options.version);
  process.exit(0);
}

if(argv.w || argv.watch) {
  options.watch = true;
}

console.log(`\n\n———————————————— ${options.toolsName} ————————————————\n`);

if(argv.h || argv.help) {
  
  console.log('语法：');
  var table = new Table();
  table.push({
    [options.toolsName]: '<dev|pro> <path> --watch'
  });
  console.log(table.toString());

  console.log('参数：');
  table = new Table();
  table.push({
    'dev': '编译开发版本不产生版本号'
  });
  table.push({
    'pro': '编译生产版本产生版本号'
  });
  table.push({
    '<path>': '需要编译的目录'
  });
  table.push({
    '-w --watch': '是否监听文件变化'
  });
  console.log(table.toString());
  process.exit(0);
}

if (argv._.length < 1) {
  console.error('>> arguments not enough.');
  process.exit(0);
}

const action = argv._.shift(0);
const workPath = argv._.shift(1);
if(workPath){
  options.currentPath = path.join(options.root, workPath);
}else{
  console.error('>> error: <path> is Required');
  process.exit(0);
}
switch ( action.toLowerCase() ) {
  case 'dev':
    new Dev(options);
    break;
  case 'pro':
    new Pro(options);
    break;
  default:
    console.error('>> error: invalid arguments: ' + action);
}

