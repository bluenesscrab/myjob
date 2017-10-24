import User from '../../modules/User';

let user = new User();
let app = getApp();

const HOMEPAGE_URL = '/pages/index/welcome';

Page({

  data:{
    weixinUser: {},
    mobile: '',
    veryCode: '',
    veryBtnText: '获取验证码',
    veryBtnEnabled: true,
    veryTimeout: 0,
  },

  onLoad:function(options){
    // toastProxy
    this.toast = new app.Liepin.Toast(this);
    user.toastProxy(this.toast);
    // logout
    app.logout();
    user.exit(() => {
      app.getWeixinUserInfo(info => {
        this.setData({
          weixinUser: info
        });
      });
    });
  },

  // 手机号码输入控制
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },

  // 验证码输入控制
  veryCodeInput: function(e) {
    this.setData({
      veryCode: e.detail.value,
    });
  },

  // 验证码倒计时
  interval: function() {
    let timeout = this.data.veryTimeout - 1;
    if(timeout > 0) {
      this.setData({
        veryTimeout: timeout,
        veryBtnText: `${timeout}秒后重新获取`
      });
      setTimeout(() => this.interval(), 1000);
    } else {
      this.setData({
        veryTimeout: timeout,
        veryBtnText: `获取验证码`,
        veryBtnEnabled: true,
      });
    }
  },
  // 获取验证码
  getCode: function() {
    let mobile = this.data.mobile.trim();
    if(mobile === '') {
      return this.toast.showToast({
        title: '请输入您的手机号',
        duration: 2000
      });
    }
    user.sendSMS(mobile, code => {
      this.setData({
        //veryCode: code,
        veryBtnEnabled: false,
        veryTimeout: 60,
      });
      this.interval();
    });
  },

  // 表单提交
  formSubmit: function() {
    let mobile = this.data.mobile.trim();
    let veryCode = this.data.veryCode.trim();
    if(mobile === '') {
      return this.toast.showToast({
        title: '请输入您的手机号',
        duration: 2000
      });
    }
    if(veryCode === '') {
      return this.toast.showToast({
        title: '请输入验证码',
        duration: 2000
      });
    }
    user.login(mobile, veryCode, () => {
      wx.redirectTo({
        url: HOMEPAGE_URL,
      });
    });
  },
});