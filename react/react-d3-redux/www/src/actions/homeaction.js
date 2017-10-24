export function add(text) {

  return (dispatch, getState) => {
    console.log(getState)
    dispatch({
      type: 'HOME_ADD',
      payload: text
    });
  }
}
export function remove() {
  return (dispatch, getState) => {
    dispatch({
      type: 'HOME_REMOVE',
      payload: 0
    });
  }
}