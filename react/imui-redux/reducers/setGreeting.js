import {ActionType} from '../actions';

export const setGreetingInitialState = {
  show: false,
  greetingList: [],
  greetingType: 1,
  greetingText: ''
};

export function setGreetingReducer(state = setGreetingInitialState, action){
  switch (action.type){
    case ActionType.OPEN_SETGREETING:
      return Object.assign({}, state, {show: action.payload});
    case ActionType.SETGREETING_LIST:
      return Object.assign({}, state, {greetingList: action.payload});
    case ActionType.SELECT_GREETING:
      return $.extend({}, true, state, action.payload);

    default:
      return state;
  }
}