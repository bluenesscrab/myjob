//map.js
//获取应用实例
var app = getApp();
Page( {
  data: {  
    latitude: 0,
    longitude: 0,
    markers:[{
      iconPath: "/images/map/hotel.png",
      id: 0,
      latitude: 39.91403,
      longitude: 116.407526,
      width: 35,
      height: 35
    }],
    scale:12
  },
  openmap:function(){
    wx.getLocation( {
      type: 'wgs84',
      success: function( res ) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          name:"hotel",
          address:"北京市朝阳区八里庄北里220号，中远物流大厦配楼 正对天桥 猎聘网",
          latitude: 39.91403,
          longitude: 116.407526,
          scale: 12
        });
      }
    });
  },
  onShow:function(){
    var that = this;
    wx.getLocation( {
      type: 'wgs84',
      success: function( res ) {
        var point={
          latitude: res.latitude,
          longitude: res.longitude
        };
        that.setData( point );
      }
    });
  },
  onLoad: function () {
    // var that = this;
    // wx.getLocation( {
    //   type: 'wgs84',
    //   success: function( res ) {
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //     var speed = res.speed;
    //     var markers = {
    //       markers:[{
    //         iconPath: "/images/map/hotel.png",
    //         id: 0,
    //         latitude: 39.91403,
    //         longitude: 116.407526,
    //         width: 30,
    //         height: 30
    //       }]
    //     };
    //     that.setData( markers );
    //     var accuracy = res.accuracy;
    //     var point={
    //          latitude: latitude,
    //          longitude: longitude
    //     }
    //     that.setData( point );

    //     var polyline = {
    //       polyline:[{
    //         points: [{
    //           latitude: latitude,
    //           longitude: longitude
    //         }, {
    //           latitude: 39.91403,
    //           longitude: 116.407526,
    //         }],
    //         color:"#FF0000DD",
    //         width: 2,
    //         dottedLine: true
    //       }]
    //     };
    //     that.setData( polyline );
    //   }
    // })
  }
})
