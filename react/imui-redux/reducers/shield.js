import {ActionType} from '../actions';

export const shieldInitialState = {
  inBlack: false,
  dialogVisible:false
};

export function shieldReducer(state = shieldInitialState, action){
  switch (action.type){
    case ActionType.INBLACK_STATUS:
      return Object.assign({}, state, {inBlack:action.payload});
    case ActionType.INBLACK_DIALOG:
      return Object.assign({}, state, {dialogVisible:action.payload});

    default:
      return state;
  }
}