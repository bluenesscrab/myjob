import {ActionType} from '../actions';

export const reportInitialState = {
  reportCode: 5,
  dialogVisible: false
};

export function reportReducer(state = reportInitialState, action){
  switch (action.type){
    case ActionType.REPORT_CODE:
      return Object.assign({}, state, {reportCode:action.payload});
    case ActionType.REPORT_DIALOG:
      return Object.assign({}, state, {dialogVisible:action.payload});

    default:
      return state;
  }
}