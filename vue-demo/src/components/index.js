import Loading from './loading/loading.vue'

import Icons from './icons/icons.vue'
import Labels from './labels/labels.vue'
import Button from './button/button.vue'
import Alert from './alert/alert.vue'



console.log(`UI组件 : this is components/index.js!`);

const components = [
  Loading,
  Icons,
  Labels,
  Button,
  Alert
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
}

export default {
  version: '1.0.0',
  install
}
//module.exports = {}
// Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
// 对于只读的属性 ‘exports’，当分配新的对象覆盖他的时候，将抛出异常；
// -->???
