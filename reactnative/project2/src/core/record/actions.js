import {ADD_RECORD,GET_RECORD_LIST} from './action-types';
import {MyFetch} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {replaceRouter, initRouter, pushRouter, resetRouter} from '../router/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';

export function addRecord({customerId, linkmanId, content, succCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/customer/savecustomertrack.json',
      data: {customerId, linkmanId, content, way:4},
      success: (data) => {
        dispatch(openTip('成功添加一条沟通记录！'));
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

export function getRecordList({customerId}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/customer/listcustomertrack.json',
      data: {customerId, myOrAll:-1, curPage:0, pageSize:1000},
      success: (data) => {
        dispatch({
          type: GET_RECORD_LIST,
          payload:{list:data.data.dataList, customerId}
        });
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