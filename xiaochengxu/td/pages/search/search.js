import http from '../../utils/http';
import extend from '../../utils/extend';
import Utils from '../../utils/util';

import Search from '../../modules/Search';
let search = new Search();

import User from '../../modules/User';
let user = new User();
import resume from '../../modules/Resume';

let app = getApp();

Page({
  data: {
    focus:true,
    max:5,
    keyword:'',
    hotComp:[],
    hotSearch:{
      industry:'000',
      value:[],
    },
    historyList:[]
  },
  onShow(){
    let that = this;
    search.getsearchStore(function(data){
      that.setData({
        historyList:data.historyList
      });
    });
  },
  removeHistory(e){
    let that = this; // e.currentTarget.dataset  获取 data 自定义属性；
    search.setHistory(e.currentTarget.dataset.index,function(historys){
      that.setData({historyList:historys});
    });
  },
  selectKey(e){
    this.subSearch({keyword:e.currentTarget.dataset.key});
  },
  selectHistoryKey(e){
    let that = this; // e.currentTarget.dataset  获取 data 自定义属性；
    let index = e.currentTarget.dataset.index;
    this.subSearch(that.data.historyList[index]);
  },
  KeySearch(e){
    this.subSearch({keyword:e.detail.value});
  },
  subSearch(options) { // ajax提交搜索事件
    let that = this;
    resume.getUserBaseInfo(function(userBaseInfo){
      let datas = extend({
        dq:that.data.city.code,
        industry:userBaseInfo.baseInfo.industryCode||'000'
      }, options);
      wx.redirectTo({
        url: `/pages/searchlist/searchlist?keyword=${datas.keyword}&dq=${datas.dq}&industry=${datas.industry}`
      });//跳转不保留当前页
    });
  },
  formSubmit: function(e) { // form发生了submit事件
    this.subSearch(e.detail.value);
  },
  onLoad() {
    let that = this;
    // that.toast = new app.Liepin.Toast(this);
    // that.toast.showToast({
    //   title:'系统错误，请稍后再试',
    //   duration: 2000
    // });
    
    let store = {
      searchKey:''
    };
    
    //搜索页 热门公司推荐
    let hotComp  = () => {
      return new Promise((resolve,reject) => {
        http.request({
          url: `/a/t/job/hot-search-comp.json`,
          method: 'POST',
          dataType: 'json',
          success: ({data}) => {
            if(data.flag === 1){
              store.hotComp = data.data.hotComp.length>0 ? data.data.hotComp : [];
            }else{
              store.hotComp = [];
            }
            resolve();
          },
          fail: err => {
            console.log(err);
            store.hotComp = [];
            resolve();
          }
        });
      });
    };

    //获取当前城市
    let getCity = () => {
      return new Promise((resolve,reject) => {
        user.getUserCity(city => {
          store.city = city;
          resolve();
        });
      });
    };

    //搜索页 热门搜索
    let hotSearch  = () => {
      return new Promise((resolve,reject) => {
        http.request({
          url: `/a/n/const/hot-words-for-industry.json`,
          method: 'POST',
          dataType: 'json',
          success: ({data}) => {
            if(data.flag === 1){
              resume.getUserBaseInfo(function(userBaseInfo){
                let code = userBaseInfo.baseInfo.industryCode||'000'; // 行业code 默认 '000'
                let datas = data.data.hotWords[code];
                if(!datas||!datas.length){
                  datas = data.data.hotWords['000'];
                }
                datas.length = datas.length >= that.data.max ? that.data.max : datas.length;
                store.hotSearch = {
                  industry:code,
                  value:datas
                };
                resolve();
              });
            }else{
              resolve();
            }
          },
          fail: err => {
            resolve();
          }
        });
      });
    };

    //搜索页 历史记录
    let getHistory = () => {
      return new Promise((resolve,reject) => {
        search.getsearchStore(function(data){
          console.log(data.historyList);
          store.historyList = data.historyList.filter( v => {
            if(v.dq){
              v.dq_showName = Utils.getCityNameByCode(v.dq)
            }
            if(v.industry){
              v.industry_showName = Utils.getIndustryNameByCode(v.industry)
            }
            return v;
          });
          resolve();
        });
      });
    };

    //设置数据
    let setStore = () =>{
      that.setData(store);
    };
    
    hotComp().then(getCity).then(getHistory).then(hotSearch).then(setStore).catch(e => {});
    
  }
});
