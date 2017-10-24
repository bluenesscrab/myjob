import {ExtType, MsgState} from '@liepin/imcore/messages/enums';
import {UserType} from '@liepin/imcore/constants';
import React, {Component} from 'react';
import classnames from 'classnames';
import getConfig from '../config';
import {getBrief, dateFormat} from '../utils';
import LastMsg from './LastMsg';
import {Atlog} from '../common/addTlog';
import '../css/ContactInfo.css';

/* 获取c端最近联系人 */
export function CIdentity(props) {
  let {item, config} = props;
  let identity = '',
    icons = '';
  switch (item.oppositeUserKind) {
    case UserType.USER_TYPE_B.toString():
      icons = 'icons24-hr';
      break;
    case UserType.USER_TYPE_H.toString():
      icons = 'icons24-lietou';
      break;
  }
    return (<span className="user-name link-img">{getBrief(item.oppositeUserName, 4)} <em className={'webim-icons24 ' + icons}></em></span>);
}

export default function ContactInfo(props){
  let env = props.imcore.env.toLowerCase();
  let config = getConfig(env);
  let userInfo = props.imcore.userInfo;
  let v = props.contacts;
  switch (env){
    case 'c':
      return (
        <div className="contact-info clearfix" onClick={()=>props.actions.selectContact(props.imcore, v)}>
          <div className="photo">
            <img className="tinyFace circle" src={'//image0.lietou-static.com/normal/'+v.oppositeUserPhoto} />
            <i className={classnames({dot: true, hide: !v.unRead})}></i>
          </div>
          <div className="info">
            <p>
              <CIdentity config={config.tlogs} item={v}/>
              <time>{v.lastMessageTimestamp ? dateFormat(new Date(v.lastMessageTimestamp)): ''}</time>
            </p>
            <p className="last"><LastMsg env={env} message={v.lastMessageContent} name={getBrief(userInfo.oppositeUserName, 3)}/></p>
          </div>
        </div>
      );
    case 'b':
      return (
        <div className="contact-info clearfix" onClick={()=>props.actions.selectContact(props.imcore, v)}>
          <div className="photo">
            <img className="tinyFace circle" src={'https://image0.lietou-static.com/normal/'+v.oppositeUserPhoto} />
            <i className={classnames({dot: true, hide: !v.unRead})}></i>
            {v.contactStatus === 'ALIVE' && props.isHistory ? <em className="connected">曾沟通</em> : ''}
          </div>
          <div className="info">
            <p>
              <span className="name">{getBrief(v.oppositeUserName, 2)}</span>
              <em className="job-title">{getBrief(v.oppositeUserTitle, 3)}</em> 
              <time>{v.lastMessageTimestamp ? dateFormat(new Date(v.lastMessageTimestamp)): ''}</time>
            </p>
            <p className="last"><LastMsg env={env} message={v.lastMessageContent} name={getBrief(v.oppositeUserName, 3)}/></p>
          </div>
        </div>
      );
    case 'h':
      return (
        <div className="contact-info clearfix" onClick={()=>props.actions.selectContact(props.imcore, v)}>
          <div className="photo">
            <img className="tinyFace circle" src={'https://image0.lietou-static.com/normal/'+v.oppositeUserPhoto} />
            <i className={classnames({dot: true, hide: !v.unRead})}></i>
            {v.contactStatus === 'ALIVE' && props.isHistory ? <em className="connected">曾沟通</em> : ''}
          </div>
          <div className="info">
            <p>
              <span className="name">{getBrief(v.oppositeUserName, 3)}</span>
              <em className="job-title">{getBrief(v.oppositeUserTitle, 3)}</em>
              <time>{v.lastMessageTimestamp ? dateFormat(new Date(v.lastMessageTimestamp)): ''}</time>
            </p>
            <p className="last"><LastMsg env={env} message={v.lastMessageContent} name={getBrief(v.oppositeUserName, 3)}/></p>
          </div>
        </div>
      )
  }
}