import {MyFetch} from '../../util';

export function checkVersion(succCallback) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/device/checkversion.json',
      success: (data) => {
        succCallback && succCallback(data); 
      },
      fail: (data)=>{
        failCallback && failCallback(data);
      }
    });
  }
}

export function getServiceType({succCallback,failCallback}) {
  return (dispatch, getState) => {
    MyFetch({
      url: '/opportunity/listbizcategory.json',
      success: (data) => {
        succCallback && succCallback(data); 
      },
      fail: (data)=>{
        failCallback && failCallback(data);
      }
    });
  }
}
