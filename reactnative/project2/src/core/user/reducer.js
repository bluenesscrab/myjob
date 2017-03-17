import {LOGIN_SUCC, LOGOUT, LOGIN_FAIL} from './action-types';
import {MyStorage} from '../../util';
import {LOCALSTORAGE_KEY as KEY} from '../../config';

export const initialState = {
  employeeId: 0,
  username: '',
  token: '',
};

export function userReducer(state = initialState, action){
  switch (action.type){
    case LOGIN_SUCC:
      let {employeeId, username, token} = action.payload;
      //更换用户的情况下，清空本地缓存
      if(LT.storage.user && LT.storage.user.employeeId && LT.storage.user.employeeId !==employeeId){
        LT.storage={};
      }
      LT.storage.user={employeeId, username, token};
      MyStorage.save(KEY, LT.storage);
      return Object.assign({}, state, action.payload);
    case LOGIN_FAIL:
      if(typeof LT.storage.user ==='undefined'){
        LT.storage.user=initialState;
      }
      else{
        LT.storage.user.token='';
      }
      MyStorage.save(KEY, LT.storage);
      return Object.assign({}, state, initialState);    
    case LOGOUT: 
      if(typeof LT.storage.user ==='undefined'){
        LT.storage.user=initialState;
      }
      else{
        LT.storage.user.token='';
      }
      MyStorage.save(KEY, LT.storage);  
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}


