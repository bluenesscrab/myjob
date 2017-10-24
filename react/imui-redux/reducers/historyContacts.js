import {ActionType} from '../actions';

export const initialState = {
  firstLoaded: false,//第一次加载完毕
  curMonthContacts: [],
  earlierContacts: [],
  loading: false,
  curPage: 0,
  nomore: false,
};


//两个数组，目标元素如果在第一个数组中，进行置顶, 如果在第二个数组中，删除并在第一个中置顶, 都不在，则只置顶第一个
function addToTop(list1, list2, item, condition) {
  let index1 = list1.findIndex((v,i,arr)=>condition(v,i,arr));
  let index2 = list2.findIndex((v,i,arr)=>condition(v,i,arr));
  if (index1 > -1 ) {
    return {
      curMonthContacts: [{...list1[index1], ...item}].concat(list1.slice(0,index1)).concat(list1.slice(index1+1)),
    }
  }
  else if(index2 > -1){
    return {
      curMonthContacts: [{...list2[index2], ...item}].concat(list1),
      earlierContacts: list2.slice(0,index2).concat(list2.slice(index2+1)),
    }
  }
  else {
    return {
    }
  }
}


export function historyContactsReducer(state = initialState, action){
  let pageList, contact, indexCur, indexEarly;
  switch (action.type){

    case ActionType.GET_HISTORYCONTACTS_START:
    case ActionType.GET_HISTORYCONTACTS_FAIL:
      return Object.assign({}, state, action.payload);

    case ActionType.GET_HISTORYCONTACTS_SUCC:
      pageList = action.payload.pageList;
      return Object.assign({}, state, {
        curMonthContacts: state.curMonthContacts.concat(pageList.curMonthContacts),
        earlierContacts: state.earlierContacts.concat(pageList.earlierContacts),
        loading: action.payload.loading,
        curPage: action.payload.curPage,
        nomore: action.payload.nomore,
        firstLoaded: true
      });

    case ActionType.DELETE_CONTACT:
      contact = action.payload;
      indexCur = state.curMonthContacts.findIndex((v)=>v.oppositeEmUserName === contact.oppositeEmUserName);
      indexEarly = state.earlierContacts.findIndex((v)=>v.oppositeEmUserName === contact.oppositeEmUserName);
      if(indexCur===-1 && indexEarly===-1){
        return state;
      }
      if(indexCur>-1){
        return Object.assign({}, state, {
          curMonthContacts: state.curMonthContacts.slice(0,indexCur).concat(state.curMonthContacts.slice(indexCur+1))
        });
      }
      if(indexEarly>-1){
        return Object.assign({}, state, {
          earlierContacts: state.earlierContacts.slice(0,indexEarly).concat(state.earlierContacts.slice(indexEarly+1))
        });
      }
    case ActionType.UPDATE_HISTORYCONTACTS_BY_SEND_MSG:
      //置顶
      return Object.assign({}, state, addToTop(state.curMonthContacts, state.earlierContacts, {...action.payload.contact,...action.payload.lastMsg}, (v)=>v.oppositeEmUserName===action.payload.contact.oppositeEmUserName));    
    case ActionType.UPDATE_HISTORYCONTACTS_BY_RECEIVE_MSG:
      //置顶
      return Object.assign({}, state, addToTop(state.curMonthContacts, state.earlierContacts,  action.payload, (v)=>v.oppositeEmUserName===action.payload.oppositeEmUserName));  
    default:
      return state;
  }
}