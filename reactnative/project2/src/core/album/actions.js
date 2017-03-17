import {MyFetch} from '../../util';
import {showLoading, hideLoading} from '../overlay/actions';
import {openTip} from '../tip/actions';
import {logout} from '../user/actions';

export function getAlbum({customerId, curPage=0, succCallback, failCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/customer/listcustomeralbum.json',
      data: {customerId, curPage, pageSize:12},
      success: (data) => {
        // dispatch({
        //   type: GET_ALBUM,
        //   payload:{list:data.data.dataList, customerId, page: curPage, more:curPage<data.data.totalPage-1}
        // });
        succCallback && succCallback(data)
      },
      fail: (data)=>{
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
  }
}

export function uploadPhoto({customerId, photo, succCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/customer/uploadsnapshot.json',
      data: {customerId, photo},
      success: (data) => {
        dispatch(openTip('上传图片成功！'));
        succCallback && succCallback();
      },
      fail: (data)=>{
        dispatch(openTip(data.msg));
      },
      //filename:uri,
      ifShowLoading:true
    }, {
      showLoading: () => dispatch(showLoading()), 
      hideLoading: () => dispatch(hideLoading()), 
      openTip: (msg) => dispatch(openTip(msg)),
      logout: () => dispatch(logout())
    });
  }
}
