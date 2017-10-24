import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {shieldActions, userSettingActions} from '../actions';
import {UserType} from '@liepin/imcore/constants';
import {ChatDialog} from '../common/Dialog';
import {enums} from '../constants';
import getConfig from '../config';

class Shield extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tipDialog: false
    };
  }
  componentDidMount(){
    let {imcore, actions, activeContact, inBlack} = this.props;
  }
  setBlack(){ //要打开底部弹层的
    let that = this;
    let {imcore, actions, activeContact, inBlack, dialog} = this.props;
    let {tipDialog} = this.state;
    if(inBlack){ //text是解除屏蔽
      if(imcore.env === 'c'){
        actions.removeBlack(imcore, activeContact, inBlack, ()=>{
          actions.hideUserSetting();
          actions.changeText(imcore, inBlack);
        });
      } else if(imcore.env === 'b'){
        window.tlog = window.tlog || [];
        tlog.push(getConfig(imcore.env).tlogs.SHIELD_MSG_RELIVE);
        if(LT.Cookie.get(enums.COOKIE_KEY_DELETESHIELD)?eval(LT.Cookie.get(enums.COOKIE_KEY_DELETESHIELD)):true){
          actions.openDialog();
          this.setState({tipDialog: false});
        } else {
          actions.removeBlack(imcore, activeContact, inBlack, ()=>{
            actions.hideUserSetting();
            actions.changeText(imcore, inBlack);
          });
        }
      }
    } else { //text是屏蔽
      if(imcore.env === 'b') {
        window.tlog = window.tlog || [];
        tlog.push(getConfig(imcore.env).tlogs.SHIELD_MSG);
      }
      if(LT.Cookie.get(enums.COOKIE_KEY_SHIELD)?eval(LT.Cookie.get(enums.COOKIE_KEY_SHIELD)):true){
        actions.openDialog();
        this.setState({tipDialog: false});
      } else {
        actions.addBlack(imcore, activeContact, inBlack, ()=>{
          actions.hideUserSetting();
          actions.changeText(imcore, inBlack);
        });
      }
    }
  }
  toggleBlack(){
    let that = this;
    let {imcore, actions, activeContact, inBlack} = this.props;
    if(imcore.env === 'b') {
      let tlog = inBlack ? getConfig(imcore.env).tlogs.SHIELD_MSG_WINDOW : getConfig(imcore.env).tlogs.SHIELD_MSG_RELIVE_WINDOW;
      window.tlog = window.tlog || [];
      window.tlog.push(getConfig(imcore.env).tlogs.SHIELD_MSG);
    }
    if(inBlack){
      actions.removeBlack(imcore, activeContact, inBlack, ()=>{
        actions.hideUserSetting();
      });
    } else {
      actions.addBlack(imcore, activeContact, inBlack, ()=>{
        actions.hideUserSetting();
      });
    }
    actions.changeText(imcore, inBlack);
  }
  shieldDialogTips(){
    let {imcore, actions, activeContact, inBlack} = this.props;
    let text;
    if(imcore.env === 'c'){
      if(activeContact.oppositeUserKind == UserType.USER_TYPE_H){
        text = '屏蔽后，你将无法应聘对方发布的职位，对方将不能查看你的简历信息以及给你发送消息。';
      } else if(activeContact.oppositeUserKind == UserType.USER_TYPE_C){
        text = '屏蔽后，将解除双方现有关系，对方将不能给你发消息。';
      }
    } else if(imcore.env === 'b') {
      if(inBlack){
        text = '是否确认解除对该候选职聊消息的屏蔽？';
      } else {
        text = '屏蔽后您将不会再收到候选人的职聊信息！';
      }
    }
    
    return text;
  }
  showShielddialog(status){
    let {imcore, inBlack} = this.props;
    this.setState({tipDialog: !status});
    if(inBlack){
      LT.Cookie.set(enums.COOKIE_KEY_DELETESHIELD, status, 360, '/');
    } else {
      LT.Cookie.set(enums.COOKIE_KEY_SHIELD, status, 360, '/');
    }
    
  }
  closeShieldDialog(){
    let {imcore, actions, activeContact, inBlack, dialogVisible} = this.props;

    actions.closeDialog();
    actions.hideUserSetting();
  }
  render(){
    let {imcore, actions, activeContact, inBlack, dialogVisible} = this.props;
    let {tipDialog} = this.state;
    return (
      <a className={classnames({'btn-controller':imcore.env==='b', 'sheild-resume':imcore.env==='b'})} href="javascript:;" onClick={()=>this.setBlack()}>
      {inBlack?'解除屏蔽':(imcore.env==='c'?'屏蔽':'屏蔽消息')}
        <ChatDialog   
          id="shield"    
          visible={dialogVisible}
          onClose={()=>{this.closeShieldDialog()}}
          header={true}
          backBtn={false}
          footer={false}
          title='温馨提示'
          position='bottom'
          width='100%'
        >
          <div className='shield-dialog-box'>
            <p className='text-center'>
              {this.shieldDialogTips()}
            </p>
            <div className='btns-group'>
              <label onClick={()=>this.showShielddialog(tipDialog)}><em className={classnames('webim-icons16', {
                'icons16-checkbox': !tipDialog,
                'icons16-checkbox-checked': tipDialog
              })}></em>不再显示</label>
              <a href="javascript:;" onClick={()=>this.toggleBlack()} className='btn btn-primary btn-mini'>{imcore.env==='c'?'确认屏蔽':(inBlack?'解除屏蔽':'确认屏蔽')}</a>
            </div>
          </div>
        </ChatDialog>
      </a>
    )
  }
}

const mapStateToProps = state => ({
  activeContact: state.panel.activeContact,
  inBlack: state.shield.inBlack,
  dialogVisible: state.shield.dialogVisible
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...shieldActions,
    ...userSettingActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Shield);