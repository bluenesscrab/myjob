import Job from '../../modules/Job';

let app = getApp();
let job = new Job();

Page({

  data: {
    list: null,
  },

  page: 0,
  next: true,

  fetchList: function(page = 0, type = 'DROP_UP', callback) {
    job.getApplyList(page, data => {
      let oldData = this.data.list || [];
      if(type === 'DROP_UP') {
        this.next = !!data.isHaveNext;
        oldData = [...oldData, ...data.datas];
        this.setData({
          list: oldData
        });
      } else if(type === 'DROP_DOWN') {
        oldData = [...oldData];
        data.datas.forEach(item => {
          if(!oldData.find(oldItem => oldItem.id === item.id)) {
            oldData.unshift(item);
          }
        });
        this.setData({
          list: oldData
        });
      }
      typeof callback === 'function' && callback();
    });
  },

  onLoad: function(options){
    // toastProxy
    this.toast = new app.Liepin.Toast(this);
    job.toastProxy(this.toast);
    // main
    app.onLogin(() => {
      this.fetchList(this.page);
    });
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.fetchList(0, 'DROP_DOWN', () => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom: function() {
    if(this.next) {
      this.fetchList(++this.page);
    }
  },

});