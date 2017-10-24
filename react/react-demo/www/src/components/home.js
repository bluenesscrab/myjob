import React from 'react';
import ReactDOM from 'react-dom';

// import 'whatwg-fetch'; // fetch库

export default class Home extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      bl: false,
      datas:''
    }

    console.log(this.props);

  }

  bl(){
    this.setState({
      bl:!this.state.bl
    })
  }

  show(data){
    console.log('show');

    switch(data){
      case 'about':
        this.setState({
          datas:'about'
        })
        break;
      
      case 'blog':
        this.setState({
          datas:'blog'
        })
        break;
      
      case 'empty':
        this.setState({
          datas:'empty'
        })
        break;
    }
  }

  render(){
    return <div>
      <h3>home page</h3>
      this.props.match.path: {this.props.match.path}<br/>

      <button onClick={ this.bl.bind(this)}>
        阻止导航 {this.state.bl.toString()}
      </button>

      <br/>
      <button onClick={ ()=>{ this.show('about') } }>about</button>
      <button onClick={ ()=>{ this.show('blog') } }>blog</button>
      <button onClick={ ()=>{ this.show('empty') } }>empty</button>
      
      <h1> { this.state.datas } </h1>
      
    </div>
  }
}
