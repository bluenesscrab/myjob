import {pajax} from '@liepin/imcore/utils';
import {enums} from '../constants';
import getConfig from '../config';

export async function getHistoryFromServer(imcore, oppositeEmUserName, msgid = -1, pageSize = enums.HISTORY_PAGESIZE){
  let data = await pajax({
    url: getConfig(imcore.env).urls.getmsgdialoglistbymsgid,
    data: {
      msgid,
      pageSize: enums.HISTORY_PAGESIZE,
      oppositeEmUserName: oppositeEmUserName
    }
  });
  if(data.flag){
    return data.data;
  }
  else{
    throw new Error(data.msg);
  }
}
