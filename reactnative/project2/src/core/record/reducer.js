import {ADD_RECORD, GET_RECORD_LIST} from './action-types';
import {LOCALSTORAGE_KEY as KEY} from '../../config';
import {MyStorage} from '../../util';

export const initialState = {
  recordList:{},
};

export function recordReducer(state = initialState, action){
  let newstate;
  switch (action.type){    
    case GET_RECORD_LIST:
      let newstate=Object.assign({}, state);
      newstate.recordList[action.payload.customerId]=action.payload.list;
      LT.storage.record=newstate;
      MyStorage.save(KEY, LT.storage);
      return newstate;
    default:
      return state;
  }
}
