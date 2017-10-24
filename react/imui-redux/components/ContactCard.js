import React, {Component} from 'react';
import classnames from 'classnames';
import getConfig from '../config';
import {getBrief, dateFormat} from '../utils';
import {CIdentity} from './ContactInfo';
import {Atlog} from '../common/addTlog';
import {UserType} from '@liepin/imcore/constants';
import LastMsg from './LastMsg';
import '../css/ContactCard.css';

export default function ContactCard(props){
  let env = props.imcore.env.toLowerCase();
  let config = getConfig(env);
  let userInfo = props.imcore.userInfo;
  let v = props.contacts;
  switch (env){
    case 'c':
    let titlePushStr = '';
    switch (v.oppositeUserKind) {
      case UserType.USER_TYPE_B.toString():
        titlePushStr = config.OPEN_BPAGE;
        break;
      case UserType.USER_TYPE_H.toString():
        titlePushStr = config.OPEN_HPAGE;
        break;
    }
    return (
      <div className="contact-card">
        <Atlog href={v.oppositeMainUrl} target="_blank" pushStr={titlePushStr}>
          <dl className="target-info">
            <dt>
              <img className="tinyFace circle" src={'https://image0.lietou-static.com/normal/'+v.oppositeUserPhoto} />
            </dt>
            <dd className="name">
              <CIdentity config={config.tlogs} item={v}/>
            </dd>
            <dd className="job-info">
            <span title={v.oppositeUserTitle}>{getBrief(v.oppositeUserTitle, 6)}</span> | <span title={v.oppositeUserCompany}>{getBrief(v.oppositeUserCompany, 10)}</span>
            </dd>
          </dl>
          <div className="last-full-msg">
            <LastMsg env={env} message={v.lastMessageContent} name={getBrief(userInfo.oppositeUserName, 3)}/>
          </div>
        </Atlog>
      </div>
    );
    case 'b':
    return (
      <div className="contact-card">
        <a href={'/resume/showresumecarte4im?usercId='+v.oppositeUserId+'&oppositeEmUserName='+v.oppositeEmUserName} target="_blank">
          <dl className="target-info">
            <dt>
              <img className="tinyFace circle" src={'https://image0.lietou-static.com/normal/'+v.oppositeUserPhoto} />
            </dt>
            <dd className="name">
              <span className="name">{getBrief(v.oppositeUserName, 4)}</span>
            </dd>
            <dd className="job-info">
              {v.oppositeUserSexName ? <span>{v.oppositeUserSexName} | </span>  : ''} 
              {v.oppositeUserEdulevelName ? <span title={v.oppositeUserEdulevelName}>{getBrief(v.oppositeUserEdulevelName, 3)} | </span>  : ''} 
              <span>工作{v.oppositeWorkAge}年</span> | <span title={v.oppositeUserDqName}>{getBrief(v.oppositeUserDqName, 6)}</span>
            </dd>
          </dl>
          <div className="last-full-msg">
            <LastMsg env={env} message={v.lastMessageContent} name={getBrief(v.oppositeUserName, 3)}/>
          </div>
        </a>
      </div>
    );
    case 'h':
    return (
      <div className="contact-card">
        <Atlog href={`https://h.liepin.com/resume/showresumedetail4im/?oppositeEmUserName=${v.oppositeEmUserName}`} target="_blank" pushStr={config.tlogs.CLICK_CONTACTSCARD}>
          <dl className="target-info">
            <dt>
              <img className="tinyFace circle" src={'https://image0.lietou-static.com/normal/'+v.oppositeUserPhoto} />
            </dt>
            <dd className="name">
              <span className="name">{getBrief(v.oppositeUserName, 4)}</span>
            </dd>
            <dd className="job-info">
              {v.oppositeUserSexName ? <span>{v.oppositeUserSexName} | </span>  : ''} 
              {v.oppositeUserEdulevelName ? <span title={v.oppositeUserEdulevelName}>{getBrief(v.oppositeUserEdulevelName, 3)} | </span>  : ''} 
              <span>工作{v.oppositeWorkAge}年</span> | <span title={v.oppositeUserDqName}>{getBrief(v.oppositeUserDqName, 6)}</span>
            </dd>
          </dl>
          <div className="last-full-msg">
            <LastMsg env={env} message={v.lastMessageContent} name={getBrief(v.oppositeUserName, 3)}/>
          </div>
        </Atlog>
      </div>
    );
  }
}