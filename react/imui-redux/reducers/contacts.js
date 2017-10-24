import {ActionType} from '../actions';

export const contactsInitialState = {
  firstLoaded: false,
  contacts:[],
  loading: false,
  curPage: 0,
  nomore: false,
};
//数组中元素置顶, 如果未找到，将目标元素放入数组第一个，返回一个新数组
function addToTop(list, item, condition) {
  let i = list.findIndex((v,i,arr)=>condition(v,i,arr));
  if (i === -1) {
    return [item].concat(list);
  }
  else{
    return [{...list[i], ...item}].concat(list.slice(0,i)).concat(list.slice(i+1));
  }
}

//替换数组中元素, 返回一个新数组
function updateList(list, item, condition) {
  let i = list.findIndex((v,i,arr)=>condition(v,i,arr));
  if (i === -1) {
    return list;
  }
  else{
    return list.slice(0,i).concat([{...list[i], ...item}]).concat(list.slice(i+1));
  }
}

export function contactsReducer(state = contactsInitialState, action){
  let i, contact, firstContact, newcontacts;
  switch (action.type){
    case ActionType.GET_CONTACTS_START:
    case ActionType.GET_CONTACTS_FAIL:
    case ActionType.GET_CONTACTS_SUCC:
      return Object.assign({}, state, action.payload);
    case ActionType.DELETE_CONTACT:
      contact = action.payload;
      i = state.contacts.findIndex((v)=>v.oppositeEmUserName === contact.oppositeEmUserName);
      return Object.assign({}, state, {
        contacts: state.contacts.slice(0,i).concat(state.contacts.slice(i+1)),
      });
    case ActionType.SELECT_CONTACT:
      newcontacts = updateList(state.contacts, {unRead: false}, (v)=>action.payload.contact.oppositeEmUserName === v.oppositeEmUserName);
      return Object.assign({}, state, {
        contacts: newcontacts,
      });
    case ActionType.UPDATE_CONTACTS_BY_RECEIVE_MSG:
      //置顶
      newcontacts = addToTop(state.contacts, action.payload, (v)=>v.oppositeEmUserName===action.payload.oppositeEmUserName);
      return Object.assign({}, state, {
        contacts: newcontacts
      });
    case ActionType.UPDATE_CONTACTS_BY_SEND_MSG:
      //置顶
      return Object.assign({}, state, {
        contacts: addToTop(state.contacts, {...action.payload.contact, ...action.payload.lastMsg}, (v)=>v.oppositeEmUserName===action.payload.contact.oppositeEmUserName)
      });

    default:
      return state;
  }
}