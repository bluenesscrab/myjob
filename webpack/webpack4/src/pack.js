'use strict';
import webpack from 'webpack';

export default class Pack {
  constructor(argv) {
    this._argv = argv;
    this.watch = false;
  }
  init(){
    // 获取监听模式 watch
    if (argv.watch || argv.w) {
      this.watch = true;
    }


    Promise.resolve().then().catch(function(error){
      console.log(error);
    })
  }

}