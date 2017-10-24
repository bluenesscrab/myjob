"use strict";

var fs = require('fs'),
  path = require('path'),
  sep = path.sep;
class FileHelp {
  /**
   * 获得所有目录下的文件
   * @method getAllFilesSync
   * @param  {string} filePath    文件路径
   * @param  {string｜Array} ext         要获取文件的后缀名名称 // 支持扩展名数组   
   * @param  {Array} filter       要过滤的文件名称列表
   *
   */
  static getAllFilesSync(filePath, ext, filter) {
    filter = (filter ? filter : []).concat(['.svn', '.DS_Store']);

    if (!fs.existsSync(filePath)) {
      return [];
    }

    var res = [],
      ext = ext,
      files = fs.readdirSync(filePath);

    if (ext && typeof ext == 'string') {
      ext = [ext];
    }
    files.forEach(function (file) {
      var pathname = path.join(filePath, file),
        stat = fs.lstatSync(pathname);
      if (!stat.isDirectory()) {
        var fileExt = FileHelp.getExtName(file),
          fileExt = fileExt ? fileExt : 'unknown';
        if ((!ext || ext.indexOf(fileExt) > -1) &&
          filter.indexOf(fileExt) < 0) {
          res.push(pathname);
        }
      } else {
        pathname += sep;
        if (filter.indexOf(path.basename(file)) < 0) {
          res = res.concat(FileHelp.getAllFilesSync(pathname, ext, filter));
        }
      }
    });
    return res
  };
  /**
   * 通过读取文件状态，读取失败则返回 undfeined
   * @param  {String} path 文件路径
   * @return {fs.Stats}      
   */
  static statSync(path) {
    try {
      return fs.statSync(path);
    } catch (e) {
      return undefined;
    }
  }
  /**
   * 通过获得所有目录下的目录
   * @method getAllDirsSync
   * @param  {string} filePath    文件路径
   * @param  {string} ext         要获取文件的后缀名名称   
   * @param  {Array} filter       要过滤的目录称列表
   *
   */
  static getAllDirsSync(filePath, filter) {
    var res = [],
      files = fs.readdirSync(filePath);
    filter = (filter ? filter : []).concat(['.svn', '.DS_Store']);
    files.forEach(function (file) {
      var pathname = path.join(filePath, file),
        stat = fs.lstatSync(pathname);
      if (stat.isDirectory() && filter.indexOf(file) < 0) {
        res.push(pathname);
      }
    });
    return res
  };
  /**
   * 获取文件扩展名（比含".")
   * @method getExtName
   * @param  {string}   filename 文件名称
   * @return {string}            扩展名
   */
  static getExtName(filename) {
    if (!(typeof filename == 'string') || !filename) {
      return '';
    }
    var r = filename.match(/\.([^.]+)$/);
    return r ? '.' + r[1] : '';
  };
  /**
   * 异步创建文件
   * @method createFile
   * @param  {String}   fileName 文件全部路径 
   * @return {boolean}           是否创建成功
   */
  static createFile(fileName, callback) {
    callback = callback ||
      function () { };
    this.mkdirs(path.dirname(fileName), '0777', function (err) {
      if (err) {
        fs.exists(fileName, function (exists) {
          if (!exists) {
            fs.open(fileName, "w+", '0777', function (e, fd) {
              if (!e) {
                fs.writeFile(fileName, "", function (e) {
                  if (!e) {
                    fs.close(fd, function () {
                      callback(true);
                    });
                  } else {
                    callback(false);
                  }
                })
              } else {
                callback(false);
              }
            });
          } else {
            //已存在返回真
            callback(true);
          }
        });
      }

    });
  };
  /**
   * 同步创建文件
   * @method createFileSync
   * @param  {string}       fileName 文件夹完整路径
   * @return {boolean}               是否创建成功
   */
  static createFileSync(fileName) {
    this.mkdirsSync(path.dirname(fileName), '0777');
    if (!fs.existsSync(fileName)) {
      var fd = fs.openSync(fileName, "w+", '0777');
      if (fd) {
        fs.writeFileSync(fileName, "");
        fs.closeSync(fd);
        return true;
      }
      return false;
    }

  };
  /**
   * 同步创建多层文件夹
   * @method mkdirsSync
   * @param  {string}   dirpath 文件夹目录
   * @param  {string}   mode    文件夹权限
   * @return {boolean}          是否成功创建
   */
  static mkdirsSync(dirpath, mode) {
    var res = true;
    if (!fs.existsSync(dirpath)) {
      // console.log(dirpath + '开始创建');
      var pathtmp = '';
      dirpath.split(path.sep).forEach(function (dirname) {
        if (dirname != '') {
          pathtmp = pathtmp == '' ? dirname : path.join(pathtmp, dirname);
        } else {
          pathtmp = path.join(path.sep, dirname);
        }
        if (!fs.existsSync(pathtmp)) {
          try {
            fs.mkdirSync(pathtmp, mode);
          } catch (e) {
            //错误
            res = false;
            console.error(e);
          }
        }
      });
      if (res) {
        // console.log(dirpath + '新建完成');
      }
    } else {
      // console.log(dirpath + '目录已存在,继续');
    }
    return res;
  };
  /**
   * 异步创建多层文件夹
   * @method mkdirs
   * @param  {string}   dirpath  文件夹详细目录
   * @param  {sting}    mode      文件夹权限
   * @param  {Function} callback 回调函数
   * @return {boolean}            是否成功创建
   */
  static mkdirs(dirpath, mode, callback) {
    var self = this;
    callback = callback || function () { };

    fs.exists(dirpath, function (exitsmain) {
      console.log('创建结束');
      callback(self.mkdirsSync(dirpath, mode));

    });
  };
  /**
   * 删除目录下的文件
   * @param  {String}   dirpath  目录
   * @param  {Array}   white    要删除的文件后缀名
   * @param  {Array}   black    不删除的文件后缀名
   */
  static deleteFilesSync(dirpath, white, black, isDelSelf) {
    // 获取文件列表
    // 遍历，过滤
    // 删除
    black = black || []

    if (!fs.existsSync(dirpath)) {
      return true;
    }

    var files = fs.readdirSync(dirpath);

    if (white && typeof white == 'string') {
      white = [white];
    }
    files.forEach(function (file) {
      var pathname = path.join(dirpath, file),
        stat = fs.lstatSync(pathname);
      if (!stat.isDirectory()) {
        var fileExt = FileHelp.getExtName(file) || 'unknown';
        if ((!white || white.indexOf(fileExt) > -1) &&
          black.indexOf(fileExt) < 0) {

          fs.unlinkSync(pathname)
        }
      } else {
        pathname += sep;
        if (black.indexOf(path.basename(file)) < 0) {
          FileHelp.deleteFilesSync(pathname, white, black, true);
        }
      }
    });
    if (isDelSelf) {
      fs.rmdirSync(dirpath)
    }
    return true
  }
  static copyFileSync(from, to) {
    var stat = FileHelp.statSync(from)
    if (!stat) {
      throw new Error('file(' + form + ') 不存在')
    }
    if (!stat.isFile()) {
      throw new Error('file(' + form + ') 不是文件')
    }
    let readable = fs.createReadStream(from);
    // 创建写入流
    let writable = fs.createWriteStream(to);   
    // 通过管道来传输流
    readable.pipe(writable);
  }
}



module.exports = FileHelp;