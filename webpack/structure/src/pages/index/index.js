import './index.css';
import '@liepin/jquery-EduShade'; //教学层

$(function () {
  let root = $('#index');
  //操作面板
  let optionPannelHtml = require('./tpls/option-pannel').render({});
  $('[data-selector="option-pannel"]', root).html(optionPannelHtml);

  $.educate({
      list: [{
        highLightEl: {
          elm: $('aside .wechat-box', root),
          padding: '-20 0 -20 -10'
        },
        img: { //有高亮区域 相对高亮区域左上角  无高亮区域 图片居中
          imgSrc: require('./images/weixin_guide.png'),
          top: -284,
          left: -604
        },
        btnNext: {
          css: {
            height: 70,
            width: 185,
            top: 507,
            left: 350
          }
        },
        btnClose: {
          css: {
            height: 50,
            width: 50,
            top: 10,
            left: 750
          }
        }
      }]
    });

});