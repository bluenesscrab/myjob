import React from 'react';
import ReactDOM from 'react-dom';

//////////////////////// redux  start
import {bindActionCreators} from 'redux';
import { Provider, connect } from 'react-redux';
import { configureStore } from './store.js';
const store = configureStore();

//////////////////////// redux  end

class Root extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props.actions);
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

import {listActions, homeActions} from './actions/actions.js';
// //高阶组件
const mapStateToProps = (state, props) => ({
  allstate: state
});

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({
//     ...panelActions,
//   }, dispatch), dispatch
// });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...listActions,
    ...homeActions,
  }, dispatch),
  dispatch
});
const NewRoot = connect(mapStateToProps, mapDispatchToProps)(Root);
// //高阶组件


ReactDOM.render(
<Provider store={store}>
  <NewRoot/>
</Provider>, document.getElementById('root'));
