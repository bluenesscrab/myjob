import React, {Component} from 'react';
import {UserType} from '@liepin/imcore/constants';
import {createSendMsgByPlainMsg} from '@liepin/imcore/messages/send';
import {Atlog} from '../common/addTlog';
import {getBrief, timeVisibleFormat} from '../utils';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {contactsActions, panelActions, historyActions} from '../actions';
import {dragMove} from '../common/dragResize';
import ChatForm from './ChatForm';
import ChatTitle from './ChatTitle';
import ChatHistory from './ChatHistory';
import getConfig from '../config';
import Message from './Message';
import Report from './Report';
import Toast from '../common/Toast';
import '../css/ChatWin.css';

class ChatWin extends Component {
  constructor(props) {
    super(props);  
    this.chatlistDom = null;
    this.config = getConfig(props.imcore.env);
    this.state={
      inputHeight: 40
    }
  }
  componentDidMount(){
    this.scrollToBottom();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.msgList.length !== nextProps.msgList.length){
      this.scrollToBottom();
    }
    if(this.props.loadingActiveContact !== nextProps.loadingActiveContact){
      this.scrollToBottom();
    }
  }
  setInputHeight(inputHeight) {
    this.setState({
      inputHeight
    });
  }
  scrollToBottom() {
    setTimeout(()=>{
      this.chatlistDom && $(this.chatlistDom).scrollTop(this.chatlistDom.scrollHeight);
    }, 100);
  }
  renderMsg(msg) {
    let {imcore, activeContact, msgcard} = this.props;

    return (
      <div key={msg.id}>
        {msg.time && <p className="time">{msg.time}</p>}
        <Message message={msg} imcore={imcore} scrollToBottom={()=>this.scrollToBottom()} activeContact={activeContact} msgcard={msgcard}/>
      </div>
    );
  }
  render() {
    let {imcore, activeContact, actions, style, msgList, historyVisible,loadingActiveContact, loadingInitialHistory, msgcard} = this.props;  
    if (!loadingActiveContact && !activeContact) {
      return null;
    }
    if (loadingActiveContact){
      return (
        <div className="chatwin" style={{background: '#fff'}} style={style}>
          <a href="javascript:;" className={classnames('close-chat',{blur: historyVisible})} onClick={()=>actions.unselectActiveContact(imcore)}>×</a>
          <div className="chatwin-loading"><em></em></div>
        </div>
      );
    }    
    return(
      <div className={classnames('chatwin', {hide: !activeContact})} style={style}>
        <a href="javascript:;" className={classnames('close-chat',{blur: historyVisible})} onClick={()=>actions.unselectActiveContact(imcore)}>×</a>
        <ChatTitle imcore={imcore} activeContact={activeContact}/>
        <div className={classnames('chat-main',{blur: historyVisible})} style={{height: 'calc(100% - ' + (66 + this.state.inputHeight)+ 'px)'}}>          
          <div className="chat-list" ref={(dom)=>{this.chatlistDom=dom;}}>
            <p className="check-all-history">
              <Atlog href="javascript:;" pushStr={this.config.tlogs.CLICK_HISTORY_LINK} onClick={()=>actions.showHistory(imcore)}>查看全部历史消息</Atlog>
            </p>
            {loadingInitialHistory && <div className="msg-list-loading"><em></em></div>}
            {msgList.map((msgWrap, index) => this.renderMsg(msgWrap, index)
            )}
          </div>
          <ChatForm imcore={imcore} setInputHeight={(height)=>this.setInputHeight(height)}/>
        </div>
        <ChatHistory imcore={imcore}/>
        <div id="chat-dialog-container"/>
        <Toast/>
      </div>
    )
  }
}

/*对msgList根据当前联系人进行筛选,合并内存中的缓存msg和从服务器获取的历史消息数据*/
const msgListFilterByContact = (contact, msgList, initialServerHistory, activeContact, loadingActiveContact)=>{  
  if(!loadingActiveContact){
    let formattedMsgList = msgList.filter((v)=> v.type==='err' || v.from===activeContact.oppositeEmUserName || v.to===activeContact.oppositeEmUserName);
    let allArr = initialServerHistory.concat(formattedMsgList);
    //allArr.sort((a,b)=>{return a.timestamp>b.timestamp?1:-1});
    //allArr.forEach(v=>console.log(v.timestamp));
    allArr = timeVisibleFormat(allArr);
    return allArr;
  }
  else{
    return [];
  }
}


const mapStateToProps = state => {
  return {
    activeContact: state.panel.activeContact,
    top: state.drag.top,
    right: state.drag.right,
    msgList: msgListFilterByContact(state.panel.activeContact, state.panel.msgList, state.history.initialServerHistory, state.panel.activeContact, state.panel.loadingActiveContact),
    historyVisible: state.history.visible,
    loadingActiveContact: state.panel.loadingActiveContact,
    loadingInitialHistory: state.history.loadingInitialHistory
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...contactsActions,
    ...panelActions,
    ...historyActions,
  }, dispatch)
});

let ChatWin1 = dragMove()(ChatWin);
export default connect(mapStateToProps, mapDispatchToProps)(ChatWin1);
