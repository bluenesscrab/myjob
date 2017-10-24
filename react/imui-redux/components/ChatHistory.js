import React, {Component} from 'react';
import {Atlog} from '../common/addTlog';
import {historyTimeVisibleFormat} from '../utils';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {historyActions} from '../actions';
import HistoryMsg from './HistoryMsg';
import '../css/ChatHistory.css';

class ChatHistory extends Component{
  constructor(props){
    super(props);
    this.historylistDom = null;
    this.ie9 = navigator.userAgent.indexOf("MSIE 9.0")>0;
  }
  componentWillReceiveProps(nextProps) {
    let {imcore, visible, actions, history, lastmsgid, activeContact} = this.props;
    if(visible!==nextProps.visible && nextProps.visible===true){
      actions.getServerHistory(imcore, activeContact);
    }
    if(history.length !== nextProps.history.length && lastmsgid===-1){
      this.scrollToBottom();
    }
  }
  clickMore() {
    let {actions, imcore, loading, nomore, activeContact} = this.props;
    !loading && actions.getServerHistory(imcore, activeContact);
  }
  renderMoreLink() {
    let {loading, nomore, lastmsgid} = this.props;
    if(loading){
      return <p className="history-loading"><em></em></p>;
    }
    if(nomore && lastmsgid!==-1) {
      return <p className="history-nomore">没有更多历史记录</p>;
    }
    if(!nomore && !loading && lastmsgid !== -1){
      return <p className="history-more"><a href="javascript:;" onClick={()=>this.clickMore()}>更多历史记录</a></p>
    } 
  }
  scrollToBottom() {
    setTimeout(()=>{
      this.historylistDom && $(this.historylistDom).scrollTop(this.historylistDom.scrollHeight);
    }, 100);
  }
  render(){
    let {visible, actions, imcore, history, nomore, activeContact} = this.props;
    let style = {};
    this.ie9 && (style=Object.assign({}, {background: 'rgba(243,252,255,0.95)'}));
    return(
      <div className={classnames('chat-history', {hide: !visible})} style={style}>
        <div className="history-content" ref={(dom)=>{this.historylistDom=dom;}}>
          {this.renderMoreLink()}
          <div className="history-list">
          {
            history.map((v,i)=>{
              return <HistoryMsg env={imcore.env.toLowerCase()} message={v} key={v.id} isSend={true} userInfo={imcore.userInfo} targetInfo={activeContact}/>
            })
          }
          </div>
        </div>
      {
        history.length===0 &&
        <div className="no-history">
          <span>暂无历史消息记录</span>
        </div>
      }
        <a href="javascript:;" className="close-history" onClick={()=>{actions.hideHistory(imcore)}}>返回聊天页面</a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.history.visible,
  history: historyTimeVisibleFormat(state.history.serverHistory),
  nomore: state.history.nomore,
  loading: state.history.loading,
  lastmsgid: state.history.lastmsgid,
  activeContact: state.panel.activeContact
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...historyActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);