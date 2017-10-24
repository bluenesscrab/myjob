export const listData = {
  name:'home',
  list:[1,2,3,4]
};

//// reducer
export function homes(state = listData, action) {
  switch (action.type) {
    case 'HOME_ADD':
      return Object.assign({}, state, {list:state.list.concat(action.payload)});

    case 'HOME_REMOVE':
      return Object.assign({}, state, {list:state.list.filter((v,i)=>i!==action.payload)});
    
    default:
      return state;
  }
}
//// reducer
