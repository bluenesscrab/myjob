import React from 'react';

//view 入口文件
// import About from "./about";
// import Blog from "./blog";
// import Home from "./home";
// import List from "./list";

export default class App extends React.Component{
  constructor(props) {
    super(props)
  }
  // componentDidMount (){
  //   //只出现一次，在第一次render之后。很常用，在这里第一次进行ajax。事件也在这里绑定
  //   console.log('react index ready');
  // }
  // componentWillReceiveProps (nextProps){
  //   console.log('app,componentWillReceiveProps',nextProps);
  // }


  show(){
    this.props.showHello()
  }

  render () {
    return (
      <div>
        <h1 onClick={ this.show.bind(this)}>h1</h1>
      </div>
    );
  }
}
