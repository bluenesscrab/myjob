import {ADD_OPPORTUNITY, GET_OPPORTUNITY_LIST, UPDATE_OPPORTUNITY} from './action-types';
import {MyFetch} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';

export function addOpportunity({inputdata, succCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/save.json',
      data: inputdata,
      success: (data) => {
        dispatch({
          type: ADD_OPPORTUNITY,
          payload:{}
        });
        dispatch(openTip('成功添加一条商机！'));
        succCallback && succCallback();
      },
      fail:(data)=>{
        dispatch(openTip(data.msg));
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


export function getOpportunityProcess({bizCategory, succCallback}){
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/getprocess.json',
      data: {bizCategory},
      success: (data) => {
        succCallback && succCallback(data);
      },
    }, {
      showLoading: () => dispatch(showLoading()), 
      hideLoading: () => dispatch(hideLoading()), 
      openTip: (msg) => dispatch(openTip(msg)),
      logout: () => dispatch(logout())
    });
  }
}

export function updateOpportunity({opportunityId, status, reason="", customerId, succCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/updatestatus.json',
      data: {opportunityId, processStatus: status, giveupReason: reason},
      success: (data) => {
        dispatch({
          type: UPDATE_OPPORTUNITY,
          payload:{opportunityId, status, customerId}
        });
        let msg =  status===8 ? '已将商机状态设为丢单！' : '已取消商机！';
        dispatch(openTip(msg));
        succCallback && succCallback();
      },
      fail:(data)=>{
        dispatch(openTip(data.msg));
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

export function getOpportunityList({customerId, succCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/list.json',
      data: {customerId},
      success: (data) => {
        dispatch({
          type: GET_OPPORTUNITY_LIST,
          payload:{list:data.data.dataList, customerId}
        });
        succCallback && succCallback();
      },
      fail: (data)=>{
        dispatch(openTip(data.msg));
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
