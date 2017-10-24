import {combineReducers} from 'redux';
import {contactsReducer} from './contacts';
import {dragReducer} from './drag';
import {historyReducer} from './history';
import {historyContactsReducer} from './historyContacts';
import {noticeReducer} from './notice';
import {panelReducer} from './panel';
import {snsReducer} from './sns';
import {dialogReducer} from './dialog';
import {settingReducer} from './setting';
import {setGreetingReducer} from './setGreeting';
import {toastReducer} from './toast';
import {userSettingReducer} from './userSetting';
import {shieldReducer} from './shield';
import {reportReducer} from './report';

export default combineReducers({
  contacts: contactsReducer,
  drag: dragReducer,
  history: historyReducer,
  notice: noticeReducer,
  panel: panelReducer,
  sns: snsReducer,
  dialog: dialogReducer,
  historyContacts: historyContactsReducer,
  setting: settingReducer,
  setGreeting: setGreetingReducer,
  toast: toastReducer,
  userSetting: userSettingReducer,
  shield: shieldReducer,
  report: reportReducer
});
