import extend from '../utils/extend';
import http from '../utils/http';
let appInstance = getApp();
const funArray = ['navigateTo','redirectTo'];
class Resume {
  saveUserBaseInfo(params){
    let that = this;
    http.request({
      url: '/a/t/user/register-user-info.json',
      method: 'POST',
      data: params,
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          that.refresh(()=>{
            that.complete(1);
          });
        } else {
          wx.showToast({
            title: data.msg || '网络错误',
            duration: 2000
          });
        }
      },
    });
  }
  saveWorkExp(params){
    let that = this;
    http.request({
      url: '/a/t/resume/save-work-exp.json',
      method: 'POST',
      data: params,
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          that.refresh(()=>{
            that.complete(1);
          });
        } else {
          wx.showToast({
            title: data.msg || '网络错误',
            duration: 2000
          });
        }
      },
    });
  }
  saveEduExp(params){
    let that = this;
    http.request({
      url: '/a/t/user/save-edu-exp.json',
      method: 'POST',
      data: params,
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          that.refresh(()=>{
            that.complete(1);
          });
        } else {
          wx.showToast({
            title: data.msg || '网络错误',
            duration: 2000
          });
        }
      },
    });
  }
  refresh(callback){
    http.request({
      url: '/a/t/auth/user-login.json',
      method: 'POST',
      data: {},
      dataType: 'json',
      success: ({data}) => {
        if(data.flag === 1) {
          appInstance.globalData.UserBaseInfo = data.data;
          http.request({
            url: '/a/t/user/need-improve-info.json',
            method: 'POST',
            data: {},
            dataType: 'json',
            success: ({data}) => {
              if(data.flag === 1) {
                appInstance.globalData.UserImproveInfo = data.data;
                callback.call(this);
              } else {
                wx.showToast({
                  title: data.msg || '网络错误',
                  duration: 2000
                });
              }
            },
          });
        } else {
          wx.showToast({
            title: data.msg || '网络错误',
            duration: 2000
          });
        }
      },
    });
  }
  getImproveInfo(callback){
    if(!callback){
      return this
    }
    let that = this;
    if(appInstance.globalData.UserImproveInfo){
      callback.call(that,appInstance.globalData.UserImproveInfo);
    }else{
      that.refresh(()=>{
        callback.call(that,appInstance.globalData.UserImproveInfo);
      });
    }
  }
  getUserBaseInfo(callback){
    if(!callback){
      return this
    }
    let that = this;
    if(appInstance.globalData.UserBaseInfo){
      callback.call(that,appInstance.globalData.UserBaseInfo);
    }else{
      that.refresh(()=>{
        callback.call(that,appInstance.globalData.UserBaseInfo);
      });
    }
  }
  complete(callback,redirect){
    let callbackFn;
    let isRedirect = 0;
    if(typeof callback !== 'function'){
      isRedirect = callback;
    }else{
      callbackFn = callback;
      redirect && (isRedirect = redirect);
    }
    this.getUserBaseInfo(userBaseInfoData => {
      if(userBaseInfoData.perfect_info === 0){
        wx[funArray[isRedirect]]({
          url: '/pages/userbaseinfo/userbaseinfo'
        });
      }else{
        this.getImproveInfo(imporoveInfoData => {
          if(imporoveInfoData.needWorkExp){
            wx[funArray[isRedirect]]({
              url: '/pages/userbaseinfo/workexp'
            });
          }else if(imporoveInfoData.needEduExp){
            wx[funArray[isRedirect]]({
              url: '/pages/userbaseinfo/eduexp'
            });
          }else{
            if(callbackFn){
              callbackFn.call(this);
            }else{
              wx.navigateBack({
                delta:1
              });
            }
          }
        });
      }
    });
  }
}
export default new Resume();