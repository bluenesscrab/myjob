import React, {Component} from 'react';
import classnames from 'classnames';
import getConfig from '../config';
import {getBrief} from '../utils';
import {Atlog} from '../common/addTlog';
import {UserType} from '@liepin/imcore/constants';
import {drag} from '../common/dragResize';
import {dragActions, userSettingActions} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../css/ChatTitle.css';
import ChatTitleHattention from './ChatTitleHattention';
import ChatTitleCattention from './ChatTitleCattention'
import UserSetting from './UserSetting'
import Shield from './Shield';

class ChatTitle extends Component {
  constructor(props) {
    super(props);
    this.config = getConfig(props.imcore.env);
  }
  componentDidMount(){
    let {actions} = this.props;
    let {usersettingBtn, usersettingBOX} = this.refs;

    //点击外部时关闭设置弹层
    $(document).on('click.usersetting', (e)=>{
      if(e.target !== usersettingBtn && $(usersettingBtn).has(e.target).length === 0 && $(usersettingBOX).has(e.target).length === 0){
        actions.hideUserSetting();
      }
    });
  }
  componentWillUnmount() {
    //取消事件绑定
    $(document).off('click.usersetting');
  }
  userSettingVisible(status){
    let {imcore, actions} = this.props;
    if(status){
      actions.hideUserSetting();
    } else {
      actions.showUserSetting();
    }
  }
  closeDialog(){
    let {imcore, actions} = this.props;
    actions.hideUserSetting();
  }
  render(){
    let env = this.props.imcore.env.toLowerCase();
    let config = getConfig(env);
    let {activeContact, style, onMouseDown, historyVisible, dialogVisible, inBlack} = this.props;
    let rootClassName = classnames({'chat-title': true, blur: historyVisible});
    let titlePushStr;
    if (!activeContact){
      return <div className={rootClassName}>没有聊天信息</div>
    }    
    switch (env){  
      case 'c':
       titlePushStr = config.tlogs.OPEN_CPAGE;
      if(activeContact.oppositeUserKind == UserType.USER_TYPE_B){
        titlePushStr = config.tlogs.OPEN_BPAGE;
      }
      else if(activeContact.oppositeUserKind == UserType.USER_TYPE_H){
        titlePushStr = config.tlogs.OPEN_HPAGE;
      }
      return (     
        <div className={rootClassName} style={style} onMouseDown={(e)=>onMouseDown(e)}>
          <Atlog href={activeContact.oppositeMainUrl} target="_blank" className="link-img" pushStr={titlePushStr}>
            <img src={`//image0.lietou-static.com/normal/${activeContact.oppositeUserPhoto}`} className="tinyFace circle"/>
          </Atlog>
          <div className="target-info">
            <h3>
              <Atlog href={activeContact.oppositeMainUrl} target="_blank" pushStr={titlePushStr}>
                {activeContact.oppositeUserName}
              </Atlog>
              {activeContact.oppositeUserKind == UserType.USER_TYPE_B &&
              <em className="webim-icons24 icons24-hr"></em>
              }
              {activeContact.oppositeUserKind == UserType.USER_TYPE_H &&
              <em className="webim-icons24 icons24-lietou"></em>
              }
              <a ref="usersettingBtn" onClick={()=>this.userSettingVisible(dialogVisible)} href="javascript:;" className="usersetting-btn"><em></em></a>
              <div ref="usersettingBOX"><UserSetting imcore={imcore} /></div>
            </h3>
            <p className="title-company">
              <Atlog href={activeContact.oppositeMainUrl} target="_blank" pushStr={titlePushStr}>
              {getBrief(activeContact.oppositeUserCompany, 15)}
              </Atlog>
            </p>
            <p className="homepage">
              <Atlog href={activeContact.oppositeMainUrl} target="_blank" pushStr={titlePushStr}>
                查看主页
              </Atlog>
            </p>
            {
              activeContact.oppositeUserKind == UserType.USER_TYPE_H && <ChatTitleCattention imcore={imcore} oppositeEmUserName={activeContact.oppositeEmUserName} uid={activeContact.oppositeUserId}/>
            }
          </div>
        </div>
      );
      case 'b':
      return (     
        <div className={rootClassName} style={style} onMouseDown={(e)=>onMouseDown(e)}>
          <Atlog href={`https://lpt.liepin.com/resume/showresumecarte4im?usercId=${activeContact.oppositeUserId}&oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" className="link-img" pushStr={titlePushStr}>
            <img src={`//image0.lietou-static.com/normal/${activeContact.oppositeUserPhoto}`} className="tinyFace circle"/>
          </Atlog>
          <div className="target-info">
            <h3>
              <Atlog href={`https://lpt.liepin.com/resume/showresumecarte4im?usercId=${activeContact.oppositeUserId}&oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" pushStr={titlePushStr}>
                {activeContact.oppositeUserName}
              </Atlog>
              <span className="job-info">{activeContact.oppositeUserSexName ? <em>{activeContact.oppositeUserSexName}</em> : ''}{activeContact.oppositeUserEdulevelName ? <em>{activeContact.oppositeUserEdulevelName}</em> : ''}<em>工作{activeContact.oppositeWorkAge}年</em><em title={activeContact.oppositeUserDqName}>{getBrief(activeContact.oppositeUserDqName,4)}</em></span>
            </h3>
            <p className="title-company">
              <Atlog href={`https://lpt.liepin.com/resume/showresumecarte4im?usercId=${activeContact.oppositeUserId}&oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" pushStr={titlePushStr}>
              <span>
                <i>{getBrief(activeContact.oppositeUserTitle, 10)}</i>
                <i>|</i>
                <i>{getBrief(activeContact.oppositeUserCompany, 15)}</i>
              </span>
              </Atlog>
            </p>
            <p className="homepage">
              <Atlog href={`https://lpt.liepin.com/resume/showresumecarte4im?usercId=${activeContact.oppositeUserId}&oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" pushStr={titlePushStr}>
                查看简历
              </Atlog>
            </p>
            <Shield imcore={imcore}/>
          </div>
        </div>
      );
      case 'h':
      titlePushStr = config.tlogs.CLICK_DIALOG_RESUMEBTN;
      return (     
        <div className={rootClassName} style={style} onMouseDown={(e)=>onMouseDown(e)}>
          <Atlog href={`https://h.liepin.com/resume/showresumedetail4im/?oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" className="link-img" pushStr={titlePushStr}>
            <img src={`//image0.lietou-static.com/normal/${activeContact.oppositeUserPhoto}`} className="tinyFace circle"/>
          </Atlog>
          <div className="target-info">
            <h3>
              <Atlog href={`https://h.liepin.com/resume/showresumedetail4im/?oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" pushStr={config.tlogs.CLICK_DIALOG_CONTACTSINFO}>
                {activeContact.oppositeUserName}
              </Atlog>
              <span className="job-info">{activeContact.oppositeUserSexName ? <em>{activeContact.oppositeUserSexName}</em> : ''}{activeContact.oppositeUserEdulevelName ? <em>{activeContact.oppositeUserEdulevelName}</em> : ''}<em>工作{activeContact.oppositeWorkAge}年</em><em title={activeContact.oppositeUserDqName}>{getBrief(activeContact.oppositeUserDqName,4)}</em></span>
            </h3>
            <p className="title-company">
              <Atlog href={`https://h.liepin.com/resume/showresumedetail4im/?oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" pushStr={config.tlogs.CLICK_DIALOG_CONTACTSINFO}>
              <span>
                <i>{getBrief(activeContact.oppositeUserTitle, 10)}</i>
                <i>|</i>
                <i>{getBrief(activeContact.oppositeUserCompany, 15)}</i>
              </span>
              </Atlog>
            </p>
            <p className="homepage">
              <Atlog href={`https://h.liepin.com/resume/showresumedetail4im/?oppositeEmUserName=${activeContact.oppositeEmUserName}`} target="_blank" pushStr={titlePushStr}>
                查看简历
              </Atlog>
            </p>
            <div className="attention-wrap">
            <ChatTitleHattention imcore={imcore}/>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  historyVisible: state.history.visible,
  dialogVisible: state.userSetting.dialogVisible,
  inBlack: state.shield.inBlack
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...dragActions,
    ...userSettingActions
  }, dispatch)
});

let ChatTitle1 = drag()(ChatTitle);
export default connect(mapStateToProps, mapDispatchToProps)(ChatTitle1);