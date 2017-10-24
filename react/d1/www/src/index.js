import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Tabs from './tabs.js';

class Root extends Component{
  constructor(props){
    super(props);
    this.state = { 
      count: 0,
    }
  }

  handleAdd(){
    this.setState({
      count: this.state.count + 1,
    });
  }

  handleClick(){
    this.myInput.focus();
  }

  handleFocus(){
    this.myInput.value = `focus value ${this.state.count}`;
  }

  handleBlur(){
    this.myInput.value = '';
    this.myInput.placeholder = `blur placeholder ${this.state.count}`;
  }

  render(){
    return (
      <div>
        <h3>Root compont</h3>
        this.props: {JSON.stringify(this.props)} <br/>
        this.state: {JSON.stringify(this.state)} <hr/>
        

        <section>
          <p>{this.state.count}</p>
          <button
          type="button" 
          onClick={ this.handleAdd.bind(this) }
          >add</button>
        </section>


        <section>
          <input
          type="text"
          placeholder = {`blur placeholder ${this.state.count}`}
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

        <section>
          <Tabs
          activeIndex = {1} 
          navValue = {['tab1','tab2','tab3','tab4','tab5']}
          contents = {['contents-_-1','contents-_-2','contents-_-3','contents-_-4','contents-_-5']}
          />
        </section>

      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));

