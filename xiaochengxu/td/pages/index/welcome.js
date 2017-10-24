import User from '../../modules/User';

let app = getApp();
let user = new User();

Page({
  data: {},
  onShow: function(options) {
    app.onLogin(() => {
      user.getUserCity(city => {
        wx.switchTab({
          url: '/pages/index/index',
          success: function (e) {
            console.log('welcome enter.');
            // 白屏bug
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onShow();
          },
          fail: err => {
            console.log(err);
          }
        });
      });
    });
  },
  onLoad:function(options){
    false && app.onLogin(() => {
      user.getUserCity(city => {
        wx.switchTab({
          url: '/pages/index/index',
          success: function (e) {
            console.log('welcome enter.');
            // 白屏bug
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onShow();
          },
          fail: err => {
            console.log(err);
          }
        });
      });
    });
  },
});