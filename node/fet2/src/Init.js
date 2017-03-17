'use strict';
//require('core-js');
import fs from 'fs';
import path from 'path';
import fsPath from 'fs-path';
import colors from 'colors/safe';
import Table from 'cli-table-zh';
import packageInfo from '../package';
import utils from './lib/fet-utils';

//cnpm set registry http://registry.cnpm.lietou.com

let commondTitle = colors.rainbow('\n\t---------- Fet Init Tools v' + packageInfo.version + ' ----------\n');

export default class pack {
  constructor(argv) {
    this._argv = argv;
    this.init();
    return this;
  }

  init() {
    var argv = this._argv;
    // 获取当前工作目录 currentPath
    let currentPath = '';
    if (argv.h || argv.help) {
      this.help();
    }
    if (!(argv._ && Array.isArray(argv._) && argv._.length > 0)) {
      this.help();
    }
    currentPath = argv._[0];
    if (!path.isAbsolute(currentPath)) {
      currentPath = path.join(process.cwd(), currentPath);
    }
    // 目录信息
    const pathInfo = utils.getPathInfo(currentPath);
    if (pathInfo === null) {
      console.error(colors.white.bgRed('当前工作目录 ' + currentPath + ' 不合法！'));
      process.exit(0);
    }
    Object.assign(this, pathInfo);
    console.log(commondTitle);
    var table = new Table();
    table.push({
      '业务端': this.port
    }, {
      '类型': this.view
    }, {
      '分支': this.trunk
    }, {
      '版本': this.version
    }, {
      '项目根目录': this.rootPath
    }, {
      '当前工作目录': this.contextPath
    });
    console.log(table.toString());
    this.initFiles();
    return this;
  }

  initFiles() {
    Promise.resolve()
      .then(this._checkWorkFolder.bind(this))
      .then(this._initFolder.bind(this))
      .then(this._buildPackageJson.bind(this))
      .catch(function(err) {
        console.log(err.stack);
      });
  }

  _checkWorkFolder() {
    return new Promise((resolve, reject) => {
      var projectPath = path.join(this.contextPath, '../../');
      fs.exists(projectPath, exists => {
        if (!exists) {
          reject(new Error('工作目录 ' + projectPath + ' 不存在或不合法！'));
        } else {
          resolve();
        }
      });
    });
  }

  _initFolder() {
    var promises = ['js', 'js/lib', 'js/pages', 'tpls', 'css', 'images', 'images/icons', 'images/icons/spritesify', 'images/pages', 'images/tpls', 'images/plugins', '../build', '../static', '../static/css', '../static/js', '../static/images'].map(v => {
      return new Promise((resolve, reject) => {
        fsPath.mkdir(path.join(this.contextPath, v), err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
    return Promise.all(promises);
  }

  _buildPackageJson() {
    let packagePath = path.join(this.contextPath, 'package.json');
    return new Promise((resolve, reject) => {
      fs.exists(packagePath, exists => {
        if (!exists) {
          let content = `{
  "name": "@liepin/module_${this.port}_${this.view}_${this.version}",
  "version": "1.0.0",
  "description": "package.json for ${this.port} ${this.view}",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "repository": {
    "url": "http://cnpm.lietou.com/",
    "type": "git"
  },
  "author": "chenbl@liepin.com",
  "license": "MIT",
  "dependencies": {}
}`;
          fs.writeFile(packagePath, content, 'utf-8');
          console.log('building ' + packagePath);
        }
        resolve();
      });
    });
  }

  help() {
    var table;
    console.log(commondTitle);
    console.log('语法：');
    table = new Table({
      head: ['fet pack <path> --watch']
    });
    console.log(table.toString());
    console.log('参数：');
    table = new Table();
    table.push({
      '<path>': '需要编译的目录'
    }, {
      '-w --watch': '是否监听文件变化'
    });
    console.log(table.toString());
    process.exit(0);
  }
}

/*
  私有配置
  var root;
  if (process.platform === 'win32') {
    root = process.env.USERPROFILE || process.env.APPDATA || process.env.TMP || process.env.TEMP;
  } else {
    root = process.env.HOME || process.env.TMPDIR || '/tmp';
  }

  var config = module.exports = {
    cnpmHost: 'https://npm.taobao.org',
    cnpmRegistry: 'https://registry.npm.taobao.org',
    disturl: 'https://npm.taobao.org/mirrors/node', // download dist tarball for node-gyp
    iojsDisturl: 'https://npm.taobao.org/mirrors/iojs',
    cache: path.join(root, '.cnpm'),  //cache folder name
    userconfig: path.join(root, '.cnpmrc'),
    proxy: '',
  };
 */