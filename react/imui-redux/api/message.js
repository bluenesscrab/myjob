import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import {UserType} from '@liepin/imcore/constants';
import Dialog from '../common/Dialog';

//后端给出是否可以发送
export async function serverCanSend(imcore, oppositeEmUserName) {
  imcore.handleLog('check cansend-->')
  let data = await pajax({
    url: getConfig(imcore.env).urls.cansend,
    data: {
      oppositeEmUserName
    }
  });
  if(!data.flag) {
    if (data.code === '300050011') {
      return 'RESUME_NOT_COMPLETED';
    }
    else{
      return data.msg;
    }
  }
  else{
    return '';
  }
}

export function checkIfCansend(imcore, contact, inBlack, cansendErrMsg) {
  if(inBlack && contact.oppositeUserKind != UserType.USER_TYPE_B){
    let dialogText;
    if(imcore.env === 'c'){
      if(contact.oppositeUserKind == UserType.USER_TYPE_C){
        dialogText = '互为好友即可发送消息，请先添加好友！';
      } else if(contact.oppositeUserKind == UserType.USER_TYPE_H){
        dialogText = '该猎头顾问已被屏蔽，操作已被限制！';
      }
    } else if(imcore.env === 'b'){
      dialogText = '您将该候选人屏蔽了，无法发送消息！';
    }
    Dialog.alert({
      parent: 'chat',
      width: 300,
      text: dialogText 
    });
    return false;
  } 
  if(cansendErrMsg){
    if(cansendErrMsg ==='RESUME_NOT_COMPLETED'){
      Dialog.alert({
        parent: 'chat',
        width: 300,
        content: <p>您的简历尚未完善，为了保证双方沟通效率，请先<a href="https://c.liepin.com/resume/getdefaultresume/" target="_blank">完善您的简历</a></p>
      });
    }
    else{
      Dialog.alert({
        parent: 'chat',
        width: 300,
        text: cansendErrMsg 
      });          
    }      
    return false;
  }
  return true;
}