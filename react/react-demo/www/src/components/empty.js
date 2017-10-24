import React from "react";
import ReactDOM from "react-dom";

export default class Empty extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      timer:5
    }
    
  }

  render(){
    return <div>
      <h3>empty page</h3>
      {this.state.timer}秒后跳转首页
    </div>
  }
}
