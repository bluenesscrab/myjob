'use strict';
import packageInfo from '../package';
export default class Help {
  constructor(argv) {
    this.init(argv);
  }

  init(argv){
    console.log(`Usage: ${packageInfo.name} ${packageInfo.version} <command>`)
    console.log(`where <command> is one of:`);

    console.log(argv);
    console.log('-v --version   version');
    console.log('-h --help   help');
  }

}