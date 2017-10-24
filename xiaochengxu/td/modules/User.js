import { PASSPORT_URL } from '../config';
import extend from '../utils/extend';
import cookie from '../utils/cookie';
import http from '../utils/http';
import Liepin from './Liepin';

export default class User extends Liepin {
  constructor() {
    super();
  }

  _test_() {
    const USER_AUTH = {
      user_id: '7cfe82705c064c20',
      lt_auth: `433h/fc0197N5Annl72R+OBFPO1yYUsd5yjlZW/+Y4Yj2uCrtvQqnwTlASPy2nfsd8In/adAbCuOIU1JD4Jz8jsKxMIcBr0KkSADKZ+PER5hEAJ3LZKRCy32L8TBFRTBMg7o4KxU0OxNspNKJOSl`,
    };
    let cookies = extend({}, USER_AUTH);
    cookie.setCookies(cookies);
  }

  getUserCity(callback) {
    const KEY_NAME = 'city';
    let city = wx.getStorageSync(KEY_NAME);
    if(city) {
      callback(city);
    } else {
      city = {
        name: '北京',
        code: '010',
      };
      console.log('/a/n/my-city-code.json');
      http.request({
        url: `/a/n/my-city-code.json`,
        method: 'POST',
        data: { },
        dataType: 'json',
        success: ({data}) => {
          console.log(data);
          if(data.flag === 1) {
            let { name, code } = data.data;
            city.name = name || city.name;
            city.code = code || city.code;
            wx.setStorageSync(KEY_NAME, city);
            console.log('callback');
            typeof callback === 'function'  && callback(city);
          } else {
            this.toast.showToast({
              title: data.msg || '系统错误，请稍后再试',
              duration: 2000
            });
          }
        },
        fail: err => {
          console.log(err);
          typeof callback === 'function'  && callback(city);
        },
      });
    }
  }

  getLoginStatus() {
    return cookie.getCookie('user_id') && cookie.getCookie('lt_auth');
  }

  sendSMS(mobile, callback) {
    wx.login({
      success: ({code, errMsg}) => {
        if (code) {
          http.request({
            url: `${PASSPORT_URL}/wxappc/sendverifysms.json`,
            method: 'POST',
            data: {
              tel: mobile,
              code: code,
            },
            dataType: 'json',
            success: ({data}) => {
              if(data.flag === 1) {
                typeof callback === 'function'  && callback(data.data);
              } else {
                this.toast.showToast({
                  title: data.msg || '系统错误，请稍后再试',
                  duration: 2000
                });
              }
            },
            fail: err => {
              console.log(err);
            },
          });
        } else {
          console.log('获取用户登录态失败！' + errMsg)
        }
      }
    });
  }

  login(mobile, code, callback) {
    console.log('/wxappc/login.json');
    http.request({
      url: `${PASSPORT_URL}/wxappc/login.json`,
      method: 'POST',
      data: {
        user_login: mobile,
        verifycode: code,
      },
      dataType: 'json',
      success: ({data}) => {
        console.log(data);
        if(data.flag === 1) {
          cookie.setCookies(data.data);
          typeof callback === 'function'  && callback();
        } else {
          this.toast.showToast({
            title: data.msg || '系统错误，请稍后再试',
            duration: 2000
          });
        }
      },
      fail: err => {
        console.log(err);
        console.log(err);
      },
    });
  }

  autoLogin(callback) {
    console.log('/wxappc/autologin.json');
    http.request({
      url: `${PASSPORT_URL}/wxappc/autologin.json`,
      method: 'POST',
      data: { },
      dataType: 'json',
      success: ({data}) => {
        console.log(data);
        if(data.flag === 1) {
          cookie.setCookie('lt_auth', data.data.lt_auth);
          typeof callback === 'function'  && callback();
        } else {
          console.log(data.msg);
        }
      },
      fail: err => {
        console.log(err);
      },
    });
  }

  exit(callback) {
    wx.clearStorageSync();
    http.request({
      url: `${PASSPORT_URL}/logout.json`,
      method: 'POST',
      data: { },
      dataType: 'json',
      complete: () => {
        typeof callback === 'function'  && callback();
      },
    });
    
  }
}