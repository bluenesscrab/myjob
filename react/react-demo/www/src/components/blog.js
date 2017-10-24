import React from "react";
import ReactDOM from "react-dom";

export default class Blog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name:'lily',
      gender:'girl',
      age:18,
      home:'beijing'
    }
    console.log(this.props.match)
  }
  render(){
    return <div>
      <h3>my blog</h3>
      this.props.match.path: {this.props.match.path}
      <section>
        name: {this.state.name}<br />
        gender: {this.state.gender}<br />
        age: {this.state.age}<br />
        home: {this.state.home}<br />
      </section>
    </div>
  }
}
