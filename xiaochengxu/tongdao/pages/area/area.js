var app = getApp();

import http from '../../utils/http';
import extend from '../../utils/extend';
import Utils from '../../utils/util';
import CITIES from '../../modules/dictionaries/cities';

Page({
  data: {
    cities:[],
    activeCityCode:'010',
    activeCityName:'北京'
  },
  selectCity(e){
    let city = e.currentTarget.dataset;
    let pages = getCurrentPages();
    let curpage = pages[pages.length-2];
    wx.navigateBack();
    curpage.changeAreaCallBack(city.code);
  },
  onLoad(options) {
    let that = this;
    that.toast = new app.Liepin.Toast(this);
    // that.toast.showToast({
    //   title:'系统错误，请稍后再试',
    //   duration: 2000
    // });
    let date = new Date().getTime();
    console.log(Utils.getCityNameByCode(options.code));
    that.setData({
      activeCityCode:options.code,
      activeCityName:Utils.getCityNameByCode(options.code)
    });

    let letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let citydata = {};
    let cityList = [];
    for (let str in CITIES){
      if( str.substr(0,3) < '320' && (str === '010' || str === '020' || str === '030' || str === '040' || str.length === 6) ){
        //daluCitys.push([str, CITIES[str]]);
        let mark = CITIES[str][1].charAt(0);
        if ( !citydata[mark] ){
          citydata[mark] = [];
        }
        citydata[mark].push([str, CITIES[str][0], CITIES[str][1]]);
      }
    }
    letter.forEach(v => {
      if(citydata[v]){
        cityList.push([v,citydata[v]]);
      }
    });// "080030", "安庆", "ANQING"
    that.setData({
      cityList:cityList
    });

    // http.request({
    //   url: '/a/n/const/areas.json',
    //   method: 'POST',
    //   dataType: 'json',
    //   success: ({data}) => {
    //     if(data.flag === 1) {
    //       let citydata = {};
    //       letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    //       let cityList = [];
    //       data.data.cities.forEach(v => {
    //         if ( !citydata[v.sort.charAt(0)] ){
    //           citydata[v.sort.charAt(0)] = [];
    //         }
    //         citydata[v.sort.charAt(0)].push(v);
    //       });
    //       letter.forEach(v => {
    //         if(citydata[v]){
    //           cityList.push([v,citydata[v]]);
    //         }
    //       });
    //       console.log( new Date().getTime() - date );
    //       that.setData({
    //         cityList:cityList
    //       });
    //     }else{
    //       that.toast.showToast({
    //         title:'系统错误，请稍后再试',
    //         duration: 2000
    //       });
    //     }
    //   },
    // });

  }
});
