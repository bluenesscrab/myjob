import {HistoryMsg} from '@liepin/imcore/messages/history';
import {MsgEvent} from '@liepin/imcore/constants';
import {enums} from '../constants';
import * as ActionType from './ActionType';
import getConfig from '../config';
import {historyApi} from '../api';
import {publish} from '../utils';

export function showHistory(imcore) {
  return {
    type: ActionType.SHOW_HISTORY,
    payload: {visible: true, serverHistory:[], lastmsgid:-1 , nomore:false}
  }
}

export function hideHistory(imcore) {
  return {
    type: ActionType.SHOW_HISTORY,
    payload: {visible: false}
  }
}

export function getServerHistory(imcore, targetDetail) {
  return async (dispatch, getState) => {
    /*去服务器取n条历史信息*/
    try{
      dispatch({
        type: ActionType.GET_SERVER_HISTORY_STARTED,
        payload: {loading: true}
      });
      let list = await historyApi.getHistoryFromServer(imcore, getState().panel.activeContact.oppositeEmUserName, getState().history.lastmsgid, enums.HISTORY_PAGESIZE);
      let nomore=getState().history.nomore;
      let newLastmsgid = -1;
      if(list.length > 0){
        newLastmsgid = list[list.length-1].messageId-1;
        if(list.length===enums.HISTORY_PAGESIZE){
          nomore=false;
        }
        else{
          nomore=true;
        }
      }
      else{
        nomore=true;
      }
      //并倒序, 组装，去除不能显示的项,
      list = list.reverse();
      let formattedServerHistory = [];

      for (let history of list){
        let newMsg = new HistoryMsg().set({msg: history, targetDetail, userDetail: imcore.userInfo});
        let formatted = (await newMsg.fillInfo(imcore)).getDetailFormat();
        formatted.visible && formattedServerHistory.push(formatted);
      }
      // dispatch({
      //   type: ActionType.GET_SERVER_HISTORY_SUCCESS,
      //   payload: {newpage:formattedServerHistory, lastmsgid: newLastmsgid, loading:false, nomore}
      // });
      publish(imcore, dispatch, {
        type: ActionType.GET_SERVER_HISTORY_SUCCESS,
        payload: {newpage:formattedServerHistory, lastmsgid: newLastmsgid, loading:false, nomore}
      });
    }
    catch(e){
      imcore.handleErr(e);
      dispatch({
        type: ActionType.GET_SERVER_HISTORY_FAILED,
        payload: {loading: false}
      });
    }
  }
}

export function getInitialServerHistory(imcore, targetDetail) {
  return async (dispatch, getState) => {
    /*去服务器取若干条历史信息*/
    try{
      dispatch({
        type: ActionType.GET_INITIAL_SERVER_HISTORY_START,
        payload:null
      });
      let list = await historyApi.getHistoryFromServer(imcore, targetDetail.oppositeEmUserName, -1, 30);
      list = list.reverse();
      let formattedServerHistory = [];

      for (let history of list){
        let newMsg = new HistoryMsg().set({msg: history, targetDetail, userDetail: imcore.userInfo});
        let formatted = (await newMsg.fillInfo(imcore)).getDetailFormat();
        formatted.visible && formattedServerHistory.push(formatted);
      }

      /*本地取缓存消息，与server历史消息合并，以server为准*/
      let storageList = await imcore.getTargetLocalHistory(targetDetail.oppositeEmUserName);
      
      formattedServerHistory = formattedServerHistory.concat(storageList);
      formattedServerHistory = LT.Array.unique(formattedServerHistory, (a,b) => a.sign === b.sign);
      //倒序
      
      formattedServerHistory.sort((a,b)=>a.timestamp>b.timestamp?1:-1);
      
      // dispatch({
      //   type: ActionType.GET_INITIAL_SERVER_HISTORY,
      //   payload: formattedServerHistory
      // });
        
      publish(imcore, dispatch, {
        type: ActionType.GET_INITIAL_SERVER_HISTORY,
        payload: formattedServerHistory
      });
    }
    catch(e){
      dispatch({
        type: ActionType.GET_INITIAL_SERVER_HISTORY_FAIL,
        payload: null
      });
      imcore.handleErr(e);
    }
  }
}

export function clearInitialServerHistory(imcore) {
  return {
    type: ActionType.CLEAR_INITIAL_SERVER_HISTORY,
    payload: null
  }
}

/*按传入的方法更新initialServerHistory*/
export function updateInitialServerHistory(imcore, updateFunc) {
  return (dispatch, getState) => {
    // dispatch({
    //   type: ActionType.UPDATE_INITIAL_SERVER_HISTORY,
    //   payload: updateFunc(getState().history.initialServerHistory)
    // });
    publish(imcore, dispatch, {
      type: ActionType.UPDATE_INITIAL_SERVER_HISTORY,
      payload: updateFunc(getState().history.initialServerHistory)
    });
  }
} 