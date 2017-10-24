import http from '../../utils/http';
import User from '../../modules/User';

let user = new User();
let app = getApp();

Page({

  data:{
    weixinUser: {},
    userInfo: null,
  },

  onLoad: function(options){
    // toastProxy
    this.toast = new app.Liepin.Toast(this);
    user.toastProxy(this.toast);
    // main
    app.onLogin(() => {
      app.getWeixinUserInfo(info => {
        this.setData({
          weixinUser: info
        });
      });
      this.getUserInfo();
    });
  },

  onPullDownRefresh: function() {
    app.onLogin(() => {
      app.getWeixinUserInfo(info => {
        this.setData({
          weixinUser: info
        });
        wx.stopPullDownRefresh();
      });
      this.getUserInfo();
    });
  },

  getUserInfo: function(callback) {
    http.request({
      url: '/a/t/user/home.json',
      method: 'POST',
      data: { },
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          console.log(data.data);
          this.setData({
            userInfo: data.data
          });
        } else {
          wx.showToast({
            title: data.msg || '网络错误',
            duration: 2000
          });
        }
        typeof callback === 'function' && callback();
      },
    });
  },
  
  exitApp: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出当前账号吗？',
      success: ({confirm}) => {
        confirm && wx.redirectTo({
          url: '/pages/user/login'
        });
      }
    });
  },
  
});