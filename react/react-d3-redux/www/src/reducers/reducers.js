import {combineReducers} from 'redux';

import {lists} from './listreducer.js';
import {homes} from './homereducer.js';

export default combineReducers({
  list:lists,
  home:homes
});
