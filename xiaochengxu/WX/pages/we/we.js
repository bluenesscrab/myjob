//we.js
//获取应用实例
var app = getApp()
Page({
  data: {
    src:"http://www.w3school.com.cn/i/movie.ogg"
  },
  onLoad: function () {
     var that = this;
     this.videoContext = wx.createVideoContext('myVideo');
     setInterval(function(){
       that.videoContext.seek(0);
     },3000);
  },
  onShow:function(){

  },
  reloads:function(){
    console.log('end');
  }
})
