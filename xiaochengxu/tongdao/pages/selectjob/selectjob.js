var app = getApp();

import http from '../../utils/http';
import extend from '../../utils/extend';

Page({
  data: {
    index:0,
    salaryArray:['请选择', '10-15', '15-20','20-30', '30-50', '50-100', '100万以上' ],
    refreshData:[
      {name:'不限',value:'000',checked:true},
      {name:'一天内',value:'1'},
      {name:'三天内',value:'3'},
      {name:'一周内',value:'7'},
      {name:'两周内',value:'14'},
      {name:'一月内',value:'30'}
    ],
    jobKindData:[
      // {name:'不限',value:'0',checked:true},
      {name:'企业职位',value:'2',checked:true},
      {name:'猎头职位',value:'1'}
      // {name:'人脉职位',value:'4'}
    ],
    'jobKind':'2',
    'refreshTime':'000'

  },
  bindPickerChange(e){ //选择 薪资范围
    this.setData({
      index: e.detail.value
    });
  },
  refreshTimeChange(e){//选择 刷新时间
    this.setData({
      refreshTime: e.detail.value
    });
  },
  jobKindChange(e){//选择 职位类型
    this.setData({
      jobKind: e.detail.value
    });
  },
  formSubmit(e){
    let that = this;
    let value = e.detail.value;
    switch(value.salary){
      case'请选择':
        value.salaryLow=0;
        value.salaryHigh=999;
        break;
      case'100万以上':
        value.salaryLow=100;
        value.salaryHigh=999;
        break;
      default:
        value.salaryLow = value.salary.split('-')[0];
        value.salaryHigh = value.salary.split('-')[1];
        break; 
    }
    let datas = {
      salaryLow:value.salaryLow,
      salaryHigh:value.salaryHigh,
      refreshTime:value.refreshTime,
      jobKind:value.jobKind
    };
    let pages = getCurrentPages();
    let curpage = pages[pages.length-2];
    wx.navigateBack();
    curpage.changeJobCallBack(datas);
  },
  onLoad(options) {
    let that = this;
    let index = 0;
    if(!options.salarylow){
      index = 0;
    }else{
      let arr = [options.salarylow,options.salaryhigh].join('-');
      if( arr === '100万以上' ){
        index = that.data.salaryArray.length-1;
      }else{
        that.data.salaryArray.forEach((v,i)=>{
          if(v === arr){
            index = i;
          }
        });
      }
    }
    if(options.jobkind){
      this.setData({
        jobKind:options.jobkind
      });
    }
    if(options.refreshtime){
      this.setData({
        refreshTime:options.refreshtime
      });
    }
    
    this.setData({
      index: index
    });
  }
});
