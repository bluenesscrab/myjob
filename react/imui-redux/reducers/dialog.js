import {ActionType} from '../actions';

export const dialogInitialState = {
  panelVisible: false,
  panelContent: null,
  chatVisible: false,
  chatContent: null,
};

export function dialogReducer(state = dialogInitialState, action){
  switch (action.type){
    case ActionType.OPEN_DIALOG:
      return {...state, ...action.payload}
    case ActionType.CLOSE_DIALOG:
      return {...state, ...action.payload};
    default:
      return state;
  }
}