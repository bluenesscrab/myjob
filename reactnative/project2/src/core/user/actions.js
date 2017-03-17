import {LOGIN_SUCC, LOGIN_FAIL, LOGOUT} from './action-types';
import {showLoading, hideLoading} from '../overlay/actions';
import {replaceRouter, initRouter, pushRouter, resetRouter} from '../router/actions';
import {openTip} from '../tip/actions';
import {initClient} from '../client/actions';
import {MyFetch, MyStorage, md5} from '../../util';
import {LOCALSTORAGE_KEY as KEY} from '../../config';

export function login(inputdata = {},succCallback, failCallback) {
  return (dispatch, getState) => {
    MyFetch({
      url: 'login.json',
      data: {password:md5(inputdata.password), username:inputdata.username},
      success: (data) => {
        if(LT.storage.user && LT.storage.user.employeeId && data.data.employeeId!==LT.storage.user.employeeId){//更换用户，清空client数据
          dispatch(initClient());
        }        
        dispatch(openTip('登录成功！'));
        dispatch({
          type: LOGIN_SUCC,
          payload: data.data
        });

        dispatch(replaceRouter({name:'home'}));
      },
      fail: (data) =>{
        dispatch(openTip(data.msg));
        dispatch({
          type: LOGIN_FAIL,
          payload: {}
        });
      },
      ifShowLoading: true
    }, {
      showLoading: () => dispatch(showLoading()), 
      hideLoading: () => dispatch(hideLoading()), 
      openTip: (msg) => dispatch(openTip(msg)),
      logout: () => dispatch(logout())
    });
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT,
      payload: {}
    });
    dispatch(resetRouter({name: 'login'}));
  }
}
