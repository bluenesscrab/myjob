import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import {enums} from '../constants';
import {publish} from '../utils';

export function greetingShow(show){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.OPEN_SETGREETING,
      payload: show
    });
  }
};

export function greetingStatus(imcore){
  return (dispatch, getState) => {
    if(imcore.env != 'c') return false;
    dispatch({
      type: ActionType.SELECT_GREETING,
      payload: {
        greetingType: imcore.userInfo.chatSetting.sayHiType,
        greetingText: imcore.userInfo.chatSetting.sayHiText
      }
    });
  }
}

export function greetingList(imcore){
  return async (dispatch, getState) => {
    if(imcore.env != 'c') return false;
    try {
      let data = await pajax({url: getConfig(imcore.env).urls.getHiList});
      if(data.flag){
        dispatch({
          type: ActionType.SETGREETING_LIST,
          payload: data.data
        });
      }
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}

export function selectGreeting(imcore, code, name, application, greeting){
  return async (dispatch, getState) => {
    try {
      let data = await pajax({
        url: getConfig(imcore.env).urls.saveChatSetting,
        type: 'post',
        data: {
          chatApply: application,
          sayHi: greeting,
          sayHiType: code
        }
      });
      if(data.flag){
        // dispatch({
        //   type: ActionType.SELECT_GREETING,
        //   payload: {
        //     greetingType: code,
        //     greetingText: name
        //   }
        // });
        publish(imcore, dispatch, {
          type: ActionType.SELECT_GREETING,
          payload: {
            greetingType: code,
            greetingText: name
          }
        });
      }
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}