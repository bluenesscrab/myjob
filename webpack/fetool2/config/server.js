/**
 * Created  17/10/16.
 */

const webpack = require('webpack');
const webpackeDevServer = require('webpack-dev-server');
const config = require('./webpack.dev');

// console.log(config);

new webpackeDevServer(webpack(config)).listen(3000,'localhost',function(err,result){
  if(err){
    console.log(err);
  }else{
    console.log('listening at localhost:' + config.devServer.port);
  }
});