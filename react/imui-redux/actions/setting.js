import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import {enums} from '../constants';
import {publish} from '../utils';

//接收消息并提醒为false 需要$('.dot').addClass('hide')
//发送按键设置  需要在弹层里写

/*打开设置*/
export function settingShow(show){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.OPEN_SETTING,
      payload: !show
    });
  }
};

export function settingList(imcore){
  return (dispatch, getState) => {
    let messageStatus = LT.Cookie.get(enums.COOKIE_KEY_SETTING_MESSAGE)?eval(LT.Cookie.get(enums.COOKIE_KEY_SETTING_MESSAGE)):true,
      dialogStatus = LT.Cookie.get(enums.COOKIE_KEY_SETTING_DIALOG)?eval(LT.Cookie.get(enums.COOKIE_KEY_SETTING_DIALOG)):true
    let list = {
      message: messageStatus,
      dialog: dialogStatus,
      greeting: imcore.userInfo.chatSetting.sayHi,
      application: imcore.userInfo.chatSetting.chatApply
    } 

    dispatch({
      type: ActionType.SELECT_SETTING,
      payload: list
    });
  }
}

export function settingSelect(event, icon, setting, imcore, greetingType, tlogs){
  return async (dispatch, getState) => {
    try{
      let list = {};
      list[event] = icon;
      let settingData = $.extend(true, {}, setting, list);
      window.tlog = window.tlog || [];
      switch(event){
        case 'message':
          if(icon){
            tlog.push(tlogs.SELECT_REMIND);
          } else {
            tlog.push(tlogs.SELECT_NOREMIND);
          }
          LT.Cookie.set(enums.COOKIE_KEY_SETTING_MESSAGE, icon, 360, '/');
          break;
        case 'dialog':
          if(imcore.env !== 'h'){
            if(icon){
              tlog.push(tlogs.SELECT_DIALOG_ENTER);
            } else {
              tlog.push(tlogs.SELECT_DIALOG_CTRLENTER);
            }
          }
          LT.Cookie.set(enums.COOKIE_KEY_SETTING_DIALOG, icon, 360, '/');
          break;
        case 'greeting':
        case 'application':
          let data = await pajax({
            url: getConfig(imcore.env).urls.saveChatSetting,
            type: 'post',
            data: {
              chatApply: settingData.application,
              sayHi: settingData.greeting,
              sayHiType: greetingType
            }
          });
          break;
      }
      // dispatch({
      //   type: ActionType.SELECT_SETTING,
      //   payload: settingData
      // });
      publish(imcore, dispatch,  {
        type: ActionType.SELECT_SETTING,
        payload: settingData
      });
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}