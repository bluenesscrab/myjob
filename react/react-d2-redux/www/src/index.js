import React from 'react';
import ReactDOM from 'react-dom';



//////////////////////// redux  start
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const initData = {
  list:[]
}

//定义一个action
const add = (text) => ({
  type: 'ADD',
  payload: text
});
const remove = () => ({
  type: 'REMOVE',
  payload: 0
});
//定义一个action

//// reducer
const reducer = (state = initData, action) => {
  if(action.type==='ADD') {
    return {list: state.list.concat(action.payload)};
  }
  else if(action.type==='REMOVE'){
    return {list: state.list.filter((v,i)=>i!==action.payload)}
  }
  else{
    return state;
  }
}
//// reducer

const store = createStore(reducer, initData);
//////////////////////// redux  end


class Root extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }

  add(){
    let {list, actions} = this.props;
    let val = this.input.value;

    if(val){
      actions.add(val);
      this.input.value ='';
    }
  }

  remove(){
    let {list, actions} = this.props;
    actions.remove();
  }

  render(){
    let {list} = this.props;
    return (
      <div>
        Root compont <br/>
        this.props: {JSON.stringify(this.props)} <br/>
        <div>
          <button onClick={this.remove.bind(this)}>remove</button>
          <input type="text" ref={(input)=>this.input = input}/>
          <button onClick={ this.add.bind(this) }>Add</button>
        </div>
        {
          list && list.map((v,i)=><p key={i}>{v}</p>)
        }
      </div>
    )
  }
}


//高阶组件
const mapStateToProps = (state)=>{
  return {list: state.list}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:{
      add:(text)=>dispatch(add(text)),
      remove:()=>dispatch(remove())
    }
  }
}
const NewRoot = connect(mapStateToProps, mapDispatchToProps)(Root);
//高阶组件


ReactDOM.render(
  <Provider store={store}>
    <NewRoot/>
  </Provider>, document.getElementById('root'));

