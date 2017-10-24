import {ActionType} from '../actions';

export const userSettingInitialState = {
  dialogVisible: false
};

export function userSettingReducer(state = userSettingInitialState, action){
  switch (action.type){
    case ActionType.USERSETTING_DIALOG:
      return Object.assign({}, state, {dialogVisible:action.payload});

    default:
      return state;
  }
}