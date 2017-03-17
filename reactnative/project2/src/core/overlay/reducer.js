import {SHOW_LOADING,HIDE_LOADING,HIDE_ALL_LOADING} from './action-types';
import {Dimensions,} from 'react-native';

export const initialState = {
  loadingStack:0,
  loadingIds: 0,
  navbar:false,//是否在导航条以下
};

export function overlayReducer(state = initialState, action){
  let newTipStack;
  switch (action.type){
    case SHOW_LOADING:
      return Object.assign({}, state, {loadingStack: state.loadingStack+1});

    case HIDE_LOADING: 
      return Object.assign({}, state, {loadingStack: state.loadingStack>0 ? state.loadingStack-1 : 0});
    
    case HIDE_ALL_LOADING: 
      return Object.assign({}, state, {loadingStack: 0});

    default:
      return state;
  }
}


