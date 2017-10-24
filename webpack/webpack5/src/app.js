import Layer from './components/layer/layer.js';

const  App = function () {
    const dom = document.getElementById('app');
    let layer = new Layer();
    dom.innerHTML = layer.tpl({
        name: 'jeson',
        arr: ['张三', '李四', '王五', '赵六']
    });
}

new App();