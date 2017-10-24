import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import {hKilledAccountAlert} from '../utils';

export async function getHistoryContactsAjax(imcore, curPage) {
  let data = await pajax({
    url: getConfig(imcore.env).urls.gethistorycontactlist,
    data: {
      curPage
    }
  });
  if(data.flag){
    return data.data;
  } else {
    hKilledAccountAlert(imcore,data);
    throw new Error(data.msg);
  }
}
