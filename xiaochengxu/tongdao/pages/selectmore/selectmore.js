var app = getApp();

import http from '../../utils/http';
import extend from '../../utils/extend';

Page({
  data: {
    compScaleData:[
      {name:'不限',value:'000'},
      {name:'1-49人',value:'010'},
      {name:'50-99人',value:'020'},
      {name:'100-499人',value:'030'},
      {name:'500-999人',value:'040'},
      {name:'1000-2000人',value:'050'},
      {name:'2000-5000人',value:'060'},
      {name:'5000-10000人',value:'070'},
      {name:'10000人以上',value:'080'}
    ],
    compKindData:[
      {name:'不限',value:'000'},
      {name:'外商独资·外企办事处',value:'010'},
      {name:'中外合资(合资·合作)',value:'020'},
      {name:'私营·民营企业',value:'030'},
      {name:'国有企业',value:'040'},
      {name:'国内上市公司',value:'050'},
      {name:'政府机关/非盈利机构',value:'060'},
      {name:'事业单位',value:'070'},
      {name:'其他',value:'999'}
    ],
    query:{
      compKind:'000',
      compScale:'000'
    }
  },
  compScaleChange(e){//选择 企业规模
    this.setData({
      'query.compScale':e.detail.value
    });
  },
  compKindChange(e){//选择 企业类型
    this.setData({
      'query.compKind':e.detail.value
    });
  },
  formSubmit(e){
    let that = this;
    let value = e.detail.value;
    let pages = getCurrentPages();
    let curpage = pages[pages.length-2];
    wx.navigateBack();
    curpage.changeMoreCallBack({
      compKind:value.compKind,
      compScale:value.compScale
    });
  },
  onLoad(options) {
    let that = this;
    if(options){
      that.setData({
        query:{
          compKind:options.compKind,
          compScale:options.compScale
        }
      });
    }

  }
});
