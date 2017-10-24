import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import getConfig from '../config';
import {getBrief} from '../utils';
import {Atlog} from '../common/addTlog';
import ContactInfo from './ContactInfo';
import ContactCard from './ContactCard';
import {contactsActions, panelActions} from '../actions';
import Dialog from '../common/Dialog';
import '../css/Contacts.css';

class Contacts extends Component{
  constructor(props) {
    super(props);
    this.config = getConfig(props.imcore.env);
    this.containerDom = null;
  }
  componentDidMount() {
    let {imcore, actions, contacts, loading, nomore} = this.props;
    let that = this;
    let $container = $(this.containerDom);
    let containerHeight = $container.height();

    $container.on('scroll', function(){
      let scrollTop = this.scrollTop;
      let listHeight = $container.find('ul').height();
      if(scrollTop + containerHeight + 20 > listHeight){
        that.props.firstLoaded && setTimeout(()=>that.getContacts(), 100);
      }
    });
    $container.hover(function(){
      $(this).addClass('lihover');
    }, function(){
      $(this).removeClass('lihover');
    });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.activeTab.key !== this.props.activeTab.key && this.props.activeTab.key==='contacts'){
      Dialog.closeAllConfirm({parent: 'main'});
    }
  }
  getContacts(){
    let {imcore, actions, loading, nomore} = this.props;
    if(!nomore && !loading) {
      actions.getContacts(imcore);
    }
  }
  delContact(v,e) {
    let {actions, imcore} = this.props;
    window.tlog = window.tlog || [];
    tlog.push(this.config.tlogs.DEL_CURRENT_MESSAGE);
    Dialog.confirm({
      parent: 'main',
      onOk: ()=>{
        actions.deleteContact(imcore, v);
      },
      text: '确定删除该聊天？'    
    });
    e.stopPropagation();
  }
  openHistoryContacts(){
    this.props.actions.selectTabByKey(this.props.imcore, 'historycontacts');
  }
  renderList(){
    let {activeTab, contacts, imcore, actions, firstLoaded, loading} = this.props;
    let style= imcore.env==='h' ? {height: 'calc( 100% - 36px)'} : {};
    if(!firstLoaded){
      return (
        <div className="contact-list" ref={(dom)=>this.containerDom=dom}>
          <div className="list-loading"><em></em></div>
        </div>
      )
    }
    else{
      return (
        <div ref={(dom)=>this.containerDom=dom} style={style}  className={classnames({'contact-list': true, 'contactlist-with-recent-contacts': imcore.env!=='c'})}>
          {imcore.env.toLowerCase() !== 'c' ? <Atlog href="javascript:;" pushStr={this.config.tlogs.CLICK_HISTORYCONTACTS} className="btn-recent-contacts" onClick={()=>this.openHistoryContacts()}><i className="recent-contacts"></i>最近联系人</Atlog> : null}
          <ul>
            {
              contacts.map((v,i)=>{
                return (
                  <li key={i} className="clearfix">
                    <a className="close" href="javascript:;" onClick={(e)=>this.delContact(v, e)}>×</a>
                    <ContactInfo imcore={imcore} contacts={v} isHistory={true} actions={actions}/>
                    <ContactCard imcore={imcore} contacts={v}/>
                  </li>
                )
              })
            }
          </ul>
          {contacts.length===0 ? <div className="no-contacts"><span>没有新的消息</span></div> : null}
        </div>
      )
    }
  }
  render(){
    let {activeTab, contacts, imcore, actions} = this.props;
    return (
      <div className={classnames('contacts', {hide: activeTab.key!=='contacts'})} >
        {this.renderList()}
        {imcore.env==='h' && <section className="to-old-version">
          <Atlog href={this.config.urls.tooldversion} target="_blank" pushStr={this.config.tlogs.OLD_VERSION}>
            旧版私信沟通记录<em className="webim-icons16 icons16-arrow-right-red"></em>
          </Atlog>
        </section>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeTab: state.panel.activeTab,
  contacts: state.contacts.contacts,
  firstLoaded: state.contacts.firstLoaded,
  nomore: state.contacts.nomore,
  loading: state.contacts.loading,
  opened: state.panel.opened
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...contactsActions,
    ...panelActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);