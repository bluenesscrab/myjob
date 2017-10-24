import {ActionType} from '../actions';
import {createSendMsgByPlainMsg} from '@liepin/imcore/messages/send';

export const panelInitialState = {
  msgList:[],//动态收发的消息
  sendList: [],
  activeTab: null,
  activeContact: null,
  unRead: false,
  unReadTabs: [false, false, false],
  opened: false,
  cansendErrMsg: '',
  loadingActiveContact:false,
};

export function panelReducer(state = panelInitialState, action){
  let sendMsg, msgList;

  switch (action.type){

    case ActionType.PANEL_RECEIVE_MSG:
      return Object.assign({}, state, {msgList:state.msgList.concat(action.payload)});

    case ActionType.PANEL_SEND_MSG:
      sendMsg = createSendMsgByPlainMsg(action.payload);
      return Object.assign({}, state, {
        msgList: state.msgList.concat(sendMsg.getStorageBody()),
        sendList: state.sendList.concat(sendMsg)
      });

    case ActionType.PANEL_UPDATE_MSG:
      msgList = state.msgList.map((v,i)=>{
        if(v.id===action.payload.id){
          return action.payload;
        }
        else{
          return v;
        }
      });
      return Object.assign({}, state, {msgList});

    case ActionType.PANEL_CONN_MSG: //连接状态错误显示
      msgList = state.msgList.slice(0);
      return Object.assign({}, state, {msgList: msgList.concat(action.payload)});

    case ActionType.INIT_TAB:
    case ActionType.SELECT_TAB:
      return Object.assign({}, state, {activeTab: action.payload});
    
    case ActionType.SELECT_CONTACT_START://注意要清空msgList
      return Object.assign({}, state, action.payload);
    case ActionType.UPDATE_ATTENTION:
      return Object.assign({}, state, {activeContact: action.payload.contact});
    case ActionType.SELECT_CONTACT://注意要清空msgList
      return Object.assign({}, state, {activeContact: action.payload.contact, msgList:[], cansendErrMsg:action.payload.cansendErrMsg, loadingActiveContact: false});

    case ActionType.UNSELECT_ACTIVE_CONTACT:
      return Object.assign({}, state, {activeContact: null, cansendErrMsg:'', loadingActiveContact:false});

    case ActionType.SELECT_CONTACT_CANSEND_ERR:
      return Object.assign({}, state, {cansendErrMsg: action.payload});

    case ActionType.OPEN_PANEL:
      return Object.assign({}, state, {opened: true});

    case ActionType.CLOSE_PANEL:
      return Object.assign({}, state, {opened: false});

    case ActionType.SET_TABS_UNREAD: //设置tabs的红点
      return Object.assign({}, state, {unReadTabs: action.payload});

    case ActionType.SET_PANEL_UNREAD://清除/设置panel红点
      return Object.assign({}, state, {unRead: action.payload});

    case ActionType.UPDATE_MSGLIST: //更新msgList
      if(action.payload){
        return Object.assign({}, state, {msgList: action.payload});
      }
      else{
        return state;
      }
    default:
      return state;
  }
}