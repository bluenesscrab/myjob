import {pajax} from '@liepin/imcore/utils';
import {ExtType, MsgState} from '@liepin/imcore/messages/enums';
import getConfig from '../config';
import {hKilledAccountAlert} from '../utils';


//判断是否关注
export async function  isAttention(imcore,emUsername){
    try{
      let data = await pajax({
        url: getConfig(imcore.env).urls.getonecontactotherinfo,
        type: 'post',
        data: {emUsername:emUsername}
      });
      if(data.flag){
        return data.data;
      } else {
       hKilledAccountAlert(imcore,data);
      } 
    }
    catch(e){
      imcore.handleErr(e)
    }
  }