import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import * as contactsActions from './contacts';
import {historyContactsApi, contactsApi} from '../api';

/*获得历史联系人列表*/
export function getHistoryContactsList(imcore) {
  return async (dispatch, getState) => {
    let state = getState().historyContacts;
    if(state.loading || state.nomore) return;
    dispatch({
      type: ActionType.GET_HISTORYCONTACTS_START,
      payload: {loading: true}
    })
    try{
      let pageList = await historyContactsApi.getHistoryContactsAjax(imcore, state.curPage);
      !pageList.curMonthContacts && (pageList.curMonthContacts = []);
      !pageList.earlierContacts && (pageList.earlierContacts = []);
      dispatch({
        type: ActionType.GET_HISTORYCONTACTS_SUCC,
        payload: {pageList, loading: false, curPage: state.curPage+1, nomore: pageList.curMonthContacts.length+pageList.earlierContacts.length===0, firstLoaded: true}
      });
    }
    catch(e){
      dispatch({
        type: ActionType.GET_HISTORYCONTACTS_FAIL,
        payload: {loading: false}
      });
    }
  }
}


export function changeContactsBySendMsg(imcore, msg){
  //消息是发给当前激活的聊天对象的，只需要将当前historycontact的最后一条消息更新即可
  return async (dispatch, getState) => {
    if(!getState().historyContacts.firstLoaded) return;
    dispatch({
      type: ActionType.UPDATE_HISTORYCONTACTS_BY_SEND_MSG,
      payload: {lastMsg:msg.getLastMsgFormat(), contact: getState().panel.activeContact}
    });
  }
}

export function changeContactsByReceiveMsg(imcore, msg){
  return async (dispatch, getState) => {
    /*
      当前没有聊天窗口: 
      1，检查消息发送人是否在联系人列表里，
      2，不在的话ajax获得联系人资料
      3，将contact的最新联系人前置
      4，更新其最新消息
      5，并且给contacts和职聊icon加红点
    */
   /*
    lastEmMessageId:"301430994265702900"
    lastMessageContent:"{"ext":{"extType":1,"extBody":{"senderKind":"0","receiverKind":"2","sign":"e339b4e211a769a40fd97fbfd9f5f2c1","messageSource":0}},"bodies":[{"msg":"22","type":"txt"}]}"
    lastMessageTimestamp:1487747172421
    oppositeEmUserName:"4771341078v2696581264"
    oppositeMainUrl:"https://www.liepin.com/LT6736844"
    oppositeUserCompany: "万仕道（北京）管理咨询有限公司"
    oppositeUserId:6736844
    oppositeUserKind:"2"
    oppositeUserName:"linjing"
    oppositeUserPhoto:"54d04145bfe5cd930d8b019d01a.jpg"
    oppositeUserTitle:"寻访员(R)"*/

    try{
      let state = getState();
      let sender = msg.getFrom();
      let receiver = msg.getTo();
      let unRead;
      let newcontact;

      /*如果historyContacts还没有联系人列表，返回*/
      if(!state.historyContacts.firstLoaded){
        return;
      }
      /*如果该条消息是本人从app端发送的，那么需要操作的contact是receiver*/
      if (sender===imcore.userInfo.oppositeEmUserName){
        sender = receiver;
      }     
      /*查找联系人列表*/
      newcontact = state.historyContacts.curMonthContacts.concat(state.historyContacts.earlierContacts).filter((v)=>{return v.oppositeEmUserName === sender});
      /*新联系人*/
      if(newcontact.length===0){
        let data = await contactsApi.getContactInfo(imcore, sender); 
        if(data.flag){
          newcontact = data.data;
          dispatch({
            type: ActionType.UPDATE_HISTORYCONTACTS_BY_RECEIVE_MSG,
            payload: Object.assign(newcontact, msg.getLastMsgFormat())
          });
        }     
        else{
          imcore.handleErr(new Error(data.msg));
        }
      }
      else{//旧联系人
        dispatch({
          type: ActionType.UPDATE_HISTORYCONTACTS_BY_RECEIVE_MSG,
          payload: Object.assign(newcontact[0], msg.getLastMsgFormat())
        });  
      }
      
    }
    catch(e){
      imcore.handleErr(e);
    }

  }
}