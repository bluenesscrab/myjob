import {ADD_OPPORTUNITY, GET_OPPORTUNITY_LIST, UPDATE_OPPORTUNITY} from './action-types';
import {LOCALSTORAGE_KEY as KEY} from '../../config';
import {MyStorage} from '../../util';

export const initialState = {
  opportunityList:{},
};

export function opportunityReducer(state = initialState, action){
  let newstate;
  switch (action.type){    
    case ADD_OPPORTUNITY:
      return Object.assign({}, state, action.payload);
    case GET_OPPORTUNITY_LIST:
      newstate=Object.assign({}, state);
      newstate.opportunityList[action.payload.customerId]=action.payload.list;
      LT.storage.opportunity=newstate;
      MyStorage.save(KEY, LT.storage);
      return newstate;
    case UPDATE_OPPORTUNITY:
      let update ;
      if(action.payload.status===8){//丢单
        update={
          processStatus: action.payload.status,
          processStatusName: '丢单',
          isFinish:1
        }
      }
      else if(action.payload.status===9){//取消
        update={
          processStatus: action.payload.status,
          processStatusName: '取消',
          isFinish:1
        }
      }
      let newOpps = state.opportunityList[action.payload.customerId].map((v,i)=>{
        if(v.id===action.payload.opportunityId) return Object.assign({}, v, update);
        return v;
      });
      newState = Object.assign({}, state);
      newState.opportunityList[action.payload.customerId] = newOpps;
      LT.storage.opportunity=newstate;
      MyStorage.save(KEY, LT.storage);
      return newState;
    default:
      return state;
  }
}
