import {SEARCH_BY_KEY_SUCC, SEARCH_BY_KEY_FAIL, INIT_SEARCH} from './action-types';
import {MyFetch, MyStorage} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {replaceRouter, initRouter, pushRouter, resetRouter} from '../router/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';


export function searchByKey({customerName,curPage=0, succCallback, failCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/customer/listcustomername.json',
      data: {customerName,curPage,pageSize:20},
      success: data => {
        dispatch({
          type: SEARCH_BY_KEY_SUCC,
          payload: {thisPageData:data.data.dataList, page: curPage, more:curPage<data.data.totalPage-1}
        });  
        succCallback && succCallback();
      },
      fail: (data) => {
        dispatch({
          type: SEARCH_BY_KEY_FAIL,
          payload: {more:false, page:curPage}
        });  
        dispatch(openTip(data.msg));
        failCallback && failCallback();        
      },
      ifShowLoading:true
    }, {
      showLoading: () => dispatch(showLoading()), 
      hideLoading: () => dispatch(hideLoading()), 
      openTip: (msg) => dispatch(openTip(msg)),
      logout: () => dispatch(logout())
    });
  };
}

export function initSearch() {
  return (dispatch, getState) => {
    dispatch({
      type:INIT_SEARCH,
      payload:{}
    });
  }
}