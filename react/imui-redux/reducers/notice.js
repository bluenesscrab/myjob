import {ActionType} from '../actions';

export const noticeInitialState = {
  noticeList:{},
  noticeDetail:null,
  unRead: false,
  firstLoaded:false,
  totalCnt:0,
  curPage: 0,
  sysMsgList:[],
  nomoreNotice: false
};


// export const noticeInitialState = {
//   totalCnt:0,
//   sysMsgList:{},
//   noticeDetail:null,
//   curPage: 0,
//   loading: false,
// };

export function noticeReducer(state = noticeInitialState, action){
  let i;
  switch (action.type){
    case ActionType.GET_NOTICELIST_START:
    case ActionType.GET_NOTICELIST_SUCC:
    case ActionType.GET_NOTICELIST_FAIL:
      return Object.assign({}, state, action.payload);
    case ActionType.DELETE_NOTICEITEM:
      i = state.sysMsgList.findIndex((v)=>v.id === action.payload);
      let newList = state.sysMsgList.slice(0,i).concat(state.sysMsgList.slice(i+1));
      return {...state,totalCnt:state.totalCnt,sysMsgList:newList};
    case ActionType.READ_NOTICE:
      state.sysMsgList.forEach((v,i) => {
        if(v.id === action.payload){
          v.readFlag = '1';
        }
      })
      return $.extend(true,{},state,{sysMsgList:state.noticeList})
    case ActionType.HASREAD_NOTICE:
      state.sysMsgList.forEach((v,i) => {
        if(v.id === action.payload.id){
          v.readFlag = '1';
        }
      })
      return $.extend(true,{},state,{index:action.payload.index,sysMsgList:state.sysMsgList})
    case ActionType.UNSELECT_NOTICE:
      return {...state,noticeDetail:action.payload};
    case ActionType.CHANGE_TABS_UNREAD:
      //改变当前tab红点状态
      if(action.payload.tab.key==='notice'){
        return Object.assign({}, state, {unRead: action.payload.status});       
      }
      else {
        return state;
      }
    default:
      return state;
  }
}