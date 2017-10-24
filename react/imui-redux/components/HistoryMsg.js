import React, {Component} from 'react';
import {timeVisibleFormat} from '../utils';
import classnames from 'classnames';
import {UserType} from '@liepin/imcore/constants';
import {ExtType} from '@liepin/imcore/messages/enums';
import imgPreview from '../common/imgPreview';

import '../css/HistoryMsg.css';

const renderContentC = (message)=>{
  let {data, type, extType, name, resumeUrl, senderKind, company, dqName, salary, title, jobHref}= message;
  let jobLabel;
  if(type==='img'){
    return <div className="content"><a href="javascript:;" onClick={()=>{imgPreview({src:data})}} className="preview-image"><img src={data}/></a></div>
  }
  switch (extType){
    case ExtType.MESSAGE_RESUME:
      return <div className="content">[委托的简历] <a href={resumeUrl} target="_blank">{name+'的简历'}</a></div>;
      break;
    case ExtType.MESSAGE_SEND_JOB:
      if (senderKind == UserType.USER_TYPE_C) { 
        jobLabel = '[我感兴趣的职位] ';
      } else if (senderKind == UserType.USER_TYPE_B) {
        jobLabel = '[邀您应聘的职位] ';
      } else if (senderKind == UserType.USER_TYPE_H) {
        jobLabel = '[为你推荐的职位] ';
      } else {
        jobLabel = '[职位] ';
      }
      return (
        <div className="content">
          <div className="job">
            <p>{jobLabel}
              <a href={jobHref} target="_blank">{title}<span className="text-warning"> [{salary}]</span></a></p>
            <p>
              <label>{company}</label>
              <label>{dqName}</label>
            </p>        
          </div>
        </div>
      );
      break;
    case ExtType.MESSAGE_SEND_APPLYRESUME:
      if (senderKind == UserType.USER_TYPE_C) {
        return <div className="content">[您的简历已发送至对方]</div>;
      }else if(senderKind == UserType.USER_TYPE_H){
        return <div className="content">[应聘的简历] <a href={resumeUrl} target="_blank">{name+'的简历'}</a></div>;
      }
      break;
    case ExtType.MESSAGE_SEND_NAMECARD:
      return <div className="content"><p>建议您发送简历后再沟通，提高求职效率。</p>[发送名片]</div>;
      break;
    case ExtType.MESSAGE_ASK_RESUME:
      return <div className="content">[索要简历]我想要一份你的简历，你是否同意？</div>;
      break;
    case ExtType.MESSAGE_SEND_RATINGBAR:
      return <div className="content">[请为猎头服务做出评价]</div>;
    case ExtType.MESSAGE_SEND_APPLYFAILDFEEDBACK:
      return <div className="content">[已拒绝推荐职位]</div>
    case ExtType.MESSAGE_SEND_APPLYSUCFEEDBACK:
      return <div className="content">[已接受推荐职位]</div>
    default: 
      return <div className="content">{data}</div>
  }
}
const renderContentB = (message)=>{
  let {data, type, extType, name, resumeUrl, senderKind, company, dqName, dq, salary, title, jobHref,workyear,res_edulevel}= message;
  let jobLabel;
  if(type==='img'){
    return <div className="content"><a href="javascript:;" onClick={()=>{imgPreview({src:data})}} className="preview-image"><img src={data}/></a></div>
  }
  switch (extType){
    case ExtType.MESSAGE_SEND_JOB:
      if (senderKind == UserType.USER_TYPE_C) { 
        jobLabel = '[我感兴趣的职位] ';
      } else {
        jobLabel = '[邀请您应聘的职位] ';
      }
      return (
        <div className="content">
          <div className="job">
            <p>{jobLabel}
              <a href={jobHref} target="_blank">{title}<span className="text-warning"> [{salary}]</span></a></p>
            <p>
              <label>{company}</label>
              <label>{dqName}</label>
            </p>        
          </div>
        </div>
      );
      break;
    case ExtType.MESSAGE_SEND_APPLYRESUME:
      return <div className="content">[应聘的简历] <a href={resumeUrl} target="_blank">{name+'的简历'}</a></div>;
      break;
    case ExtType.MESSAGE_SEND_NAMECARD:
      return <div className="content">[发送名片] {name}的名片</div>;
      break;
    case ExtType.MESSAGE_ASK_RESUME:
      return <div className="content">索要简历的请求已发送</div>;
      break;
    default: 
      return <div className="content">{data}</div>
  }
}

const renderContentH = (message)=>{
  let {data, type, extType, name, resumeUrl, senderKind, company, dqName, dq, salary, title, jobHref,workyear,res_edulevel}= message;
  let jobLabel;
  if(type==='img'){
    return <div className="content"><a href="javascript:;" onClick={()=>{imgPreview({src:data})}} className="preview-image"><img src={data}/></a></div>
  }
  switch (extType){
    case ExtType.MESSAGE_RESUME:
      return <div className="content">[委托的简历] <a href={resumeUrl} target="_blank">{name+'的简历'}</a></div>;
      break;
    case ExtType.MESSAGE_SEND_JOB:
      if (senderKind == UserType.USER_TYPE_C) { 
        jobLabel = '[我感兴趣的职位] ';
      } else {
        jobLabel = '[职位] ';
      }
      return (
        <div className="content">
          <div className="job">
            <p>{jobLabel}
              <a href={jobHref} target="_blank">{title}<span className="text-warning"> [{salary}]</span></a></p>
            <p>
              <label>{company}</label>
              <label>{dqName}</label>
            </p>        
          </div>
        </div>
      );
      break;
    case ExtType.MESSAGE_SEND_APPLYRESUME:
      return <div className="content">[应聘的简历] <a href={resumeUrl} target="_blank">{name+'的简历'}</a></div>;
      break;
    case ExtType.MESSAGE_SEND_NAMECARD:
      return <div className="content">[发送名片] {name}的名片</div>;
      break;
    case ExtType.MESSAGE_ASK_RESUME:
      return <div className="content">索要简历的请求已发送</div>;
      break;
    case ExtType.MESSAGE_SEND_RATINGBAR:
      return <div className="content">[请为猎头服务做出评价]</div>;
    case ExtType.MESSAGE_SEND_APPLYFAILDFEEDBACK:
      return <div className="content">[已拒绝推荐职位]</div>
    case ExtType.MESSAGE_SEND_APPLYSUCFEEDBACK:
      return <div className="content">[已接受推荐职位]</div>
    default: 
      return <div className="content">{data}</div>
  }
}

export default function HistoryMsg(props){
  let {env, userInfo, targetInfo, message} = props;
  let {day, time, from} = message;
  let isSend = from===userInfo.oppositeEmUserName;
  let historyContent;
  if(env == 'c') {
    historyContent = renderContentC(message);  //c端显示
  } else if(env == 'b') {
    historyContent = renderContentB(message);  //b端显示
  } else {
    historyContent = renderContentH(message);  //h端显示
  }
  return (
  <div className="historymsg">
    { day && <h4>{day}</h4>}
    <p className={isSend? 'send' : 'receive'}>
      <label>{isSend ? userInfo.oppositeUserName : (targetInfo.oppositeUserNameShow || targetInfo.oppositeUserName)}</label>
      <time>{time}</time>
    </p>
    {historyContent}
  </div>
  )
}