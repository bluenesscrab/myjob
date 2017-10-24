import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import {hKilledAccountAlert} from '../utils';

export async function getContactList(imcore, curPage) {
  let data = await pajax({
    url: getConfig(imcore.env).urls.getcontactlist,
    data: {
      curPage
    }
  });
  if(data.flag){
    return data.data;
  }
  else{
    hKilledAccountAlert(imcore,data);
    throw new Error(data.msg);
  }
}

/*获得联系人的详细信息*/
export async function getContactInfo(imcore, oppositeEmUserName) {
  let data = await pajax({
    url: getConfig(imcore.env).urls.getonecontact, 
    data: {
      emUsername: oppositeEmUserName,
      oppositeEmUserName
    }
  });  
  if(data.flag){
    return data.data
  } 
  else{
    hKilledAccountAlert(imcore,data);
    throw new Error(data.msg);
  }
}