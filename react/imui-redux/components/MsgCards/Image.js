import React, {Component} from 'react';
import {Emotions} from '../../constants';
import {MsgState} from '@liepin/imcore/messages/enums';
import imgPreview from '../../common/imgPreview';

export default function Image(props){
  let {message, scrollToBottom} = props;
  if(message.state === MsgState.INITIAL){
    return <div className="content"><img src="//concat.lietou-static.com/dev/c/pc/v3/static/images/message/sending.gif"/></div>;
  }
  else{
    if(message.data){
      return (
        <div className="content">
          <a href="javascript:;" onClick={()=>{imgPreview({src:message.data})}} className="preview-image"><img src={message.data} onLoad={()=>scrollToBottom()}/></a>
        </div>
      );          
    }
    else{
      return(
        <div className="content">
          <img src="//concat.lietou-static.com/dev/c/pc/v3/static/images/message/404.png"/>
        </div> 
      );         
    }
  }
}