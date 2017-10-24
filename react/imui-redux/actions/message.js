import {pajax} from '@liepin/imcore/utils';
import {createSendMsgByPlainMsg} from '@liepin/imcore/messages/send';
import getConfig from '../config';
import {messageApi} from '../api';
import {UserType} from '@liepin/imcore/constants';
import Dialog from '../common/Dialog';
/*
与各端各类型业务消息发送/接收有关的行为都在这里定义，
公共基础的消息处理在@liepin/imcore/messages/里定义
*/

export function sendMsg(imcore, msg, options={}) {
  return (dispatch, getState) => {
    let {inBlack, cansendErrMsg, checkFirst = true, success=()=>{}, fail=()=>{}} = options;
    if(checkFirst){//检测cansend
      inBlack = inBlack===undefined ? getState().shield.inBlack : inBlack;
      cansendErrMsg = cansendErrMsg===undefined ?  getState().panel.cansendErrMsg : cansendErrMsg;
      let contact = getState().panel.activeContact;
      if(messageApi.checkIfCansend(imcore, contact, inBlack, cansendErrMsg)){
        imcore.send(msg, success, fail);
      }
    }
    else{
      imcore.send(msg, success, fail);
    }
  }
}

export function resendMsg(imcore, message) {
  return (dispatch, getState) => {
    let msgList = getState().panel.sendList;
    let theMsg = msgList.find((v)=>v.id===message.id);
    let msg;
    if(theMsg){
      msg = createSendMsgByPlainMsg(theMsg);
      imcore.resend(msg);
    }
    else{
      actions.openToast("重新发送失败！");
    }
  }
}

/*c端：委托简历*/
export function cEntrustResume(imcore, oppositeEmUserName){
  return async (dispatch, getState) => {
    try{
      LT.Message = LT.Message || Apps.Message;
      LT.Message.entrustResume({id: oppositeEmUserName});
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}

