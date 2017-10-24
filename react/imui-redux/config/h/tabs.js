import Contacts from '../../components/Contacts';
import HistoryContacts from '../../components/HistoryContacts';
import Notice from '../../components/Notice';

export const tabs = [{
  key: 'contacts',
  name: '消息',
  comp: Contacts
},{
  key: 'historycontacts',
  name: '历史',
  comp: HistoryContacts
},{
  key: 'notice',
  name: '通知',
  comp: Notice
}];
