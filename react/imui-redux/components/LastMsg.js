import React, {Component} from 'react';
import {ExtType} from '@liepin/imcore/messages/enums';
import {getBrief} from '../utils';
import {UserType} from '@liepin/imcore/constants';
import {LastMessage, messageLastMsgFilter} from '@liepin/imcore/messages/lastmsg';

// 获取列表最后一条信息
let getLastMsgC = (msg,len=15, name) => {
  let lastMsg = '';
  let {type: msgType, msg: msgText, extType, senderKind, receiverKind } = msg;

  switch (extType-0) {
    case ExtType.MESSAGE_TEXT:
      if(msgType === 'img'){
        lastMsg = '[图片]';
      }else{
        lastMsg = getBrief(msgText,len);
      }
      break;
    case ExtType.MESSAGE_RESUME:
      lastMsg = `[委托的简历] ${name}的简历`;
      break;
    case ExtType.MESSAGE_SEND_JOB:
      if (senderKind == UserType.USER_TYPE_C) { //"0":经理人，"1":企业 "2":猎头  无默认
        lastMsg = `[我感兴趣的职位]`;
      } else if (senderKind == UserType.USER_TYPE_B) {
        lastMsg = `[邀您应聘的职位]`;
      } else if (senderKind == UserType.USER_TYPE_H) {
        lastMsg = `[为你推荐的职位]`;
      } else {
        lastMsg = '[职位]';
      }
      break;
    case ExtType.MESSAGE_SEND_APPLYRESUME:
      if (senderKind == UserType.USER_TYPE_C) {
        lastMsg = '[应聘简历]';
      } else if(senderKind == UserType.USER_TYPE_H) {
        lastMsg = `[应聘的简历] ${name}的简历`;
      }
      break;
    case ExtType.MESSAGE_SEND_NAMECARD:
      lastMsg = `[发送名片]`;
      break;
    case ExtType.MESSAGE_ASK_RESUME:
      lastMsg = `[索要简历]我想要一份你的简历，你是否同意？`;
      break;
    case ExtType.MESSAGE_SEND_RATINGBAR:
      lastMsg = '[请为猎头服务做出评价]';
      break;
    case ExtType.MESSAGE_SEND_APPLYFAILDFEEDBACK:
      lastMsg = '[已拒绝推荐职位]';
      break;
    case ExtType.MESSAGE_SEND_APPLYSUCFEEDBACK:
      lastMsg = '[已接受推荐职位]';
      break;
    default:
      lastMsg = getBrief(msgText,len);
      break;
  }
  return lastMsg;
}
let getLastMsgB = (msg,len=15, name) => {
  let lastMsg = '';
  let {type: msgType, msg: msgText, extType, senderKind, receiverKind } = msg;

  switch (extType-0) {
    case ExtType.MESSAGE_TEXT:
      if(msgType === 'img'){
        lastMsg = '[图片]';
      }else{
        lastMsg = getBrief(msgText,len);
      }
      break;
    case ExtType.MESSAGE_SEND_JOB:
      lastMsg = '[职位]';
      break;
    case ExtType.MESSAGE_SEND_APPLYRESUME:
      lastMsg = '[应聘简历]';
      break;
    case ExtType.MESSAGE_SEND_NAMECARD:
      lastMsg = `[应聘者的名片]`;
      break;
    case ExtType.MESSAGE_ASK_RESUME:
      lastMsg = `索要简历的请求已发送`;
      break;
    default:
      lastMsg = getBrief(msgText,len);
      break;
  }
  return lastMsg;
}
let getLastMsgH = (msg,len=15, name) => {
  let lastMsg = '';
  let {type: msgType, msg: msgText, extType, senderKind, receiverKind } = msg;

  switch (extType-0) {
    case ExtType.MESSAGE_TEXT:
      if(msgType === 'img'){
        lastMsg = '[图片]';
      }else{
        lastMsg = getBrief(msgText,len);
      }
      break;
    case ExtType.MESSAGE_RESUME:
      lastMsg = `[委托的简历] ${name}的简历`;
      break;
    case ExtType.MESSAGE_SEND_JOB:
      if (senderKind == UserType.USER_TYPE_C) { //"0":经理人，"1":企业 "2":猎头  无默认
        lastMsg = `[我感兴趣的职位]`;
      } else if (senderKind == UserType.USER_TYPE_H) {
        lastMsg = `[为你推荐的职位]`;
      } else {
        lastMsg = '[职位]';
      }
      break;
    case ExtType.MESSAGE_SEND_APPLYRESUME:
      lastMsg = `[应聘的简历] ${name}的简历`;
      break;
    case ExtType.MESSAGE_SEND_NAMECARD:
      lastMsg = `[应聘者的名片] ${name}的名片`;
      break;
    case ExtType.MESSAGE_ASK_RESUME:
      lastMsg = `索要简历的请求已发送`;
      break;
    case ExtType.MESSAGE_SEND_RATINGBAR:
      lastMsg = '[请为猎头服务做出评价]';
      break;
    case ExtType.MESSAGE_SEND_APPLYFAILDFEEDBACK:
      lastMsg = '[已拒绝推荐职位]';
      break;
    case ExtType.MESSAGE_SEND_APPLYSUCFEEDBACK:
      lastMsg = '[已接受推荐职位]';
      break;
    default:
      lastMsg = getBrief(msgText,len);
      break;
  }
  return lastMsg;
}

export default function LastMsg(props) {
  let {env, message, len, name} = props;
  let msg = new LastMessage();
  msg.set(message);
  if(!messageLastMsgFilter(msg)){
    return null;
  }
  let getMsg = '';
  if(env == 'c') {
    getMsg = getLastMsgC(msg, len, name);   //C端
  } else if(env == 'b') {
    getMsg = getLastMsgB(msg, len, name);   //B端
  } else {
    getMsg = getLastMsgH(msg, len, name);   //H端
  }
  return <span>{getMsg}</span>
}