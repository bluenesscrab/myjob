import {MsgEvent, getLocalStorageKey, UserType} from '@liepin/imcore/constants';
import {createReceiveMsgByPlainMsg} from '@liepin/imcore/messages/receive';
import * as ActionType from './ActionType';
import * as contactsActions from './contacts';
import * as historyActions from './history';
import * as historyContactsActions from './historyContacts';
import * as noticeActions from './notice';
import * as snsActions from './sns';
import * as shieldActions from './shield';
import * as reportActions from './report';
import * as setGreetingActions from './setGreeting';
import {contactsApi, messageApi, hcoreApi} from '../api';
import {enums} from '../constants';
import getConfig from '../config';
import {publish} from '../utils';
import Dialog from '../common/Dialog';

export function panelReceiveMsg(imcore, msg) {
  return async (dispatch, getState) => {
    let formattedMsg = createReceiveMsgByPlainMsg(msg);
    /*收消息*/
    // dispatch({
    //   type: ActionType.PANEL_RECEIVE_MSG,
    //   payload: formattedMsg.getBody()
    // });
    publish(imcore, dispatch, {
      type: ActionType.PANEL_RECEIVE_MSG,
      payload: formattedMsg.getBody()
    });
    /*处理联系人列表、红点等*/
    dispatch(contactsActions.changeContactsByReceiveMsg(imcore, msg));
    // 历史联系人置顶
    dispatch(historyContactsActions.changeContactsByReceiveMsg(imcore, msg));
  }
}

/*发消息*/
export function panelSendMsg(imcore, msg) {
  return (dispatch, getState) => {
    // dispatch({
    //   type: ActionType.PANEL_SEND_MSG,
    //   payload: msg
    // });
    publish(imcore, dispatch, {
      type: ActionType.PANEL_SEND_MSG,
      payload: msg.getPublish()
    });
    /*处理联系人列表、红点等*/
    dispatch(contactsActions.changeContactsBySendMsg(imcore, msg));
    // 历史联系人置顶
    dispatch(historyContactsActions.changeContactsBySendMsg(imcore, msg));
  }
}

/*变更消息*/
export function panelUpdateMsg(imcore, msg) {
  return (dispatch, getState) => {
    // return {
    //   type: ActionType.PANEL_UPDATE_MSG,
    //   payload: msg
    // }
    publish(imcore, dispatch, {
      type: ActionType.PANEL_UPDATE_MSG,
      payload: msg
    });
  }
}

/*职聊连接消息*/
export function panelConnMsg(imcore, msg) {
  return (dispatch, getState) => {
    // dispatch({
    //   type: ActionType.PANEL_CONN_MSG,
    //   payload: msg
    // });
    publish(imcore, dispatch, {
      type: ActionType.PANEL_CONN_MSG,
      payload: msg
    });
  }
}

/*初始化panel*/
export function initPanel(imcore){
  return (dispatch, getState) => {
    const config = getConfig(imcore.env);
    let selectedTabKey = LT.Cookie.get(enums.COOKIE_KEY_CUR_TAB) || 'contacts';
    //选择默认tab
    let index = config.tabs.findIndex(v=>{
      return v.key===selectedTabKey
    });
    if(index===-1) index=0;
    dispatch(initTab(imcore, config.tabs[index]));
    //初始化unread红点
    dispatch(getUnReadFromLocal(imcore));
    dispatch(setGreetingActions.greetingStatus(imcore));
    dispatch(setGreetingActions.greetingList(imcore));
  }
}

export function initTab(imcore, tab) {
  return {
    type: ActionType.INIT_TAB,
    payload: tab
  }
}

/*选择tab*/
export function selectTab(imcore, tab) {
  return async (dispatch, getState) => {
    //将清当前tab红点并记缓存
    dispatch(setUnReadTabsToLocal(imcore, tab.key, false));
    if(tab.key==='contacts'){
      if(!getState().contacts.firstLoaded){
        dispatch(contactsActions.getContacts(imcore));
      }
      window.tlog = window.tlog || [];
      tlog.push(getConfig(imcore.env).tlogs.OPEN_CONTACTS);
    }
    else if(tab.key==='historycontacts'){
      !getState().historyContacts.firstLoaded && dispatch(historyContactsActions.getHistoryContactsList(imcore));      
      window.tlog = window.tlog || [];
      tlog.push(getConfig(imcore.env).tlogs.OPEN_HISTORYLIST);
    }
    else if(tab.key==='notice'){
      !getState().notice.firstLoaded && dispatch(noticeActions.getNoticeList(imcore));
      window.tlog = window.tlog || [];
      tlog.push(getConfig(imcore.env).tlogs.OPEN_NOTICE);
    }
    else if(tab.key==='sns'){
      dispatch(snsActions.getSnsList(imcore));
      window.tlog = window.tlog || [];
      tlog.push(getConfig(imcore.env).tlogs.OPEN_SNS);
    }
    LT.Cookie.set(enums.COOKIE_KEY_CUR_TAB, tab.key, 360, '/');
    dispatch({
      type: ActionType.SELECT_TAB,
      payload: tab
    });   
  }
}

export function selectTabByKey(imcore, tabkey){
  return async (dispatch, getState) => {
    let tabs = getConfig(imcore.env).tabs;
    let index = tabs.findIndex((v)=>v.key===tabkey);
    if(index>-1) dispatch(selectTab(imcore, tabs[index]));
  }
}
/*获取本地红点值*/
export function getUnReadFromLocal(imcore) {
  return async (dispatch, getState) => {
    /*检测是否提醒红点*/
    if(!getState().setting.setting.message){return;}

    const config = getConfig(imcore.env);
    const LSKey = getLocalStorageKey(imcore.userInfo.oppositeEmUserName);
    let unRead = await imcore.getLocalDataPromise(LSKey.PANEL_IS_READ_KEY);
    // dispatch({
    //   type: ActionType.SET_PANEL_UNREAD,
    //   payload: unRead
    // });
    publish(imcore, dispatch, {
      type: ActionType.SET_PANEL_UNREAD,
      payload: unRead
    });
    let tabsUnReadJson = await imcore.getLocalDataPromise(LSKey.TABS_UNREAD);
    if (!Array.isArray(tabsUnReadJson) || tabsUnReadJson.length!==config.tabs.length ){
      tabsUnReadJson = [false, false, false];
    }
    // dispatch({
    //   type: ActionType.SET_TABS_UNREAD,
    //   payload: tabsUnReadJson
    // });   
    publish(imcore, dispatch, {
      type: ActionType.SET_TABS_UNREAD,
      payload: tabsUnReadJson
    });      
  }
}

/*打开panel：清除红点*/
export function openPanel(imcore){
  return (dispatch, getState) => {
    const config = getConfig(imcore.env);
    //清除红点
    dispatch(setPanelUnReadToLocal(imcore, false));
    //选中某个tab
    setTimeout(()=>dispatch(selectTab(imcore, getState().panel.activeTab)), 500);
    dispatch({
      type: ActionType.OPEN_PANEL,
      payload: true
    });
  }
}

/*关闭panel*/
export function closePanel(imcore){
  return (dispatch, getState) => {
    // dispatch({
    //   type: ActionType.CLOSE_PANEL,
    //   payload: {opened: false}
    // });
    publish(imcore, dispatch, {
      type: ActionType.CLOSE_PANEL,
      payload: {opened: false}
    });
  }
}
//清除/设置缓存中的activeTab的红点
export function setUnReadTabsToLocal(imcore, tabkey, unRead) {
  return async (dispatch, getState) => {
    /*检测是否提醒红点*/
    if(!getState().setting.setting.message){return;}

    const config = getConfig(imcore.env);
    const LSKey = getLocalStorageKey(imcore.userInfo.oppositeEmUserName);
    let tabsUnReadArr = await imcore.getLocalDataPromise(LSKey.TABS_UNREAD);
    if (!Array.isArray(tabsUnReadArr) || tabsUnReadArr.length!==config.tabs.length ){
      tabsUnReadArr = [false, false, false];
    }
    let newTabsUnRead = config.tabs.map((v,i)=>{
      if(config.tabs[i].key===tabkey){
        return unRead;
      }
      else{
        return tabsUnReadArr[i];
      }
    });
    imcore.setLocalData(LSKey.TABS_UNREAD, newTabsUnRead);
    // dispatch({
    //   type: ActionType.SET_TABS_UNREAD,
    //   payload: newTabsUnRead
    // });  
    publish(imcore, dispatch, {
      type: ActionType.SET_TABS_UNREAD,
      payload: newTabsUnRead
    });  
  }
}

/*设置本地红点值*/
export function setPanelUnReadToLocal(imcore, unRead) {
  return (dispatch, getState) => {
    /*检测是否提醒红点*/
    if(!getState().setting.setting.message){return;}
    const LSKey = getLocalStorageKey(imcore.userInfo.oppositeEmUserName);
    imcore.setLocalData(LSKey.PANEL_IS_READ_KEY, unRead);//设置panel的红点状态至缓存
    // dispatch({
    //   type: ActionType.SET_PANEL_UNREAD,
    //   payload: unRead
    // });  
    publish(imcore, dispatch, {
      type: ActionType.SET_PANEL_UNREAD,
      payload: unRead
    });
  }
}

/*选择一个联系人*/
export function selectContact(imcore, contact, callback) {
  return async (dispatch, getState) => {
    try {

      if(typeof contact === 'string') {//oppositeEmUserName
        //补全contact
        contact = await contactsApi.getContactInfo(imcore, contact);
      }
      let setTlog = getConfig(imcore.env).tlogs,
        contactTlog;
      if(contact.oppositeUserKind == UserType.USER_TYPE_C){
        contactTlog = setTlog.OPEN_DIALOG_C;
      } else if(contact.oppositeUserKind == UserType.USER_TYPE_B){
        contactTlog = setTlog.OPEN_DIALOG_B;
      } else if(contact.oppositeUserKind == UserType.USER_TYPE_H){
        contactTlog = setTlog.OPEN_DIALOG_H;
      }
      window.tlog = window.tlog || [];
      tlog.push(contactTlog);

      let inBlackData;
      let attentionData;
      let inBlack = getState().shield.inBlack;
      let cansendErrMsg = getState().panel.cansendErrMsg;

      let activeContact = getState().panel.activeContact;
      if(!activeContact || activeContact.oppositeEmUserName !== contact.oppositeEmUserName){ 
        dispatch({
          type: ActionType.SELECT_CONTACT_START,
          payload: {loadingActiveContact:true}
        });
        Dialog.closeAllConfirm({parent: 'chat'});
        cansendErrMsg = await messageApi.serverCanSend(imcore, contact.oppositeEmUserName);     
        if(imcore.env==='b' ||  imcore.env==='c') {
          inBlackData = await shieldActions.inBlackStatusAjax(imcore, contact);
          if(inBlackData.flag){
            if(imcore.env==='b'){
              if(inBlackData.data.rejectStatus === 0 || inBlackData.data.rejectStatus === 2){
                inBlack = false;
              } else {
                inBlack = true;
              }
            }else if(imcore.env==='c'){
              inBlack = inBlackData.data.inBlack;
            }
            // dispatch({
            //   type: ActionType.INBLACK_STATUS,
            //   payload: inBlack
            // });
            publish(imcore, dispatch, {
              type: ActionType.INBLACK_STATUS,
              payload: inBlack
            });
          }
        }
        // dispatch({
        //   type: ActionType.SELECT_CONTACT,
        //   payload: {contact, cansendErrMsg, loadingActiveContact: false}
        // }); 
        if(imcore.env.toLowerCase()==='h'){
          attentionData = await hcoreApi.isAttention(imcore,contact.oppositeEmUserName);
          contact.isAttention = attentionData.isAttention;
          contact.usercEncodeId = attentionData.usercEncodeId;
        } 
        imcore.event.trigger('selectContact',[contact]);
        publish(imcore, dispatch, {
          type: ActionType.SELECT_CONTACT,
          payload: {contact, cansendErrMsg, loadingActiveContact: false}
        });
        dispatch(contactsActions.setUnReadContactsToLocal(imcore, contact.oppositeEmUserName, false))
        dispatch(historyActions.getInitialServerHistory(imcore, contact));
        dispatch(historyActions.hideHistory(imcore));
        callback && callback(cansendErrMsg, contact, inBlack);
      }
      else{
        callback && callback(cansendErrMsg, contact, inBlack);
      }      
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}

/*关闭聊天窗口，取消选择一个联系人*/
export function unselectActiveContact(imcore) {
  return (dispatch, getState) => {    
    dispatch(historyActions.clearInitialServerHistory(imcore));
    // dispatch({
    //   type: ActionType.UNSELECT_ACTIVE_CONTACT,
    //   payload: null
    // });
    publish(imcore, dispatch, {
      type: ActionType.UNSELECT_ACTIVE_CONTACT,
      payload: null
    });
  }
}


/*按传入的方法更新msglist*/
export function updateMsgList(imcore, updateFunc) {
  return (dispatch, getState) => {
    // dispatch({
    //   type: ActionType.UPDATE_MSGLIST,
    //   payload: updateFunc(getState().panel.msgList)
    // });
    publish(imcore, dispatch, {
      type: ActionType.UPDATE_MSGLIST,
      payload: updateFunc(getState().panel.msgList)
    });
  }
} 


/* 更新关注状态*/
export function updateHattention(imcore,isAttention) {
  return (dispatch, getState) => {
    let contact = {...getState().panel.activeContact};
    contact.isAttention = isAttention
    publish(imcore, dispatch, {
      type: ActionType.UPDATE_ATTENTION,
      payload: {contact}
    });
  }
}