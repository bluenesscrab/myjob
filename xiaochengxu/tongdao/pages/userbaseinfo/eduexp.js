import http from '../../utils/http';
import resume from '../../modules/Resume';
let app = getApp();
Page({
  data: {
    today:'',
    eduExpData: {},
    educationMap:[{"code": "005","name": "博士后"},{"code": "010","name": "博士"},{"code": "020","name": "MBA/EMBA"},{"code": "030","name": "硕士"},{"code": "040","name": "本科"},{"code": "050","name": "大专"},{"code": "060","name": "中专"},{"code": "070","name": "中技"},{"code": "080","name": "高中"},{"code": "090","name": "初中"}]
  },
  getToday:function(){
    let today = new Date();
    let month = today.getMonth()+1;
    if(month<10){
      month = '0'+month;
    }
    return today.getFullYear()+'-'+month+'-'+today.getDate();
  },
  validTips: function(msg){
    this.toast.showToast({
      title: msg || '网络错误',
      duration: 2000
    });
  },
  // suggest筛选
  suggestCallback:function(selected,type){
    if(type === 'school'){
      this.setData({
        'eduExpData.eduSchool':selected.code
      });
    }else if(type === 'major'){
      this.setData({
        'eduExpData.major':selected.code
      });
    }
  },
  // 开始时间
  startDateChange:function(e){
    let value = e.detail.value;
    let valueArray = value.split('-');
    this.setData({
      'eduExpData.eduStartYear':valueArray[0],
      'eduExpData.eduStartMonth':valueArray[1],
      'eduExpData.eduStartDate':value,
      'eduExpData.eduStartDateName':valueArray[0]-0+'年'+(valueArray[1]-0)+'月',
    });
  },
  // 结束时间
  endDateChange:function(e){
    let value = e.detail.value;
    let valueArray = value.split('-');
    let todayArray = this.getToday().split('-').slice(0,2);
    let eY = valueArray[0],
        eM = valueArray[1],
        eD = value,
        eDname = valueArray[0]-0+'年'+(valueArray[1]-0)+'月';
    if(eY>=todayArray[0]&&eM>=todayArray[1]){
      eDname = '至今';
      eY = '9999';
      eM = '99';
    }
    this.setData({
      'eduExpData.eduEndYear':eY,
      'eduExpData.eduEndMonth':eM,
      'eduExpData.eduEndDate':eD,
      'eduExpData.eduEndDateName':eDname,
    });
  },
  // 学历筛选
  eduLevelChange:function(e){
    let index = e.detail.value;
    this.setData({
      'eduExpData.eduLevel':this.data.educationMap[index].code,
      'eduExpData.eduLevelName':this.data.educationMap[index].name
    });
  },
  // 是否统招
  eduSwitchChange:function(e){
    this.setData({
      'eduExpData.eduTZ':e.detail.value
    });
  },
  // 表单提交
  formSubmit: function(e){
    let params = e.detail.value,
        that = this;
    //学校校验
    if(!params.eduSchool){
      that.validTips('请输入您的学校名称');
      return false;
    }
    // 在校时间校验
    if(!params.eduStartYear||!params.eduEndYear){
      that.validTips('请选择您的在校时间');
      return false;
    }
    if(new Date(that.data.eduExpData.eduStartDate)>new Date()){
      that.validTips('请选择正确的开始在校时间');
      return false;
    }
    if(this.data.eduExpData.eduEndYear==this.data.eduExpData.eduStartYear && this.data.eduExpData.eduEndMonth ==this.data.eduExpData.eduStartMonth){
      that.validTips('请选择正确的开始在校时间');
      return false; 
    }
    if(new Date(this.data.eduExpData.eduEndDate) < new Date(this.data.eduExpData.eduStartDate)){
      that.validTips('结束时间不能早于开始时间');
      return false; 
    }
    // 专业校验
    if(!params.major){
      that.validTips('请输入您的专业名称');
      return false;
    }
    resume.saveEduExp(params);
  },
  onLoad: function(options) {
    let that = this;
    app.onLogin(() => {
      that.toast = new app.Liepin.Toast(that);
      that.setData({
        today:that.getToday()
      });
      resume.getImproveInfo(eduExpData =>{
        that.setData({
          eduExpData: eduExpData
        });
        if(!eduExpData.eduLevel){
          that.setData({
            'eduExpData.eduLevel':'040',
            'eduExpData.eduLevelName':'本科'
          });
        }
        that.data.educationMap.forEach(function(val,ind){
          if(val.code == that.data.eduExpData.eduLevel){
            that.setData({
              eduLevelPickerIndex:ind
            });
          }
        });
        if(eduExpData.eduTZ === undefined){
          that.setData({
            'eduExpData.eduTZ':true
          });
        }
      });
    });
  }
});
