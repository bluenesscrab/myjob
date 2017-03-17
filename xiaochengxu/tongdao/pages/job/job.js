import http from '../../utils/http';
import Job from '../../modules/Job';

let job = new Job();
let app = getApp();

Page({
  data: {
    jobId:"",
    jobKind:"",
    isShort:true,
    jobInfoList:{

    },
    interestedJobList:[],
  },
  onLoad: function (options) {
    this.toast = new app.Liepin.Toast(this);
    job.toast = new app.Liepin.Toast(this);
    this.setData({
      jobId:Number(options.id),
      jobKind:options.kind
    });
    this.getJobDetails();
    this.getInterestedJob();
  },
  setStorage:function(){
    wx.setStorageSync("jobtitles",this.data.jobInfoList.jobtitles);
    wx.setStorageSync("jobtitlesCode",this.data.jobInfoList.jobtitlesCode);
    wx.setStorageSync("compIndustry",this.data.jobInfoList.ecompDto.compIndustry);
    wx.setStorageSync("compIndustryCode",this.data.jobInfoList.ecompDto.compIndustryCode);
  },
  handleTap:function(){
    this.collectJob();
  },
  applyTap:function(){
    this.setStorage();
    job.apply({
      jobId: this.data.jobId,
      jobKind: this.data.jobKind,
      callback:results=>{
        if(results.integrity < 65){
          wx.redirectTo({
            url: '/pages/userbaseinfo/userbaseinfo'
          });
        }else{
          this.toast.showToast({
            title: "应聘成功",
            duration: 2000
          });
          this.setData({
            'jobInfoList.isApplied':1,
          });
        }
      }
    });
  },
  collectJob(){
    if(this.data.jobInfoList.isFavorite === 1 ){
      http.request({
      url: '/a/t/job/favorite/remove.json',
      method: 'POST',
      data: {
        "jobId":this.data.jobId,
        "jobKind":this.data.jobKind,
      },
      dataType: 'json',
        success: ({data}) => {
          if(data.flag === 1) {
            this.setData({
              'jobInfoList.isFavorite':0
            });
            this.toast.showToast({
              title: "取消成功",
              duration: 2000
            });
          } else {
            if(data.code === '5018') {
              // 登录超时
              return wx.redirectTo({
                url: '/pages/user/login'
              });
            }
          }
        },
      });
    }else{
      http.request({
      url: '/a/t/job/favorite/add.json',
      method: 'POST',
      data: {
        "jobId":this.data.jobId,
        "jobKind":this.data.jobKind,
      },
      dataType: 'json',
        success: ({data}) => {
          if(data.flag === 1) {
            this.setData({
              'jobInfoList.isFavorite':1
            });
          } else {
            if(data.code === '5018') {
              // 登录超时
              return wx.redirectTo({
                url: '/pages/user/login'
              });
            }
          }
        },
      });
    }
  },
  getJobDetails() {
    http.request({
      url: '/a/t/job/detail.json',
      method: 'POST',
      data: {
        "jobId":this.data.jobId,
        "jobKind":this.data.jobKind,
        "referer":"",
        "sfrom":"",
      },
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          this.setData({
            jobInfoList:data.data
          });
        } else {
          if(data.code === '5018') {
            // 登录超时
            return wx.redirectTo({
              url: '/pages/user/login'
            });
          }
        }
      },
    });
  },
  getInterestedJob() {
    http.request({
      url: '/a/t/job/may-interested-job.json',
      method: 'POST',
      data: {
        "jobId":this.data.jobId,
        "jobKind":this.data.jobKind,
        "referer":"",
        "sfrom":"",
      },
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          this.setData({
            interestedJobList:data.data.recommendJobs.filter(item => ['3', '5'].indexOf(item.job_kind) === -1)
          });
        } else {
          if(data.code === '5018') {
            // 登录超时
            return wx.redirectTo({
              url: '/pages/user/login'
            });
          }
        }
      },
    });
  }
});
