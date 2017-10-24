import {Type} from '../actions';

export const contactsInitialState = {
  list: []
};
//数组中元素置顶, 如果未找到，将目标元素放入数组第一个，返回一个新数组
function add(state, text) {
  if(text){
    return {list: state.list.concat(action.payload)};
  }else{
    return state;
  }
}

//替换数组中元素, 返回一个新数组
function remove(state, text) {
  let i = list.findIndex((v,i,arr)=>condition(v,i,arr));
  if(text){
    return {list: state.list.filter((v,i)=>i!==action.payload)}
  }else{
    return {list: state.list.filter((v,i)=>i!==0)}
  }
}

export function appReducer(state = contactsInitialState, action){
  switch (action.type){
    case Type.LIST_ADD:
      let adds = add(state, action.payload);
      return adds;
    case Type.LIST_REMOVE:
      let removes = remove(state, action.payload);
      return removes;
    default:
      return state;
  }
}