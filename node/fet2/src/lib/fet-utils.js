'use strict';
import path from 'path';

class Utils {
  constructor() {
    return this;
  }

  getPathInfo(pathname) {
    let pathstr = path.sep + 'fe' + path.sep + '(?:release' + path.sep + ')?' + 'dev' + path.sep + '(.*)' + path.sep + '(pc|h5)' + path.sep + '(branches' + path.sep + '[^' + path.sep + ']+' + path.sep + '|trunk' + path.sep + ')?' + '([^' + path.sep + ']+)';
    let matches = pathname.match(new RegExp(pathstr.replace(/\\/g, '\\\\')));
    if (matches) {
      let root = path.join(pathname.substring(0, matches.index), 'fe');
      let trunk = matches[3] || '';
      root = path.join(root, trunk ? '' : 'release');
      return {
        rootPath: root,
        devPath: path.join(root, 'dev'),
        contextPath: path.join(root, trunk ? '../' : '../../', matches[0], 'src'),
        corePath: path.join(root, 'dev/core/', matches[2], trunk ? 'trunk' : '', matches[4], 'src'),
        port: matches[1],
        view: matches[2],
        trunk: trunk,
        version: matches[4],
      };
    } else {
      return null;
    }
  }
}

export default new Utils();

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