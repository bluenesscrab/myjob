import {getLocalStorageKey} from '@liepin/imcore/constants';
import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import * as historyActions from './history';
import * as panelActions from './panel';
import {contactsApi} from '../api';
import {EventType} from '../constants';
import {createSendMsgByPlainMsg} from '@liepin/imcore/messages/send';
import {publish} from '../utils';

/*获得服务器端联系人列表*/
export function getContacts(imcore) {
  return async (dispatch, getState) => {
    try{
      let state = getState().contacts;
      if(state.loading || (state.firstLoaded && state.nomore)) return;
      
      dispatch({
        type: ActionType.GET_CONTACTS_START,
        payload: {loading: true}
      });

      let curPage = state.curPage;
      let pageContacts = await contactsApi.getContactList(imcore, curPage);
      let newPageContacts = [];
      if (!pageContacts) return;
     
      if(pageContacts.length){
        //去本地取联系人列表的初始红点
        const config = getConfig(imcore.env);
        const LSKey = getLocalStorageKey(imcore.userInfo.oppositeEmUserName);
        let unReadArr = await imcore.getLocalDataPromise(LSKey.CONTACTS_UNREAD);
        if (!Array.isArray(unReadArr)){
          unReadArr = [];
        }
        //红点信息合并入列表
        newPageContacts = pageContacts.map((v)=>{
          return {...v, unRead: unReadArr.indexOf(v.oppositeEmUserName)>-1};
        });
      }
      let newContacts = state.contacts.concat(newPageContacts);

      dispatch({
        type: ActionType.GET_CONTACTS_SUCC,
        payload: {contacts: newContacts, curPage: curPage+1, loading:false, nomore: pageContacts.length===0, firstLoaded: true}
      });

    }
    catch(e){
      dispatch({
        type: ActionType.GET_CONTACTS_FAIL,
        payload: {loading: false}
      });
      imcore.handleErr(e);
    }
  }
}

/*删除一个联系人*/
export function deleteContact(imcore, contact) {
  return async (dispatch, getState) => {
    let data = await pajax({url: getConfig(imcore.env).urls.removecontact, type:'post', data:{oppositeEmUserName: contact.oppositeEmUserName}});
    if(data.flag){
      dispatch(setUnReadContactsToLocal(imcore, contact.oppositeEmUserName, false));
      dispatch({
        type: ActionType.DELETE_CONTACT,
        payload: contact
      });
    }
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

      /*如果contacts还没有联系人列表，只记录红点*/
      if(!state.contacts.firstLoaded){
        /*如果该条消息是本人从app端发送的，那么也不需要记录红点，退出*/
        if(sender===imcore.userInfo.oppositeEmUserName) {
          return;
        }
        /*如果当前聊天窗口就是对话双方，不需要记录红点，退出*/
        if(state.panel.activeContact && state.panel.activeContact.oppositeEmUserName === sender){
          return;
        }
        /*记录红点*/
        recordUnRead(true);
        return;
      }

      /*如果该条消息是本人从app端发送的，那么需要操作的contact是receiver，但不需要记录红点*/
      if (sender===imcore.userInfo.oppositeEmUserName){
        sender = receiver;
      }     
      //当前联系人，要更新一下联系人列表，无需记录tab和panel红点
      if(state.panel.activeContact && state.panel.activeContact.oppositeEmUserName === sender){
        unRead = false;
        dispatch({
          type: ActionType.UPDATE_CONTACTS_BY_RECEIVE_MSG,
          payload: Object.assign(state.panel.activeContact, msg.getLastMsgFormat(), {unRead})
        });  
        return;
      }

      /*查找联系人列表*/
      newcontact = state.contacts.contacts.filter((v)=>v.oppositeEmUserName === sender);
      /*新联系人*/
      if(newcontact.length === 0){
        let newcontact = await contactsApi.getContactInfo(imcore, sender); 
        unRead = state.panel.activeContact === null ? true : (state.panel.activeContact.oppositeEmUserName === sender ? false : true);
        dispatch({
          type: ActionType.UPDATE_CONTACTS_BY_RECEIVE_MSG,
          payload: Object.assign(newcontact, msg.getLastMsgFormat(), {unRead})
        });
      }
      else{//旧联系人，看是否打开了聊天窗口
        unRead = true;
        dispatch({
          type: ActionType.UPDATE_CONTACTS_BY_RECEIVE_MSG,
          payload: Object.assign(newcontact[0], msg.getLastMsgFormat(), {unRead})
        });  
      }
      
      sender !== receiver && recordUnRead(unRead);

      function recordUnRead(unRead){
        /*如果当前panel关闭或者 contacts未选中，则设置panel和contacts上的红点*/
        if(getState().setting.setting.message){
          if(!state.panel.opened || state.panel.activeTab.key!=='contacts'){
            dispatch(panelActions.setUnReadTabsToLocal(imcore, 'contacts', true));
            !state.panel.opened && dispatch(panelActions.setPanelUnReadToLocal(imcore, true));
          }
        }
        /*需要记录当前联系人的红点到缓存中*/
        unRead && dispatch(setUnReadContactsToLocal(imcore, sender, unRead));
      }
    }
    catch(e){
      imcore.handleErr(e);
    }

  }
}

export function changeContactsBySendMsg(imcore, msg){
  //消息是发给当前激活的聊天对象的，只需要将当前contact的最后一条消息更新即可
  return (dispatch, getState) => {
    if(!getState().contacts.firstLoaded) return;
    let contact = getState().panel.activeContact;
    contact = {...contact, ...{unRead: false}};
    dispatch({
      type: ActionType.UPDATE_CONTACTS_BY_SEND_MSG,
      payload: {lastMsg:msg.getLastMsgFormat(), contact: contact}
    });
  }
}

export function setUnReadContactsToLocal(imcore, oppositeEmUserName, unRead){
  return async (dispatch, getState) => {
    const config = getConfig(imcore.env);
    const LSKey = getLocalStorageKey(imcore.userInfo.oppositeEmUserName);
    let unReadArr = await imcore.getLocalDataPromise(LSKey.CONTACTS_UNREAD);
    if (!Array.isArray(unReadArr)){
      unReadArr = [];
    }
    else{
      unReadArr = unReadArr.filter(v=>{if(v) return v;})
    }
    let i=unReadArr.indexOf(oppositeEmUserName);
    if(i>-1){//已有该用户记录，删除
      if(unRead===false){
        unReadArr.splice(i,1);
      }
    }  
    else{//新增
      unRead && unReadArr.push(oppositeEmUserName);
    }
    imcore.setLocalData(LSKey.CONTACTS_UNREAD, unReadArr);
  }
}