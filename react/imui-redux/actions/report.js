import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import {enums} from '../constants';
import {UserType} from '@liepin/imcore/constants';
import Dialog from '../common/Dialog';

export function setReport(code){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.REPORT_CODE,
      payload: code
    });
  }
}

export function showReportDialog(){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.REPORT_CODE,
      payload: 5
    });
    dispatch({
      type: ActionType.REPORT_DIALOG,
      payload: true
    });
  }
}

export function closeReportDialog(callback){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.REPORT_DIALOG,
      payload: false
    });
    callback && callback();
  }
}

export function addReport(imcore, activeContact, code, msgList, callback){
  return async (dispatch, getState) => {
    try{
      let userInfo = imcore.userInfo;
      let list = msgList.filter((v)=>v.data);
      let arr = [];
      
      list.slice(list.length-10).forEach(function(v,i){
        let str = '';
        if(v.from === userInfo.oppositeEmUserName){
          str += `${userInfo.oppositeUserName}:`;
        }else{
          str += `${activeContact.oppositeUserName}:`;
        }
        if(v.type === 'img'){
          str += `<img src="${v.data}" />`;
        } else if(v.type === 'txt'){
          str += v.data;
        }
        arr.push(encodeURIComponent(str));
      });

      let data = await pajax({
        url: getConfig(imcore.env).urls.reportChat,
        type: 'post',
        data: {
          targetUserId: activeContact.oppositeUserId,
          reportCode: code,
          msgsStr: arr.join(',')
        }
      });
      if(data.flag){
        dispatch({
          type: ActionType.REPORT_DIALOG,
          payload: false
        });
        Dialog.alert({
          parent: 'chat',
          onOk: ()=>{
            callback && callback();
          },
          width: 300,
          content: <p className="text-center">感谢您的举报，我会尽快处理！</p>  
        });
      } else {
        Dialog.alert({
          parent: 'chat',
          text: data.msg  
        });
      }
      
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}