import {SHOW_LOADING,HIDE_LOADING,HIDE_ALL_LOADING} from './action-types';

export function showLoading() {
  return {
    type: SHOW_LOADING,
    payload: {}
  }
}

export function hideLoading(id) {
  return {
    type: HIDE_LOADING,
    payload: {}
  };
}

export function hideAllLoading(id) {
  return {
    type: HIDE_ALL_LOADING,
    payload: {}
  };
}
