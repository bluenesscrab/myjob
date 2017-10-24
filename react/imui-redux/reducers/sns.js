import {ActionType} from '../actions';

export const snsInitialState = {
  sns:[],
  unRead: false,
};

export function snsReducer(state = snsInitialState, action){
  switch (action.type){
    case ActionType.SELECT_SNS:
      return Object.assign({}, state, {sns: action.payload});

    default:
      return state;
  }
}