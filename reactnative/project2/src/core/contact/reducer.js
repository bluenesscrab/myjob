import {GET_CONTACT_SUCC, GET_CONTACT_FAIL} from './action-types';

export const initialState = {
  contactList: [],
  more: false,
  page: 0,
};

export function contactReducer(state = initialState, action){
  switch (action.type){
    case GET_CONTACT_FAIL:
      return Object.assign({}, state, action.payload);
    case GET_CONTACT_SUCC:
      let {thisPageData, more, page} = action.payload;
      if(page===0){
        return Object.assign({}, state, {more, page, contactList:thisPageData});
      }
      return Object.assign({}, state, {more, page, contactList:state.contactList.concat(thisPageData)});
    default:
      return state;
  }
}


