export const listData = {
  name:'text',
  list:[]
};

//// reducer
export function lists(state = listData, action) {
  switch (action.type) {
    case 'LIST_ADD':
      return Object.assign({}, state, {list:state.list.concat(action.payload)});

    case 'LIST_REMOVE':
      return Object.assign({}, state, {list:state.list.filter((v,i)=>i!==action.payload)});

    default:
      return state;
  }
}
//// reducer
