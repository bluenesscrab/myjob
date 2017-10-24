import Contacts from '../../components/Contacts';
import Sns from '../../components/Sns';
import Notice from '../../components/Notice';

export const tabs = [{
  key: 'contacts',
  name: '消息',
  comp: Contacts
},{
  key: 'sns',
  name: '人脉',
  comp: Sns
},{
  key: 'notice',
  name: '通知',
  comp: Notice
}];
