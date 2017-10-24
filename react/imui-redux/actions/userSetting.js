import {pajax} from '@liepin/imcore/utils';
import getConfig from '../config';
import * as ActionType from './ActionType';
import {enums} from '../constants';
import {UserType} from '@liepin/imcore/constants';

export function showUserSetting(){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.USERSETTING_DIALOG,
      payload: true
    });
  }
}

export function hideUserSetting(){
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.USERSETTING_DIALOG,
      payload: false
    });
  }
}