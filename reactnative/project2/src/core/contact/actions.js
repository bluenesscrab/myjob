import {GET_CONTACT_SUCC, GET_CONTACT_FAIL} from './action-types';
import {MyFetch} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {replaceRouter, initRouter, pushRouter, resetRouter} from '../router/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';

export function getContact({customerId,curPage=0, succCallback, failCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/customer/listlinkmanname.json',
      data: {customerId, linkmanName:'', curPage, pageSize:20},
      success: (data) => {
        dispatch({
          type: GET_CONTACT_SUCC,
          payload:{thisPageData:data.data.dataList, page: curPage, more:curPage<data.data.totalPage-1}
        });
        succCallback && succCallback();
      },
      fail: () => {
        dispatch({
          type: GET_CONTACT_FAIL,
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
