import cookie from './cookie';
import extend from './extend';
import { BASE_URL, APP_INFO } from '../config';

let http = {
  
  _getRequestHeader: function() {
    let cookies = cookie.getCookies();
    let cookieArray = [];
    Object.keys(cookies).forEach(key => {
      cookieArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(cookies[key]));
    });
    return {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cookie': cookieArray.join('; '),
      'X-Client-Type': 'wxa',
      //'X-Requested-With': 'XMLHttpRequest', 这一行加上会有bug，实际请求会变成 2 个 XMLHttpRequest
    };
  },

  _getRequestData: function() {
    return APP_INFO;
  },

  request: function(options) {
    let header = extend({}, this._getRequestHeader(), options.header);
    let data = extend({}, this._getRequestData(), {
      data: options.data || { },
    });
    let url = options.url;
    url = url.indexOf('/') === 0 ? (BASE_URL + url) : url;
    return wx.request(extend({
      // 未登录用户拦截器
      complete: ({data, statusCode}) => {
        if(statusCode == 200) { // 微信的坑，有可能是 number 有可能是 string，这里必须两个=
          if(data.code === '5018' || data.code === '200993036') {
            console.log('登录超时');
            // 登录超时
            return wx.redirectTo({
              url: '/pages/user/login'
            });
          }
        }
      },
    }, options, {
      url,
      header,
      data: data,
    }));
  }

};

export default http;