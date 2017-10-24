import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MsgEvent} from '@liepin/imcore/constants';
import * as ActionType from '../actions/ActionType';
import {panelActions, contactsActions, historyActions, historyContactsActions, settingActions, setGreetingActions, messageActions} from '../actions';
import ChatWin from './ChatWin';
import Setting from './Setting';
import getConfig from '../config';
import {Atlog} from '../common/addTlog';
import '../css/Panel.css';
import classnames from 'classnames';
import {comparePropsState} from '../utils';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.config = getConfig(props.imcore.env);
    this.state={
      dialogVisible:false
    };
    this.ie9 = navigator.userAgent.indexOf("MSIE 9.0")>0;
  }
  componentDidMount() {
    let that = this;
    let {imcore, actions, unRead, toggleUnRead, openPanel, opened, wrap, dispatch, componentDidMounted, settingShow, onSelectContact} = this.props;

    openPanel(()=>{
      window.tlog = window.tlog || [];
      tlog.push(this.config.tlogs.OPEN_PANEL);
      $(wrap).addClass('move-to-show');
      actions.openPanel(imcore);  
    });
    //初始化Panel
    actions.initPanel(imcore);

    /*监听所有本地消息事件*/
    imcore.event.on(MsgEvent.SEND_MSG, (msg)=>{
      actions.panelSendMsg(imcore, msg);      
    });    
    imcore.event.on(MsgEvent.RECEIVE_MSG, (msg)=>{
      actions.panelReceiveMsg(imcore, msg);      
    });
    imcore.event.on(MsgEvent.UPDATE_MSG, (msg)=>{
      actions.panelUpdateMsg(imcore, msg);      
    });
    imcore.event.on(MsgEvent.CONN_MSG, (msg)=>{
      actions.panelConnMsg(imcore, msg);      
    });

    /*监听所有广播事件*/
    let actionTypes = Object.keys(ActionType);
    actionTypes.forEach(v=>{
      imcore.subscribe(v, (type, action)=>{
        if(action.pageId !== imcore.pageId){
          dispatch({type: action.type, payload: action.payload});
        }
      });
    });

    componentDidMounted && componentDidMounted({imcore, actions, dispatch});

    imcore.event.on('selectContact', (contact)=>{
      onSelectContact && onSelectContact(contact);
    });

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.unRead !== this.props.unRead){
      //改变页面header里的红点
      this.props.toggleUnRead(nextProps.unRead); 
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    let {allstate, ...thisOthers} = this.props;
    let {allstate: allstate2, ...nextOthers} = nextProps;
    let thisProps = thisOthers;
    nextProps = nextOthers;  
    return comparePropsState(thisProps, this.state, nextProps, nextState);
  }
  openDialog(){
    this.setState({
      dialogVisible: true
    });
  }
  closePanel(){
    let {imcore, actions, wrap} = this.props;
    $(wrap).removeClass('move-to-show');
    actions.closePanel(imcore);
  }
  clickTab(v){
    let {actions,imcore} = this.props;
    actions.selectTab(imcore,v);
  }
  renderChatWin() {
    if(this.props.activeContact || this.props.loadingActiveContact) {
      return <ChatWin imcore={this.props.imcore} msgcard={this.props.msgcard}/>
    }
    else{
      return null;
    }
  }
  clickSetting(){
    let {actions, settingShow} = this.props;
    actions.settingShow(settingShow);
  }

  render() {
    let {imcore, actions, activeTab, unReadTabs, greetingType} = this.props;
    let style = this.ie9?{}:{zIndex:3};
    return (
      <div>
        <Setting greetingType={greetingType} imcore={imcore}/>
        <aside>
          <Atlog href="javascript:;" className="link-close-panel" onClick={()=>this.closePanel()} pushStr={this.config.tlogs.CLOSE_PANEL}>
            <i className="webim-icons16 icons16-arrow"></i>
          </Atlog>
          <ul>
          {activeTab && this.config.tabs.map((v,i)=>{
            return (
              <li key={i}>
                <Atlog href="javascript:;" onClick={()=>this.clickTab(v)} pushStr={this.config.tlogs['OPEN_'+v.key.toUpperCase()]}>
                  <i className={'side-icon'+' side-icon-'+v.key + (v.key===activeTab.key? ' active':'') }><em className={classnames({dot: true, hide: !unReadTabs[i]})}></em></i>
                  <span>{v.name}</span>
                </Atlog>
              </li>
            )
          })}
          </ul>
          <Atlog href="javascript:;" onClick={()=>this.clickSetting()} pushStr={this.config.tlogs.PANEL_SETTING} className="link-open-setting">
            <i className="webim-icons16 icons16-setting-white"></i>
          </Atlog>
        </aside>
        <div className="main-content">
          {
            activeTab && this.config.tabs.map((v,i)=>{
              let Main = v.comp;
              return <Main key={i} imcore={imcore}/>
            })
          }
          <div id="main-dialog-container"></div>
        </div>
        {this.renderChatWin()}
        <div id="panel-dialog-container"></div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allstate: state,
  activeTab: state.panel.activeTab,
  activeContact: state.panel.activeContact,
  unRead: state.panel.unRead,
  unReadTabs: state.panel.unReadTabs,
  opened: state.panel.opened,
  settingShow: state.setting.show,
  application: state.setting.setting.application,
  greeting: state.setting.setting.greeting,
  greetingType:state.setGreeting.greetingType,
  greetingText:state.setGreeting.greetingText,
  loadingActiveContact: state.panel.loadingActiveContact,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...panelActions,
    ...contactsActions,
    ...historyActions,
    ...historyContactsActions,
    ...settingActions,
    ...setGreetingActions,
    ...messageActions,
  }, dispatch), dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);