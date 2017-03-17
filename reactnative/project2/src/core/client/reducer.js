import {SELECT_CLIENT, CLEAR_LOCAL_HISTORY, CLEAR_SELECT_CLIENT, 
  SELECT_CONTACT, IF_CAN_ADD_OPPORTUNITY, INIT_CLIENT, SELECT_MANAGER} from './action-types';
import {LOCALSTORAGE_KEY as KEY, MAX_LOCALSTORAGE_HISTORY_LENGTH} from '../../config';
import {MyStorage} from '../../util';

export const initialState = {
  id:'',
  name:'',
  canAddOpp: {
    flag: true,
    msg: ''
  },
  contact:{name:'',id:0},
  manager:{name:'',id:0},
  history:[],
  employeeId:''
};


function addToArrayTop(arr, element){
  let index = arr.findIndex(function(value, index, arr) {
    return value.name === element.name;
  });
  if (index > -1) {
    arr.splice(index,1);
  }
  arr.unshift(element);
  if(arr.length>MAX_LOCALSTORAGE_HISTORY_LENGTH) arr.length=MAX_LOCALSTORAGE_HISTORY_LENGTH;
  return arr;
}

export function clientReducer(state = initialState, action){
  let history;
  let newstate;
  switch (action.type){
    case SELECT_CLIENT:
      history = state.history.slice(0);
      addToArrayTop(history, action.payload);
      newstate = Object.assign({}, initialState, action.payload, {history});
      LT.storage.client=newstate;
      MyStorage.save(KEY, LT.storage);
      return newstate;
    case CLEAR_LOCAL_HISTORY:
      newstate = Object.assign({}, state, {history:[]});
      LT.storage.client=newstate;
      MyStorage.save(KEY, LT.storage);
      return newstate;    
    case CLEAR_SELECT_CLIENT:
      newstate = Object.assign({}, state, {id:'', name:''});
      LT.storage.client=newstate;
      MyStorage.save(KEY, LT.storage);
      return newstate;        
    case SELECT_CONTACT:
      newstate = Object.assign({}, state, action.payload);
      LT.storage.client=newstate;
      MyStorage.save(KEY, LT.storage);  
      return newstate; 
    case SELECT_MANAGER:
      return  Object.assign({}, state, action.payload);
    case IF_CAN_ADD_OPPORTUNITY:
      return Object.assign({}, state, {canAddOpp: action.payload.canAddOpp});    
    case INIT_CLIENT:
      return initialState;
    default:
      return state;
  }
}
