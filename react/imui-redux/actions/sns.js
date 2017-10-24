import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';

/*获得服务器端联系人列表*/
export function getSnsList(imcore) {
  return async (dispatch, getState) => {
    try{
      let data = await pajax({url: getConfig(imcore.env).urls.snsList});
      if(data.flag){
        let snsData = [
          [{
            txt: '我的好友',
            url: 'https://sns.liepin.com/connection/connectionlistforc/',
            count: data.data.friendCnt,
            icon: 'person'
          }, {
            txt: '我的粉丝',
            url: 'https://sns.liepin.com/connection/fans/',
            count: data.data.myFansCnt,
            icon: 'person'
          }, {
            txt: '我的关注',
            url: 'https://sns.liepin.com/connection/follows/',
            count: data.data.myFollowCnt,
            icon: 'concern'
          }],
          [{
            txt: '我关注的猎头',
            url: 'https://sns.liepin.com/connection/connectionlistforh/?direction=out',
            count: data.data.followingHCnt,
            icon: 'person-arr'
          }, {
            txt: '关注我的猎头',
            url: 'https://sns.liepin.com/connection/connectionlistforh/?direction=in',
            count: data.data.followHCnt,
            icon: 'person-arrow'
          }],
          [{
            txt: '我关注的公司',
            url: 'https://sns.liepin.com/connection/connectionlistfore/?direction=out',
            count: data.data.followBCnt,
            icon: 'building'
          }]
        ];
        dispatch({  //index.js reducers()
          type: ActionType.SELECT_SNS,
          payload: snsData
        });
      }
    }
    catch(e){
      imcore.handleErr(e);
    }
  }
}