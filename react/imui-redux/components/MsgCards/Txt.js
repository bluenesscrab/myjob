import {Emotions} from '../../constants';
import React, {Component} from 'react';

export default function Txt(props){
  let {message} = props;
  let str = '';
  if(message.data){
    str = message.data.replace(/[<>]/g, str => {
      switch (str) {
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
      }
    }).replace(/\[[^\[\]]+\]/g, (str) => {
      return Emotions[str] ? `<img class="emoji" src=${Emotions[str]} title=${str}>` : str || '';
    }).replace(/\n/g, '<br/>');
  }
  return (          
    <div className="content" dangerouslySetInnerHTML={{ __html: str }} ></div>
  );
}