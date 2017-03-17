import {SELECT_CLIENT, CLEAR_LOCAL_HISTORY, CLEAR_SELECT_CLIENT, 
  SELECT_CONTACT, IF_CAN_ADD_OPPORTUNITY, INIT_CLIENT, SELECT_MANAGER} from './action-types';
import {MyFetch} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';

export function selectClient({name, id}) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_CLIENT,
      payload:{name, id}
    });    
  };
}

export function initClient() {
  return (dispatch, getState) => {
    dispatch({
      type: INIT_CLIENT,
      payload:{}
    });    
  };
}

export function clearLocalSearchHistory() {
  return {
    type: CLEAR_LOCAL_HISTORY,
    payload: {}  
  }
}

export function clearSelectClient() {
  return {
    type: CLEAR_SELECT_CLIENT,
    payload: {}  
  }
}


export function selectContact({contact, succCallback}) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_CONTACT,
      payload:contact
    });
    succCallback && succCallback();
  };
}

export function selectManager({manager, succCallback}) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_MANAGER,
      payload:manager
    });
    succCallback && succCallback();
  };
}

export function ifCanAddOpportunity({customerId, succCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/validatecustomer.json',
      data: {customerId},
      success: (data) => {
        dispatch({
          type: IF_CAN_ADD_OPPORTUNITY,
          payload:{canAddOpp:{flag:true,msg:''}}
        });
        succCallback && succCallback(data);
      },
      fail:(data) =>{
        dispatch({
          type: IF_CAN_ADD_OPPORTUNITY,
          payload:{canAddOpp:{flag:false,msg:data.msg}}
        });
      },
      ifShowLoading:true
    }, {
      showLoading: () => dispatch(showLoading()), 
      hideLoading: () => dispatch(hideLoading()), 
      openTip: (msg) => dispatch(openTip(msg)),
      logout: () => dispatch(logout())
    });
  }
}

