import React from "react";
import ReactDOM from "react-dom";

export default class Blog extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      us:'木林森',
      address:'beijing'
    }
    console.log(this.props.match)
  }
  render(){
    return <div>
      <h3>my blog</h3>
      this.props.match.path: {this.props.match.path}
      <section>
        us: {this.state.us} <br/>
        address: {this.state.address} <br/>
      </section>
    </div>
  }
}
