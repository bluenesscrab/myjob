'use strict';
var path = require('path');
var loaderUtils = require('loader-utils');
var assign = require('object-assign');
var NodeTplPlus = require('nodetpl-plus').default;

function getLoaderConfig(context) {
  var query = loaderUtils.parseQuery(context.query);
  var configKey = query.config || 'nodetplLoader';
  var config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {};
  delete query.config;
  return assign(query, config);
}

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var config = getLoaderConfig(this);
  var root = config.root;
  var data = {};
  var alias = this.options.resolve.alias;
  var contextPath = this.context;
  source = source.replace(/((?:<img[^>]*src\s*=|url\s*\()\s*['"]?)([^\n'"#?)]+)/g, function(all, ext, url) {
    if(!loaderUtils.isUrlRequest(url, root)) return all;
    var random = '___NODETPLFILE___' + Math.random() + Math.random() + '___';
    var name = url.split('/').slice(0, 1);
    if(name && name.indexOf('.') !== 0) {
      if(alias[name]) {
        url = url.replace(name, alias[name]);
        url = path.relative(contextPath, url);
      }
    }
    data[random] = url;
    return ext + random;
  });
  var result = new NodeTplPlus({
    library: 'commonjs'
  }).compile(source);
  result = result.replace(/___NODETPLFILE___[0-9.]+___/g, function(match) {
    if(!data[match]) return match;
    return '\' + require(' + JSON.stringify(loaderUtils.urlToRequest(data[match], root)) + ') + \'';
  });
  return result;
};