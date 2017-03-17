import {ROOT_URL} from './config';
import React from 'react';
import{
  Platform,AsyncStorage 
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function initLT(){
  if(typeof LT==='undefined'){
    window.LT={};
  }
}

export function getVersion() {
  initLT();
  if (typeof LT.version!=='undefined'){
    return {
      version: LT.version,
      versionCode: LT.versionCode
    }
  }
  LT.versionCode=DeviceInfo.getBuildNumber();
  LT.version = DeviceInfo.getVersion();
  return {
      version: LT.version,
      versionCode: LT.versionCode
  }
}
export function getUniqueId() {
  initLT();
  if(typeof LT.uniqueId!=='undefined'){
    return LT.uniqueId;
  }
  return LT.uniqueId = DeviceInfo.getUniqueID();
}

export const MyFetch = function({url, data, success, fail, ifShowLoading=false, filename/*是否显示loading动画*//*,succCallback, failCallback*/,errorCallback}, others={}){
  let {showLoading, hideLoading, openTip, logout} = others;
  let token = LT.storage && LT.storage.user && LT.storage.user.token ? LT.storage.user.token : '';
  let viewid = LT.storage && LT.storage.user && LT.storage.user.employeeId ? (LT.storage.user.employeeId+'') : '';
  function FormatData(data){
    return {
      view_id: viewid, //guid
      app_guid: '',
      device_uuid: getUniqueId(), //uuid
      dev_type: Platform.OS === 'ios'? '1' : '2',//1 指iphone
      client_id: Platform.OS === 'ios' ? '90001' : '90002',//90001指iphone
      channel_code: '', //push相关
      push_channel: '2',
      version: getVersion().version,
      version_code: getVersion().versionCode, 
      data: data,
      timestamp: new Date().getTime(),
      user_token: token
    }
  }

  function BinaryFormatData(data, filename=''){//二进制走这个format函数
    const formData = new FormData();
    formData.append('view_id', viewid);
    formData.append('app_guid', '');
    formData.append('dev_type',  Platform.OS === 'ios'? '1' : '2'),
    formData.append('client_id',  Platform.OS === 'ios'? '90001' : '90002');
    formData.append('channel_code', '');
    formData.append('push_channel','');
    formData.append('version',getVersion().version);
    formData.append('version_code', getVersion().versionCode);
    formData.append('timestamp',new Date().getTime());
    formData.append('user_token', token);
    //如果需要上传文件
    filename && formData.append('file', {uri: filename, name: filename, type: 'image/jpeg'});
    return formData;
  }

  let fetchOptions = {
    method: 'POST',
    headers: {
      //'Accept-Encoding': 'gzip, deflate', //android不支持
      'Content-Type': filename? 'multipart/form-data':'application/json',
      'Content-Encoding': 'gzip',
      'Cache-Control': 'no-cache',
    },
    //timeout:50000,
    body: filename ? BinaryFormatData(data) : JSON.stringify(FormatData(data, filename))
  };
  let fullUrl = /^(https?)?:\/\//.test(url) ? url : (ROOT_URL.replace(/\/?$/,'/') + url.replace(/^\//,'')) ;

  ifShowLoading && showLoading && showLoading();
  fetch(fullUrl, fetchOptions)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else{
      throw new Error(response.status)
    }
  })
  .then((json) =>{
    ifShowLoading && hideLoading && hideLoading();
    if(json.flag===0){
      if(json.code==5001){
        logout && logout();
      }
      else{
        fail && fail(json);
      }
    }
    else{
      success && success(json);
    }
  })
  .catch((error) => {
    ifShowLoading && hideLoading && hideLoading();
    openTip && openTip('网络繁忙！');// + error.message
    errorCallback && errorCallback(error.message);
  });
};


export const MyStorage = {
  get(key) {
    return AsyncStorage.getItem(key).then(value => {
      return JSON.parse(value);
    });
  },

  save(key, value) {
    //value.time = new Date().getTime();
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },

  // update(key, value) {
  //   return AsyncStorage.getItem(key).then(item => {
  //     value = typeof value === 'string' ? value : Object.assign({}, item, value);
  //     value.time=new Date().getTime();
  //     return AsyncStorage.setItem(key, JSON.stringify(value));
  //   });
  // },
  clear: function(key){
    if(!key) return;
    AsyncStorage.removeItem(key);
  },
  clearAll: function() {
    AsyncStorage.clear();
  }
};
export const LTNumber = {
  pad : function (source, length) {
      var pre = "",
          negative = (source < 0),
          string = String(Math.abs(source));
      if (string.length < length) {
          pre = (new Array(length - string.length + 1)).join('0');
      }
      return (negative ?  "-" : "") + pre + string;
  }
};

export const LTDate = {
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  addYears: function(date, num) {
    date.setFullYear(date.getFullYear() + num);
    return date;
  },

  /**
   * 判断某个日期是否闰年
   * @name LT.Date.isLeapYear
   * @function
   * @grammar LT.Date.isLeapYear(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Boolean} 是否闰年
   */
  isLeapYear: function(date){
    var y = date.getFullYear();
    return (y%4==0 && y%100!=0) || y%400==0;
  },
  /**
   * 判断某个日期是否周末
   * @name LT.Date.isWeekend
   * @function
   * @grammar LT.Date.isWeekend(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Boolean} 是否周末
   */
  isWeekend: function(date){
    return date.getDay()==0 || date.getDay()==6;
  },
  /**
   * 判断某个日期是否工作日
   * @name LT.Date.isWeekDay
   * @function
   * @grammar LT.Date.isWeekDay(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Boolean} 是否工作日
   */
  isWeekDay: function(date){
    return !this.isWeekend(date);
  },
  /**
   * 获取某个日期当月中的天数
   * @name LT.Date.getDaysInMonth
   * @function
   * @grammar LT.Date.getDaysInMonth(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Int} 天数
   */
  getDaysInMonth: function(date){
    return [31,(this.isLeapYear(date) ? 29:28),31,30,31,30,31,31,30,31,30,31][date.getMonth()];
  },
  /**
   * 获取日期是星期几
   * @name LT.Date.getDayName
   * @function
   * @grammar LT.Date.getDayName(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {String} 星期几
   */
  getDayName: function(date){
    return this.dayNames[date.getDay()];
  },
  /**
   * 获取日期的月份名
   * @name LT.Date.getMonthName
   * @function
   * @grammar LT.Date.getMonthName(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {String} 月
   */
  getMonthName: function(date){
    return this.monthNames[date.getMonth()];
  },
  /**
   * 获取当前日期是当年中的第几天
   * @name LT.Date.getDayOfYear
   * @function
   * @grammar LT.Date.getDayOfYear(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Int} 第几天
   */
  getDayOfYear: function(date){
    var tmpdtm = new Date("1/1/" + date.getFullYear());
    return Math.floor((date.getTime() - tmpdtm.getTime()) / 86400000);
  },
  /**
   * 获取当前日期是当年中的第几周
   * @name LT.Date.getWeekOfYear
   * @function
   * @grammar LT.Date.getWeekOfYear(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Int} 第几周
   */
  getWeekOfYear: function(date){
    return Math.ceil(this.getDayOfYear(date) / 7);
  },
  /**
   * 设置当前日期中该年的第几天
   * @name LT.Date.setDayOfYear
   * @function
   * @grammar LT.Date.setDayOfYear(date,day)
   * @param {Date} date 需要设置的日期
   * @param {Int} day 天数
   *
   * @return {Date} 设置后的日期
   */
  setDayOfYear: function(date,day){
    date.setMonth(0);
    date.setDate(day);
    return date;
  },
  /**
   * 设置零点
   * @name LT.Date.zeroTime
   * @function
   * @grammar LT.Date.zeroTime(date)
   * @param {Date} date 需要设置的日期
   *
   * @return {Date} 零点日期
   */
  zeroTime: function(date){
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date;
  },
  /**
   * 计算时间差
   * @name LT.Date.dateDiff
   * @function
   * @grammar LT.Date.dateDiff(start, end, diff)
   * @param {Date} start 开始时间
   * @param {Date} end 结束时间
   * @param {String} diff 计算单位，Y：年，M：月，D：日，H：时，m：分，S：秒
   *
   * @return {Int} 时间差
   */
  dateDiff: function(start, end, diff) {
    var diffn = 1;
    switch (diff) {
      case "S":
        diffn = 1000;
        break;
      case "m":
        diffn = 1000 * 60;
        break;
      case "H":
        diffn = 1000 * 3600;
        break;
      case "D":
        diffn = 1000 * 3600 * 24;
        break;
      case "M":
        diffn = 1000 * 3600 * 24 * 31;
        break;
      case "Y":
        diffn = 1000 * 3600 * 24 * 365;
        break;
      default:
        break;
    }
    return parseInt((start.getTime() - end.getTime()) / parseInt(diffn));
  },
  /**
   * 对目标日期对象进行格式化
   * @name LT.Date.format
   * @function
   * @grammar LT.Date.format(source, pattern)
   * @param {Date} source 目标日期对象
   * @param {string} pattern 日期格式化规则
   * @remark
      格式表达式，变量含义：
      hh: 带 0 补齐的两位 12 进制时表示
      h: 不带 0 补齐的 12 进制时表示
      HH: 带 0 补齐的两位 24 进制时表示
      H: 不带 0 补齐的 24 进制时表示
      mm: 带 0 补齐两位分表示
      m: 不带 0 补齐分表示
      ss: 带 0 补齐两位秒表示
      s: 不带 0 补齐秒表示
      yyyy: 带 0 补齐的四位年表示
      yy: 带 0 补齐的两位年表示
      MM: 带 0 补齐的两位月表示
      M: 不带 0 补齐的月表示
      dd: 带 0 补齐的两位日表示
      d: 不带 0 补齐的日表示
   * 
   * @return {string} 格式化后的字符串
   */
  format : function (source, pattern) {
      if (typeof source == 'string') {
        pattern = source;
        source = null;
      }
      source = source || new Date();
      pattern = pattern || "yyyy-MM-dd HH:mm:ss";
      
      function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
      }
      var pad = LTNumber.pad,
        year = source.getFullYear(),
        month = source.getMonth() + 1,
        date2 = source.getDate(),
        hours = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();
      replacer(/yyyy/g, pad(year, 4));
      replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
      replacer(/MM/g, pad(month, 2));
      replacer(/M/g, month);
      replacer(/dd/g, pad(date2, 2));
      replacer(/d/g, date2);
      replacer(/HH/g, pad(hours, 2));
      replacer(/H/g, hours);
      replacer(/hh/g, pad(hours % 12, 2));
      replacer(/h/g, hours % 12);
      replacer(/mm/g, pad(minutes, 2));
      replacer(/m/g, minutes);
      replacer(/ss/g, pad(seconds, 2));
      replacer(/s/g, seconds);
      return pattern;
  },
  /**
   * 将目标字符串转换成日期对象
   * @name LT.Date.parse
   * @function
   * @grammar LT.Date.parse(source)
   * @param {string} source 目标字符串
   * @remark
      对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析：
      短日期可以使用“/”或“-”作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。
      以 "July 10 1995" 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70。
      括号中的任何文本都被视为注释。这些括号可以嵌套使用。
      逗号和空格被视为分隔符。允许使用多个分隔符。
      月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju" 被解释为七月而不是六月。
      在所提供的日期中，如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合，那么该指定值就会被忽略。例如，尽管 1996 年 11 月 9 日实际上是星期五，"Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是 "Friday November 9 1996"。
      JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)。
      小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的。
      如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的。
      包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的。
   * 
   * @return {Date} 转换后的日期对象
   */
  parse : function (source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if (typeof source == 'string') {
      if (reg.test(source) || isNaN(Date.parse(source))) {
        var d = source.split(/ |T/),
          d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
          d0 = d[0].split(/[^\d]/);
        return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0);
      } else {
        return new Date(source);
      }
    }
    return new Date();
  }
  };

  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bit_rol (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5_cmn (q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }
  function md5_ff (a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5_gg (a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5_hh (a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5_ii (a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binl_md5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5_ff(a, b, c, d, x[i], 7, -680876936)
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5_gg(b, c, d, a, x[i], 20, -373897302)
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5_hh(d, a, b, c, x[i], 11, -358537222)
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5_ii(a, b, c, d, x[i], 6, -198630844)
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safe_add(a, olda)
      b = safe_add(b, oldb)
      c = safe_add(c, oldc)
      d = safe_add(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstr_md5 (s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstr_hmac_md5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hex_tab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hex_tab.charAt((x >>> 4) & 0x0F) +
      hex_tab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstr_utf8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function raw_md5 (s) {
    return rstr_md5(str2rstr_utf8(s))
  }
  function hex_md5 (s) {
    return rstr2hex(raw_md5(s))
  }
  function raw_hmac_md5 (k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
  }
  function hex_hmac_md5 (k, d) {
    return rstr2hex(raw_hmac_md5(k, d))
  }

export function md5 (string, key, raw) {
  if (!key) {
    if (!raw) {
      return hex_md5(string)
    }
    return raw_md5(string)
  }
  if (!raw) {
    return hex_hmac_md5(key, string)
  }
  return raw_hmac_md5(key, string)
}
