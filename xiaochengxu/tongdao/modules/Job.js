import Liepin from './Liepin';
import http from '../utils/http';
import resume from './Resume';
export default class Job extends Liepin {
  constructor() {
    super();
  }
  getResInfo(callback){
    let resInfo = wx.getStorageSync('resInfo');
    let that = this;
    if(!resInfo||!resInfo.defaultId){
      http.request({
        url: `/a/t/resume/get-resume-ids.json`,
        method: 'POST',
        data: {},
        dataType: 'json',
        success: ({data}) => {
          if(data.flag === 1) {
            wx.setStorageSync('resInfo',data.data);
            typeof callback === 'function'  && callback(data.data);
          } else {
            that.toast.showToast({
              title: data.msg || '系统错误，请稍后再试',
              duration: 2000
            });
          }
        },
        fail: err => {
          console.log(err);
        },
      });
    }else{
      callback.call(that,resInfo);
    }
  }
  apply(options){
    let that = this;
    let opts = options;
    if(!opts.jobId||!opts.jobKind){
      return false;
    }
    opts.jobKind = opts.jobKind-0;
    opts.jobId = opts.jobId - 0;
    resume.complete(function(){
      that.getResInfo((resInfo)=>{
        opts.resId = resInfo.defaultId;
        http.request({
          url: `/a/t/job/apply.json`,
          method: 'POST',
          data: opts,
          dataType: 'json',
          success: ({data}) => {
            if(data.flag === 1) {
              typeof opts.callback === 'function'  && opts.callback(data.data);
            } else {
              that.toast.showToast({
                title: data.msg || '系统错误，请稍后再试',
                duration: 2000
              });
            }
          },
          fail: err => {
            console.log(err);
          },
        });
      });
    });
  }
  getMyFavorList(page = 0, callback) {
    http.request({
      url: `/a/t/user/favorite-job-page.json`,
      method: 'POST',
      data: {
        currentPage: page,
        pageSize: 20,
      },
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          data.data.jobForms = data.data.jobForms.filter(job => ['1', '2'].indexOf(job.job_kind) !== -1);
          typeof callback === 'function'  && callback(data.data);
        } else {
          this.toast.showToast({
            title: data.msg || '系统错误，请稍后再试',
            duration: 2000
          });
        }
      },
      fail: err => {
        console.log(err);
      },
    });
  }

  getApplyList(page = 0, callback) {
    http.request({
      url: `/a/t/user/apply-pages.json`,
      method: 'POST',
      data: {
        currentPage: page,
        pageSize: 20,
        status: '000',
      },
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          console.log(data.data);
          data.data.datas = data.data.datas.filter(job => ['1', '2'].indexOf(job.jobKind) !== -1);
          typeof callback === 'function'  && callback(data.data);
        } else {
          this.toast.showToast({
            title: data.msg || '系统错误，请稍后再试',
            duration: 2000
          });
        }
      },
      fail: err => {
        console.log(err);
      },
    });
  }
}