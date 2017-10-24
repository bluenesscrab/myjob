var app = getApp() 
Page({ 
 data: { 
  latitude: 0,//纬度 
  longitude: 0,//经度 
  speed: 0,//速度 
  accuracy: 16,//位置精准度 
  markers: [], 
  covers: [], 
 }, 
 onLoad: function (options) { 
  let markers = [{
    latitude:options.latitude,
    longitude:options.longitude
  }]
  let covers = [{
    latitude:options.latitude,
    longitude:options.longitude,
    iconPath:''
  }]
  this.setData({
    longitude:options.longitude,
    latitude:options.latitude,
    markers:markers,
    covers:covers
  })
 }
})