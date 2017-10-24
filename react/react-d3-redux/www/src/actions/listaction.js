export function add(text) {

  return (dispatch, getState) => {
    console.log(getState)
    dispatch({
      type: 'LIST_ADD',
      payload: text
    });
  }
}
export function remove() {
  return (dispatch, getState) => {
    dispatch({
      type: 'LIST_REMOVE',
      payload: 0
    });
  }
}