import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import * as panelActions from './panel';

/*获得服务器端通知列表*/
export function getNoticeList(imcore,isNewSys) {
  return async (dispatch, getState) => {
    try{
      let state = getState().notice;
      if(state.loading || state.nomoreNotice) return;
      dispatch({
        type: ActionType.GET_NOTICELIST_START,
        payload: {loading: true}
      });
      let curPage = state.curPage;
      let data = await pajax({url: getConfig(imcore.env).urls.getsysmsglist4im + '?curPage='+curPage});
      if(data.flag){
        let sysList = data.data.sysMsgList;
        let newSysList=[];
        if(sysList.length){
          if(isNewSys){
            newSysList = sysList;
          }else{
            newSysList = state.sysMsgList.concat(sysList);
          }
          dispatch({
            type: ActionType.GET_NOTICELIST_SUCC,
            payload:{sysMsgList:newSysList, totalCnt:data.data.totalCnt, curPage: curPage+1, loading:false, nomoreNotice: sysList.length===0, firstLoaded: true}
          });
        }
      }
      else{
        dispatch({
          type: ActionType.GET_NOTICELIST_FAIL,
          payload: {loading: false,failMsg:data.msg}
        });
      }
    }
    catch(e){
      dispatch({
        type: ActionType.GET_NOTICELIST_FAIL,
        payload: {loading: false}
      });
      imcore.handleErr(e);
    }
  }
}

/*删除一个通知*/
export function deleteNoticeItem(imcore,id,type) {
  return async (dispatch, getState) => {
    try{
      let data = await pajax({url: getConfig(imcore.env).urls.delsysmessagebyid + '?msgid='+ id +'&messageType='+type});
      if(data.flag){
        dispatch({
          type: ActionType.DELETE_NOTICEITEM,
          payload: id
        });
      }
    }
    catch(e){
      imcore.handleErr(e)
    }
  }
}

/*选择一个通知*/
export function hasReadNotice(imcore,notice,index) {
  return async (dispatch,getState)=>{
    try{
      let data = await pajax({url: getConfig(imcore.env).urls.readedmessagebyid + '?msgid='+ notice.id +'&messageType='+notice.type});
      if(data.flag){
        dispatch({
          type: ActionType.HASREAD_NOTICE,
          payload: {
            index:index,
            id:notice.id
          }
        });
      }
    }
    catch(e){
      imcore.handleErr(e)
    }
  }
}

/* 显示通知tab上的小红点*/
export function showNoticeTabUnread(imcore) {
  return (dispatch, getState) => {
    let state = getState();
    if(!state.panel.opened || state.panel.activeTab.key!=='notice'){//设置tab上的红点
      dispatch(panelActions.setUnReadTabsToLocal(imcore, 'notice', true));
      dispatch(panelActions.setPanelUnReadToLocal(imcore, true));
    }
  }
}


