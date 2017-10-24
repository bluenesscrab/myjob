import React, {Component} from 'react';
import {ExtType, MsgState} from '@liepin/imcore/messages/enums';
import {Emotions} from '../constants';
import {messageActions, toastActions, panelActions, historyActions} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import imgPreview from '../common/imgPreview';
import '../css/Message.css';
import {Txt,Image} from './MsgCards';

function Err(props) {
  let {message} = props;
  return <div className="err-msg" dangerouslySetInnerHTML={{ __html: message.data }}></div>
}

class Message extends Component {
  constructor(props) {
    super(props);  
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.message.state!==this.props.message.state){
      this.props.scrollToBottom();
    }
  }
  rendermessage(ifISend){
    let {message, msgcard} = this.props;
    let extType = (message.extType) || '';
    let type = message.type;
    let MsgCard = msgcard;
    if(type==='img'){
      return <Image {...this.props}/>
    }
    else if(type === 'err'){
      return <Err {...this.props}/>
    }
    else{
      if(MsgCard){
        return <MsgCard {...this.props} ifISend={ifISend}/>
      }
      else{
        return <Txt {...this.props}/>
      }
    }
  }
  render() {
    let {message, actions, imcore} = this.props;
    let ifISend = message.from===imcore.userInfo.oppositeEmUserName;
    return (
      <div className={classnames({message:true , send: ifISend, receive: !ifISend})}>
        <div className="header">
        </div>
        <div className="body clearfix">
          {this.rendermessage(ifISend)}
        </div>
        <div className="footer">
          {message.state === MsgState.SEND_FAILED && message.type!=='img' && <p className="resend"><em className="webim-icons16 icons16-error-red"></em>发送失败，点击<a href="javascript:;" onClick={()=>{actions.resendMsg(imcore, message)}}>重新发送</a></p>}
          {message.state === MsgState.SEND_FAILED && message.type==='img' && <p className="resend"><em className="webim-icons16 icons16-error-red"></em>发送失败</p>}
          {message.state === MsgState.PREPROCESS_FAILED && <p className="tips">{message.err}</p>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  allstate: state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    ...panelActions,
    ...historyActions
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);