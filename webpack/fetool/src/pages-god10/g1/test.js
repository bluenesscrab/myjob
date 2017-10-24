export default class Test{
  constructor(options){
    console.log('Test')
    this.init(options);
  }

  init(options){ 
    console.log('Test init',options);
    this._pack(options);
  }

  _pack(options){
    console.log('Test _pack',options);
  }

}

// export default function (options){
//   console.log('Test',options);
// }