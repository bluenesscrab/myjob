import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import {enums} from '../constants';
import {UserType} from '@liepin/imcore/constants';
import Dialog from '../common/Dialog';
import {publish} from '../utils';

export function inBlackStatusAjax(imcore, activeContact){
  let data = {};
  if(imcore.env === 'c'){
    data = {targetUserId: activeContact.oppositeUserId};
  } else if(imcore.env === 'b'){
    data = {usercId: activeContact.oppositeUserId};
  }
  return pajax({
    url: getConfig(imcore.env).urls.infoBetweenUsers,
    type: 'post',
    data: data
  });
}

// export function inBlackStatus(imcore, activeContact){
//   return async (dispatch, getState) => {
//     try{
//       let data = await pajax({
//         url: getConfig(imcore.env).urls.infoBetweenUsers,
//         type: 'post',
//         data: {
//           targetUserId: activeContact.oppositeUserId
//         }
//       });
//       dispatch({
//         type: ActionType.INBLACK_STATUS,
//         payload: data.data.inBlack
//       });
//     }
//     catch(e){
//       imcore.handleErr(e);
//     }
//   }
// }

export function openDialog(){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.INBLACK_DIALOG,
      payload: true 
    });
  }
}

export function closeDialog(){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.INBLACK_DIALOG,
      payload: false
    });
  }
}

export function addBlack(imcore, activeContact, inBlack, callback){
  return async (dispatch, getState) => {
    try{
      let userId = activeContact.oppositeUserId,
        cookie = LT.Cookie.get(enums.COOKIE_KEY_SHIELD)?eval(LT.Cookie.get(enums.COOKIE_KEY_SHIELD)):false,
        ajaxData = {},
        url;

      if(imcore.env === 'c'){
        if(activeContact.oppositeUserKind == UserType.USER_TYPE_C){
          url = getConfig(imcore.env).urls.addCBl;
          ajaxData = {
            usercId: userId
          };
        } else if(activeContact.oppositeUserKind == UserType.USER_TYPE_H){
          url = getConfig(imcore.env).urls.aadduserhblacklist;
          ajaxData = {
            userHId: userId
          };
        }
      } else if(imcore.env === 'b') {
        url = getConfig(imcore.env).urls.rejectreceivemsg;
        ajaxData = {
          usercId: userId
        };
      }
      
      let data = await pajax({
        url: url,
        type: 'post',
        data: ajaxData
      });
      if(data.flag){
        // dispatch({
        //   type: ActionType.INBLACK_DIALOG,
        //   payload: false
        // });
        publish(imcore, dispatch, {
          type: ActionType.INBLACK_DIALOG,
          payload: false
        });
        callback && callback();
        Dialog.alert({
          parent: 'chat',
          text: '屏蔽成功！' 
        });
      } else {
        dispatch({
          type: ActionType.INBLACK_DIALOG,
          payload: false
        });
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

export function removeBlack(imcore, activeContact, inBlack, callback){
  return async (dispatch, getState) => {
    try{
      let userId = activeContact.oppositeUserId,
        ajaxData = {},
        url;

      if(imcore.env === 'c'){
        if(activeContact.oppositeUserKind == UserType.USER_TYPE_C){
          url = getConfig(imcore.env).urls.removeCBl;
          ajaxData = {
            usercId: userId
          };
        } else if(activeContact.oppositeUserKind == UserType.USER_TYPE_H){
          url = getConfig(imcore.env).urls.removeuserhblacklist;
          ajaxData = {
            userHId: userId
          };
        }
      } else if(imcore.env === 'b'){
        url = getConfig(imcore.env).urls.cancelrejectreceivemsg;
        ajaxData = {
          usercId: userId
        };
      }
      
      // dispatch({
      //   type: ActionType.INBLACK_DIALOG,
      //   payload: false
      // });
      publish(imcore, dispatch, {
        type: ActionType.INBLACK_DIALOG,
        payload: false
      });
      let data = await pajax({
        url: url,
        type: 'post',
        data: ajaxData
      });
      if(data.flag){
        callback && callback();
        Dialog.alert({
          parent: 'chat',
          text: '已解除屏蔽！'
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

export function changeText(imcore, inBlack){
  return (dispatch, getState) => {
    // dispatch({
    //   type: ActionType.INBLACK_DIALOG,
    //   payload: false
    // });
    // dispatch({
    //   type: ActionType.INBLACK_STATUS,
    //   payload: !inBlack
    // });
    
    publish(imcore, dispatch, {
      type: ActionType.INBLACK_DIALOG,
      payload: false
    });
    publish(imcore, dispatch, {
      type: ActionType.INBLACK_STATUS,
      payload: !inBlack
    });
  }
}