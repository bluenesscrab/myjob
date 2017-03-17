import {MyFetch} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {replaceRouter, initRouter, pushRouter, resetRouter} from '../router/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';

export function getManager({managerName='', curPage=0, succCallback, failCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/listrpomanagername.json',
      data: {managerName, curPage, pageSize:20},
      success: (data) => {
        // dispatch({
        //   type: GET_MANAGER_SUCC,
        //   payload:{thisPageData:data.data.dataList, page: curPage, more:curPage<data.data.totalPage-1}
        // });
        succCallback && succCallback(data);
      },
      fail: (data) => {
        // dispatch({
        //   type: GET_MANAGER_FAIL,
        //   payload: {more:false, page:curPage}
        // });  
        dispatch(openTip(data.msg));
        failCallback && failCallback(data);        
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
