import React, { Component } from 'react';
import ReactDOM from 'react-dom';


//////////////////////// redux  start
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const initData = {
  list:[],
  count:0
}


// action Type 
const ActionType = {
  ADD:'ADD',
  REMOVE:'REMOVE',
  ADD_LIST:'ADD_LIST',
  REMOVE_LIST:'REMOVE_LIST'
};


//定义一个action
const add = () => ({
  type: ActionType.ADD ,
  payload: 1
});
const remove = () => ({
  type: ActionType.REMOVE,
  payload: 1
});

const addList = (text) => ({
  type: ActionType.ADD_LIST,
  payload: 10
});
const removeList = () => ({
  type: ActionType.REMOVE_LIST,
  payload:0
});
//定义一个action





//// reducer
const reducer = (state = initData, action) => {
  switch(action.type){
    // Object.assign({}, state, {msgList:state.msgList.concat(action.payload)});
    case ActionType.ADD:
      //return {count:state.count--}
      return Object.assign({}, state, {count:state.count+action.payload});
    case ActionType.REMOVE:
      return Object.assign({}, state, {count:state.count-action.payload});

    case ActionType.ADD_LIST:
      return Object.assign({}, state, {list:state.list.concat(action.payload)});
      //return Object.assign({}, state, {list: state.list.push(action.payload)});
    case ActionType.REMOVE_LIST:
      return Object.assign({}, state, {list:state.list.filter((v,i)=>i!==action.payload)});
      //return Object.assign({}, state, {list: state.list.filter((v,i)=>i!==action.payload)});

    default:
      return state;
  }
}
//// reducer

const store = createStore(reducer, initData);
//////////////////////// redux  end


class Root extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }

  handleAdd(){
    this.props.actions.add();
  }
  handleRemove(){
    this.props.actions.remove();
  }

  handleAddList(){
    this.props.actions.addList();
  }
  handleRemoveList(){
    this.props.actions.removeList();
  }

  handleClick(){
    this.myInput.focus();
  }

  handleFocus(){
    this.myInput.value = `focus value ${this.props.count}`;
  }

  handleBlur(){
    this.myInput.value = '';
    this.myInput.placeholder = `blur placeholder ${this.props.count}`;
  }

  render(){
    return (
      <div>
        <h3>Root compont</h3>
        this.props: {JSON.stringify(this.props)} <br/>
        this.state: {JSON.stringify(this.state)} <hr/>

        <section>
          <p>{this.props.count}</p>
          <button
          type="button" 
          onClick={ this.handleAdd.bind(this) }
          >add</button>

          <button
          type="button" 
          onClick={ this.handleRemove.bind(this) }
          >remove</button>
        </section>

        <hr/>

        <section>
          
          <button
          type="button" 
          onClick={ this.handleAddList.bind(this) }
          >add</button>

          <button
          type="button" 
          onClick={ this.handleRemoveList.bind(this) }
          >remove</button>

          <ol>
            {this.props.list.map( (v,i) => <li key={i}>{i}___{v}</li> )}
          </ol>
        </section>

        <section>
          <input
          type="text"
          placeholder = {`blur placeholder ${this.props.count}`}
          onBlur={ this.handleBlur.bind(this) }
          onFocus={ this.handleFocus.bind(this) }
          ref={(ref) => this.myInput = ref} 
          />
          <input
          type="button"
          value="Focus->input"
          onClick={ this.handleClick.bind(this) }
          />
        </section>

      </div>
    )
  }
}

//高阶组件
const mapStateToProps = (state)=>{
  return {
    all:state,
    list: state.list,
    count: state.count
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:{
      add:()=>dispatch(add()),
      remove:()=>dispatch(remove()),
      addList:()=>dispatch(addList()),
      removeList:()=>dispatch(removeList())
    }
  }
}
const NewRoot = connect(mapStateToProps, mapDispatchToProps)(Root);
//高阶组件

ReactDOM.render(
<Provider store={store}>
  <NewRoot />
</Provider>, document.getElementById('root'));

