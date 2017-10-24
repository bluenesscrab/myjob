import {ActionType} from '../actions';

export const dragInitialState = {
  top:0,
  right:300,
};

export function dragReducer(state = dragInitialState, action){
  switch (action.type){
    case ActionType.DRAG_DISTANCE:
      return Object.assign({}, state, action.payload);
    case ActionType.DRAG_DONE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}