import TButton from './button.vue';

console.log('button->index.js')

TButton.install = function(Vue) {
  Vue.component(TButton.name, TButton);
};

export default TButton;
