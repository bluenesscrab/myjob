import alertHtml from '../../components/alert/alert.ejs';
import Alert from '../../components/alert/index.js';
import Layer from '../../components/layer/layer.js';
// import LocalCity from '../../components/localCity/index.js';

document.write('<div class="index"><p>index.js</p>'+alertHtml()+'</div>');

Alert.init();


let layer = new Layer();
let str = layer.tpl({
  name: 'jeson',
  arr: ['张三', '李四', '王五', '赵六']
});
console.log(str);


//LocalCity.init();