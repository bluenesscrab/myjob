import { PASSPORT_URL } from '../config';
import extend from '../utils/extend';
import http from '../utils/http';

export default class Search {
  constructor(){
    this.keyName = 'searchStore';
    this.max = 5;
    this.initialData = {
      historyList:[]
    };
  }

  /*
  * 设置({})/删除(index)历史搜索记录 
  */
  setHistory(options, callBack){
    let that = this;
    this.getsearchStore(function(datas){
      if( typeof options === 'object' ){
        if(datas.historyList && datas.historyList.length>0 ){
          datas.historyList = datas.historyList.filter((v)=>{
            if( (options.keyword === v.keyword) && (options.dq === v.dq) && (options.industry === v.industry) ){
              return false;
            }else{
              return v;
            }
          });
          datas.historyList.unshift(options);
          datas.historyList.length = datas.historyList.length >= that.max ? that.max : datas.historyList.length;
        }else{
          datas.historyList.push(options);
        }
      }else{
        datas.historyList = datas.historyList.filter((v,i)=>{
          return i == options ? false : v; 
        });
      }
      that.setSearchStore(datas);
      callBack && callBack.call(this,datas.historyList);
    });
  }

  /*
  * 获取搜索缓存数据 
  */
  getsearchStore(callBack){
    let that = this;
    wx.getStorage({
      key: that.keyName,
      success(res) {
        callBack && callBack.call(this,res.data);
      },
      fail(e){
        callBack && callBack.call(this,that.initialData);
      }
    });
  }

  /*
  * 设置搜索历史记录
  */
  setSearchStore(options){
    wx.setStorage({
      key:this.keyName,
      data:options
    });
  }

}