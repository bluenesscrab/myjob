import React, {Component} from 'react';
import '../css/GreetingList.css';

export default function GreetingList(props){
  return (
    <div className="chat-setting absolute active hide">
      <ul>
        <li>
          <label>
            <input type="radio" name="set-dialog" className="radio" defaultChecked/>
            按Enter发送消息
          </label>
        </li>
        <li>
          <label>
            <input type="radio" name="set-dialog" className="radio" />
            按Ctrl+Enter发送消息
          </label>
        </li>
      </ul>
    </div>
  )
} 