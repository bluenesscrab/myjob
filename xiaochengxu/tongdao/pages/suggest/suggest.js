import http from '../../utils/http';
import util from '../../utils/util';
let app = getApp();
let pages = null;
let curpage = null;
let timer = null;
Page({
  placeholder:{
    jobs:'我从事的职能（例如：产品经理）',
    school:'请输入学校名称（例如：北京大学）',
    major:'请输入专业名称（例如：计算机科学）'
  },
  data: {
    defaultValue:'',
    type:'jobs',
    dataType:'object',
    isCustom:false
  },
  // input事件
  inputChange:function(event){
    let inputValue = event.detail.value.trim();
    let that = this;
    let type = that.data.type;
    clearTimeout(timer);
    timer = setTimeout(function(){
      let suggestArray = [];
      if(!inputValue){
        that.setData({
          'suggestArray':[]
        });
        return false;
      }
      if(that.data.isCustom){
        let defaultItem = inputValue;
        if(that.data.dataType==='object'){
          defaultItem = {
            code:inputValue,
            name:inputValue 
          }
        }
        suggestArray.push(defaultItem);
      }
      switch(type){
        case 'jobs':
          suggestArray = suggestArray.concat(util.getJobsByKeyword(inputValue));
          break;
        case 'school':
          suggestArray = suggestArray.concat(util.getSchoolsByKeyword(inputValue));
          break;
        case 'major':
          suggestArray = suggestArray.concat(util.getMajorsByKeyword(inputValue));
          break;
        default:
          callback.call(this);
          break;
      }
      that.setData({
        'suggestArray':suggestArray
      });
    },200);
  },
  bindCancel:(event)=>{
    wx.navigateBack({
      delta: 1
    });
  },
  binChoice:function(event){
    let selected = event.target.dataset;
    curpage.suggestCallback && curpage.suggestCallback(selected,this.data.type);
    wx.navigateBack({
      delta: 1
    });
  },
  onLoad: function(options) {
    let that = this;
    app.onLogin(() => {
      pages = getCurrentPages();
      curpage = pages[pages.length-2];
      let that = this,
          type = options.type;
      that.setData({
        defaultValue:options.value,
        type:options.type,
        dataType:options.dataType||'object',
        placeholder:that.placeholder[options.type]
      });
      if(options.isCustom){
        that.setData({
          isCustom:options.isCustom
        });
      }
    });
  }
});
