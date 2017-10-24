require('../static/common.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider,connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import { configureStore } from './store.js';
import actions from './actions';
let store = configureStore();

console.log(actions);


import Header from './components/header';
import Home from './components/home';
import About from './components/about';
import Blog from './components/blog';
import Empty from './components/empty';

class App extends React.Component{
  constructor(props){
    super(props);
    console.log('App',this.props);

  }
  render(){
    let {list, actions} = this.props;
    return (
      <Router>
        <div>
          App compont <br/>
          this.props.all: {JSON.stringify(this.props.all)} <br/>
          <div>
            <button onClick={()=>actions.remove(0)}>remove</button>
            <input type="text" ref={(input)=>this.input = input}/>
            <button onClick={()=>actions.add(this.input.value)}>Add</button>
            <div>
            {list && list.map((v,i)=><p key={i}>{v}</p>)}
            </div>
          </div>

          <Header/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route component={Empty} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    all: state
  }
};//把 state 传给 App作为props

const mapDispatchToProps = dispatch => ({
  actions:{
    add:(text)=>dispatch(add(text)),
    remove:(text)=>dispatch(remove(text)),
  }
});//把 dispatch 作为 App的函数传给TA

const NewApp = connect(mapStateToProps,mapDispatchToProps)(App);
// connect 高阶组建

ReactDOM.render(
  <Provider store={store}>
    <NewApp />
  </Provider>
  , document.getElementById('root'));

