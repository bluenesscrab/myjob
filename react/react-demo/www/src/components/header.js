import React from "react";
import ReactDOM from "react-dom";
import {
  Link
} from 'react-router-dom'

export default class Header extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/topics">Topics</Link></li>
      <li><Link to="/re">重定向</Link></li>
    </ul>
  }
}
