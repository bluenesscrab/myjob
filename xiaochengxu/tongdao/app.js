import User from './modules/User';
import Toast from './components/Toast';

let user = new User();

App({

  onLaunch: function () {
    user.autoLogin();
  },

  logout: function() {
    this.globalData = {};
  },

  onLogin: function(callback) {
    this.getWeixinUserInfo(info => {
      let isLogined = user.getLoginStatus();
      if(isLogined) {
        // 城市信息
        user.getUserCity(city => {
          typeof callback === 'function' && callback();
        });
      } else {
        wx.redirectTo({
          url: '/pages/user/login'
        });
      }
    }, err => {
      wx.redirectTo({
        url: '/pages/user/reject?msg='+ encodeURIComponent(err),
      });
    });
  },

  Liepin: {
    Toast,
  },

  getWeixinUserInfo: function(callback, reject) {
    if (this.globalData.userInfo) {
      typeof callback === 'function' && callback(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: ({code, errMsg}) => {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              this.globalData.userInfo.avatarUrl = this.globalData.userInfo.avatarUrl ||  '/assets/images/avatar.jpg';
              typeof callback === 'function' && callback(this.globalData.userInfo);
            },
            fail: err => {
              typeof reject === 'function' && reject(err.errMsg);
            },
          });
        },
        fail: err => {
          typeof reject === 'function' && reject(err.errMsg);
        },
      });
    }
  },

  globalData: {
    userInfo: null
  },

});