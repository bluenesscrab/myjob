import http from '../../utils/http';

import extend from '../../utils/extend';
import Search from '../../modules/Search';
let search = new Search();

import Utils from '../../utils/util';

let app = getApp();
Page({
  data: {
    scrollTop:0,
    soJobForms: [],
    hasHidden:true, //列表加载中 UI
    hasRefesh:true, //刷新 UI
    noMore:false, // 是否加载更多
    industries:[],
    industryName:'全部',
    cityName:'北京',
    query:{
      keyword:'产品经理',
      dq:'010',
      industry:'040',
      salaryLow:0,
      salaryHigh:999,
      refreshTime:'000',
      jobKind:'2',
      compKind:['000'],
      compScale:'000',
      currentPage:0,
      pageSize:10
    }
  },
  changeIndustryCallBack(options,name){//选择行业 back
    let that = this;
    let datas = {};
    if(options){
      datas = extend(that.data.query,{industry:options});
    }else{
      datas = extend(that.data.query,{industry:'000'});
    }

    if(name.indexOf(',') > -1){
      name = '多个行业';
    }
    if(!options){
      name = '选择行业';
    }
    that.setData({
      industryName:name,
      query:datas
    });
    // forsubmit
    that.getJobList();

  },
  changeAreaCallBack(code){//选择城市 back
    let that = this;
    let datas = extend(that.data.query,{dq:code});
    that.setData({
      cityName:Utils.getCityNameByCode(code),
      query:datas
    });
    // forsubmit
    that.getJobList();
  },
  changeJobCallBack(options){//职位筛选 back
    let that = this;
    options.salaryHigh && (options.salaryHigh = options.salaryHigh-0);
    options.salaryLow && (options.salaryLow = options.salaryLow-0);
    let datas = extend(that.data.query,options);
    console.log(that.data.query, options, datas);
    that.setData({
      query:datas
    });
    
    // forsubmit
    that.getJobList();
  },
  changeMoreCallBack(options){//选择更多 back
    let that = this;
    if(options.compKind){
      options.compKind = [options.compKind]; 
    }
    let datas = extend(that.data.query,options);
    that.setData({
      query:datas
    });
    // forsubmit
    that.getJobList();
  },
  formSubmit(e){
    let that = this;
    let value = e.detail.value;
    let datas = extend(that.data.query,value);
    that.setData({
      query:datas
    });
    // forsubmit
    that.getJobList();
  },
  KeySearch(e){
    let that = this;
    let value = e.detail.value;
    let datas = extend(that.data.query,{keyword:value});
    // forsubmit
    that.getJobList();
  },
  changeMore(e){//选择更多
    let more = this.data.query;
    wx.navigateTo({
      url: `/pages/selectmore/selectmore?&compKind=${more.compKind[0]}&compScale=${more.compScale}`
    });//跳转保留当前页   
  },
  selectIndustry(e){//选择行业
    let industry = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/industry/industry?&code=${industry.code||''}`
    });//跳转保留当前页
  },
  selectCity(e){//选择城市
    let city = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/area/area?&code=${city.code}`
    });//跳转保留当前页
  },
  selectJob(e){ //职位筛选
    let job = this.data.query;
    wx.navigateTo({
      url: `/pages/selectjob/selectjob?jobkind=${job.jobKind}&refreshtime=${job.refreshTime}&salaryhigh=${job.salaryHigh}&salarylow=${job.salaryLow}`
    });//跳转保留当前页
  },
  loadMore(){
    let that = this;
    let datas = that.data.query;
    datas.currentPage++;
    if(that.data.noMore){
      that.toast.showToast({
        title:'没有更多内容了!',
        duration: 2000
      });
      return false;
    }

    this.setData({hasHidden:false});
    http.request({
      url: '/a/t/job/v2/search-cbh.json',
      method: 'POST',
      data: datas,
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          if(data.data.soJobForms.length>0){
            this.setData({
              soJobForms: that.data.soJobForms.concat(data.data.soJobForms.filter(item => ['1', '2'].indexOf(item.job_kind) > -1)),
              noMore:data.data.isHaveNext==1?false:true,
              hasHidden:true
            });
          }else{
            this.setData({
              hasHidden:false
            });
            that.toast.showToast({
              title:'暂无更多数据,请修改搜索条件',
              duration: 2000
            });
          }
        } else {
          this.setData({
            hasHidden:false
          });
          that.toast.showToast({
            title:data.msg|'系统错误，请稍后再试',
            duration: 2000
          });
        }
      }
    });

  },
  onLoad: function (options) {
    let that = this;
    that.toast = new app.Liepin.Toast(this);
    
    if(options.industry){
      let name = '';
      if( options.industry.indexOf(',')>-1 ){
        name='多个行业';
      }else{
        name = Utils.getIndustryNameByCode(options.industry);
      }
      that.setData({
        industryName:name
      });
    }else{
      that.setData({
        industryName:Utils.getIndustryNameByCode(that.data.query.industry)
      });
    }
    if(options.dq){
      that.setData({
        cityName:Utils.getCityNameByCode(options.dq)
      });
    }else{
      that.setData({
        cityName:Utils.getCityNameByCode(that.data.query.dq)
      });
    }
    let datas =  extend(that.data.query,options);
    that.setData({
      query:datas
    });
    that.getJobList();

  },
  getJobList(){
    let that = this;
    let datas = that.data.query;
    datas.currentPage = 0;
    if(datas.keyword){
      search.setHistory(that.data.query);
    }
    this.setData({hasHidden:false});
    http.request({
      url: '/a/t/job/v2/search-cbh.json',
      method: 'POST',
      data: datas,
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          if(data.data.soJobForms.length > 0){
            this.setData({
              soJobForms:data.data.soJobForms.filter(item => { return ['1', '2'].indexOf(item.job_kind) > -1 }),
              noMore:data.data.isHaveNext==1?false:true,
              hasHidden:true,
              hasRefesh:true,
              scrollTop:0
            });
          }else{
            this.setData({
              hasHidden:true,
              hasRefesh:true,
              soJobForms:[],
              scrollTop:0
            });
          }
        } else {
          that.toast.showToast({
            title:data.msg|'系统错误，请稍后再试',
            duration: 2000
          });
          this.setData({
            hasHidden:true,
            hasRefesh:true,
            scrollTop:0
          });
        }
      }
    });
  }

  // 下拉刷新
  // refesh(e){
  //   console.log('refesh');
  //   let that = this;
  //   let datas =  extend(that.data.query,{currentPage:0});
  //   that.setData({
  //     query:datas,
  //     hasRefesh:false
  //   });
  //   that.getJobList();
  // }

});
