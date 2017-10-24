import http from '../../utils/http';
import User from '../../modules/User';
import resume from '../../modules/Resume';
import Job from '../../modules/Job';
let job = new Job();

let user = new User();

let app = getApp();

Page({

  data: {
    imgUrls: [
      '/assets/images/banner/20160120.png'
    ],
    recommendJobList: [],
  },

  onLoad: function () {
    // toastProxy
    this.toast = new app.Liepin.Toast(this);
    user.toastProxy(this.toast);
    // main
    app.onLogin(() => {
      this.getRecommendJobList();
    });
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.getRecommendJobList(() => {
      wx.stopPullDownRefresh();
    });
  },

  onShareAppMessage: function () {
    return {
      title: '我在用猎聘同道+',
      desc: '高薪工作 一触即达',
      path: '/pages/index/index'
    };
  },

  // 获得推荐职位列表
  getRecommendJobList(callback) {
    http.request({
      url: '/a/t/job/recommend-pages.json',
      method: 'POST',
      data: {
        size: 100,
      },
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          this.setData({
            recommendJobList: data.data.datas.filter(item => ['1', '2'].indexOf(item.job_kind) !== -1)
          });
        } else {
          this.toast.showToast({
            title: data.msg || '网络错误',
            duration: 2000
          });
        }
        typeof callback === 'function' && callback();
      },
    });
  },
});
