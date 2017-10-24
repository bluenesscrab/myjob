import './alert.css';
import Alert from './alert.js';

export default {
  init(){

    let alert = new Alert();
    let html = alert.tpl({
      name: 'jeson',
      arr: ['张三', '李四', '王五', '赵六']
    })
    document.write(html);


    // let alert = new Alert();
    // console.log(alert)
    // let html = alert.tpl({ //此时lay.tpl是一个函数，函数执行并传参
    //   name: 'jeson',
    //   arr: ['张三', '李四', '王五', '赵六']
    // });




    // let html = Alert.tpl({
    //   name:'inde - > alert',
    //   arr:['张三', '李四', '王五', '赵六']
    // })
    // document.write(html);
    // document.write('end alert init');
    // let html = Alert.tpl({
    //   name:'inde - > alert',
    //   arr:['张三', '李四', '王五', '赵六']
    // })
  }
}