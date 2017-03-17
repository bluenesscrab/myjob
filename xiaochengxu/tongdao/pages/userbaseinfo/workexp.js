import http from '../../utils/http';
import util from '../../utils/util';
import resume from '../../modules/Resume';
let app = getApp();
Page({
  getToday:function(){
    let today = new Date();
    return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  },
  data: {
    workExpData: {},
  },
  validTips: function(msg){
    this.toast.showToast({
      title: msg || '网络错误',
      duration: 2000
    });
  },
  // 日期选择
  workYearChange:function(e){
    let value = e.detail.value.split('-');
    value.pop();
    value = value.join('-');
    this.setData({
      'workExpData.workStartShow':value.replace('-','年')+'月',
      'workExpData.workStart':value
    });
  },
  // 行业选择
  changeIndustryCallBack:function(code,name){
    this.setData({
      'workExpData.industryCode':code,
      'workExpData.industryName':name
    });
  },
  // suggest筛选
  suggestCallback:function(selected,type){
    if(type === 'jobs'){
      this.setData({
        'workExpData.jobCode':selected.code,
        'workExpData.jobName':selected.name
      });
    }
  },
  // showTips
  showTips:function(e){
    this.setData({
      'workExpData.salary':e.detail.value
    });
  },
  // 表单提交
  formSubmit: function(e){
    let params = e.detail.value,
        that = this;
    //行业校验
    if(!params.industryCode){
      that.validTips('请输入公司所在行业');
      return false;
    }
    // 入职时间校验
    if(!params.workStart){
      that.validTips('请输入您的入职时间');
      return false;
    }
    let today = new Date();
    let month = today.getMonth()+1;
    if(month<10){
      month = '0'+month;
    }
    if(new Date(params.workStart) > new Date(today.getFullYear()+'-'+month)){
      that.validTips('请输入正确的入职时间');
      return false;
    }
    // 职能校验
    if(!params.jobCode){
      that.validTips('请输入当前职能');
      return false;
    }
    params.workStart = params.workStart.replace('-','');
    // 月薪校验
    if(!params.salary||params.salary == 0){
      that.validTips('请输入您的月薪');
      return false;
    }
    if(!/^\d+$/.test(params.salary)){
      that.validTips('请输入正确的的月薪');
      return false;
    }
    params.salary = params.salary - 0;
    // 邮箱校验
    if(!/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(params.email)){
      that.validTips('请输入正确的邮箱');
      return false;
    }
    resume.saveWorkExp(params);
  },
  onLoad: function(options) {
    let that = this;
    app.onLogin(() => {
      let jobtitles = wx.getStorageSync('jobtitles'),
          jobtitlesCode = wx.getStorageSync('jobtitlesCode'),
          compIndustry = wx.getStorageSync('compIndustry').split('\，').shift(),
          compIndustryCode = wx.getStorageSync('compIndustryCode').split(',').shift();
      let jobEffective = util.getJobNameByCode(jobtitlesCode);
      that.setData({
        today:that.getToday()
      });
      that.toast = new app.Liepin.Toast(that);
      resume.getImproveInfo(workExpData =>{
        that.setData({
          workExpData: workExpData
        });
        if(workExpData.salary === 0){
          that.setData({
            'workExpData.salary':''
          });
        }
        if(!workExpData.jobName&&jobEffective){
          that.setData({
            'workExpData.jobName':jobtitles
          });
        }
        if(!workExpData.jobCode&&jobEffective){
          that.setData({
            'workExpData.jobCode':jobtitlesCode
          });
        }
        if(!workExpData.industryName){
          that.setData({
            'workExpData.industryName':compIndustry
          });
        }
        if(!workExpData.industryCode){
          that.setData({
            'workExpData.industryCode':compIndustryCode
          });
        }
      });
    });
  }
});
