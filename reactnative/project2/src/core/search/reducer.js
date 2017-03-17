import {INIT_SEARCH, SEARCH_BY_KEY_SUCC, SEARCH_BY_KEY_FAIL} from './action-types';

export const initialState = {
  related: [],
  more: false,
  page: 0,
};

export function searchReducer(state = initialState, action){
  switch (action.type){
    case INIT_SEARCH:
      return initialState;
    case SEARCH_BY_KEY_FAIL:
      return Object.assign({}, state, action.payload);
    case SEARCH_BY_KEY_SUCC:
      let {thisPageData, more, page} = action.payload;
      if(page===0){
        return Object.assign({}, state, {more, page, related:thisPageData});
      }
      return Object.assign({}, state, {more, page, related:state.related.concat(thisPageData)});
    default:
      return state;
  }
}


