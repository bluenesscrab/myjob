export default {
  name:function(state = 'lily', action){
    switch (action.type){
      case 'ADD_TYPE1_1':
        return state+' name1';
      case 'ADD_TYPE1_2':
        return state+' name2';
      default:
        return state;
    }
  }

  // gender:function(state = 'girl', action){
  //   switch (action.type){
  //     case 'ADD_TYPE2_1':
  //       return state + ' gender1';
  //     case 'ADD_TYPE2_2':
  //       return state + ' gender2';
  //     default:
  //       return state;
  //   }
  // },
  // age:function(state = 10, action){
  //   switch (action.type){
  //     case 'ADD_TYPE2_1':
  //       return state + 1;
  //     case 'ADD_TYPE2_2':
  //       return state + 10;
  //     default:
  //       return state;
  //   }
  // }
}