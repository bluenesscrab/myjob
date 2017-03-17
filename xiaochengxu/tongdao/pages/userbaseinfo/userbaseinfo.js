import http from '../../utils/http';
import resume from '../../modules/Resume';
import User from '../../modules/User';
let user = new User;
let app = getApp();
Page({
  data: {
    userBaseInfo: {},
  },
  // 选择性别
  sexRadioChange:function(e){
    this.setData({
      'userBaseInfo.baseInfo.sex':e.detail.value
    });
  },
  // 日期选择
  birthyearChange:function(e){
    this.setData({
      'userBaseInfo.baseInfo.birthYear':e.detail.value
    });
  },
  validTips: function(msg){
    this.toast.showToast({
      title: msg || '网络错误',
      duration: 2000
    });
  },
  // 表单提交
  formSubmit: function(e){
    let params = e.detail.value,
        that = this;
    //姓名校验
    if(!params.name){
      that.validTips('请输入姓名');
      return false;
    }
    if(!/^[\u4E00-\u9FA5]{2,5}$/.test(params.name)){
      that.validTips('姓名只能为2-5个汉字');
      return false;
    }
    // 职位校验
    if(!params.curJobPosition){
      that.validTips('请输入职位名称');
      return false;
    }
    if(params.curJobPosition.length<2 || params.curJobPosition.length>45){
      that.validTips('当前职位名称只能输入2-45个字');
      return false;
    }
    // 公司校验
    if(!params.curCompany){
      that.validTips('请输入公司名称');
      return false;
    }
    if(params.curCompany.length<2 || params.curCompany.length>128){
      that.validTips('当前公司只能输入2-128个字');
      return false;
    }
    // 生日校验
    if(!params.birthYear){
      that.validTips('请选择出生年份');
      return false;
    }
    params.birthYear = params.birthYear-0;//转换为number
    resume.saveUserBaseInfo(params);
  },
  //事件处理函数
  bindViewTap: () => {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    let that = this;
    app.onLogin(() => {
      that.toast = new app.Liepin.Toast(that);
      resume.getUserBaseInfo(userBaseInfoData =>{
        that.setData({
            userBaseInfo: userBaseInfoData
          });
          if(!userBaseInfoData.baseInfo.sex){
            that.setData({
              'userBaseInfo.baseInfo.sex':'男'
            });
          }
          if(!userBaseInfoData.baseInfo.dqCode){
            user.getUserCity(city => {
              that.setData({
                'userBaseInfo.baseInfo.dqCode':city.code,
                'userBaseInfo.baseInfo.dqName':city.name
              });
            });
          }
          if(!userBaseInfoData.baseInfo.birthYear){
            that.setData({
              'userBaseInfo.baseInfo.birthYear':1991
            });
          }
      });
    });
  }
});
