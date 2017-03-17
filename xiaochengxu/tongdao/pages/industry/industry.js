var app = getApp();

import http from '../../utils/http';
import extend from '../../utils/extend';

Page({
  data: {
    industries:[],
    max:3,
    activeIndustry:[]
  },
  selectIndustry(){
    let that = this;
    let pages = getCurrentPages();
    let curpage = pages[pages.length-2];

    let backData = [];
    let backName = [];
    if(that.data.activeIndustry.length){
      that.data.activeIndustry.forEach(v=>{
        backData.push(v[0]);
        backName.push(v[1]);
      });  
    }else{
      backData = '';
      backName = '';
    }
    wx.navigateBack();
    curpage.changeIndustryCallBack(backData.toString(),backName.toString());
        
  },
  removeActiveIndustry(e){
    let that = this;
    let code = e.currentTarget.dataset.code;

    let activeIndustry = that.data.activeIndustry.filter( v => {
       return v[0] !== code ? v : false;
    });

    let industries = that.data.industries.filter( v => {
      v.children.map(d => {
        d.active = false;
        activeIndustry.forEach(f=>{
          if(f[0] == d.code){
            d.active = true;
          }
        });
        return d;
      });
      return v;
    });
    that.setData({
      industries:industries,
      activeIndustry:activeIndustry
    });
  },
  changeIndustry(e){
    let that = this;
    let industry = that.data.activeIndustry;
    let datas = e.currentTarget.dataset;
    
    if( datas.active == true ){
      datas.active = false;
      industry = industry.filter(v=>{
        return v[0] == datas.code ? false : v;
      });
    }else{
      if( industry.length >= that.data.max){
        that.toast.showToast({
          title:`行业选择最多选 ${that.data.max} 个`,
          duration: 2000
        });
        return false;
      }
      datas.active = true;
      industry.push([datas.code,datas.name]);
    }
    
    let industries = that.data.industries.map(v=>{
      v.children.map(d => {
        d.active = false;
        industry.forEach(f=>{
          if(f[0] == d.code){
            d.active = true;
          }
        });
        return d;
      });
      return v;
    });

    that.setData({
      industries:industries,
      activeIndustry:industry
    });

  },
  onLoad(options) {
    let that = this;
    that.toast = new app.Liepin.Toast(this);
    // that.toast.showToast({
    //   title:'系统错误，请稍后再试',
    //   duration: 2000
    // });
    let date = new Date().getTime();
    let code = [];
    if( options.code && options.code !== '000' ){
      code = options.code.split(',').map(v=>{
        return [v];
      });
    }
    if(options.max){
      that.setData({
        max:options.max
      });
    }

    http.request({
      url: '/a/n/const/v1/industries.json',
      method: 'POST',
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          let datas = data.data.industries.map(v=>{
            v.children.map(d=>{
              d.active = false;
              code.forEach(f=>{
                if(f[0] == d.code){
                  d.active = true;
                  f[1] = d.name; 
                }
              });
              return d;
            });
            return v;
          });
          that.setData({
            industries:datas,
            activeIndustry:code
          });
        }else{
          that.toast.showToast({
            title:'系统错误，请稍后再试',
            duration: 2000
          });
        }
      },
    });
    
  }
});
