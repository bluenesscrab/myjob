export default {
  gender:function(state = 'girl', action){
    switch (action.type){
      case 'ADD_TYPE2_1':
        return state + ' gender1';
      case 'ADD_TYPE2_2':
        return state + ' gender2';
      default:
        return state;
    }
  }
}