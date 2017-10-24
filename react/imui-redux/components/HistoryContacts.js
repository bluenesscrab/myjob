import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ContactInfo from './ContactInfo';
import ContactCard from './ContactCard';
import {contactsActions, panelActions, historyContactsActions} from '../actions';
import {Atlog} from '../common/addTlog';
import '../css/historyContacts.css';
import Dialog from '../common/Dialog';
import {MainDialog} from '../common/Dialog';


class HistoryContacts extends Component{
  constructor(props) {
    super(props);
    this.canload = true;
    this.curMsgPage = 0;
    this.state={
      hover: false, //用于是否显示card
    };
    this.containerDom = null;
  }
  componentDidMount() {
    let {imcore, actions, contacts, loading, nomore} = this.props;
    let that = this;
    let $container = $(this.containerDom);

    $container.on('scroll', function(){
      let containerHeight = $container.height();
      let scrollTop = this.scrollTop;
      let listHeight = $container.find('.scrolldiv').height();
      if(scrollTop + containerHeight + 20 > listHeight){
        that.props.firstLoaded & that.getHistoryContacts();
      }
    });
    $container.hover(function(){
      $(this).addClass('lihover');
    }, function(){
      $(this).removeClass('lihover');
    });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.activeTab.key !== this.props.activeTab.key && this.props.activeTab.key==='historycontacts'){
      Dialog.closeAllConfirm({parent: 'main'});    
    }
  }
  getHistoryContacts(){
    let {imcore, actions, loading, nomore} = this.props;
    if(!nomore && !loading) {
      actions.getHistoryContactsList(imcore);
    }
  }
  delContact(v,e) {
    let {actions,imcore} = this.props;
    Dialog.confirm({
      parent: 'main',
      onOk: ()=>{
        actions.deleteContact(imcore, v);
      },
      text: '确定删除该联系人吗'    
    });
    e.stopPropagation();
  }
  setHoverStyle() {
    this.setState({
      hover: true
    });
  }
  removeHoverStyle() {
    this.setState({
      hover:false
    });
  }
  renderList(){
    let {activeTab, firstLoaded, curMonthContacts, earlierContacts,  imcore, actions} = this.props;
    if(!firstLoaded){
      return (
        <div className="list-loading"><em></em></div>
      )
    }
    else{
      return (
          <div className="scrolldiv">
            <h4>本月</h4>
            <ul>
            {
              curMonthContacts.map((v,i)=>{
                return (
                  <li key={i} className="clearfix">
                    <a className="close" href="javascript:;" onClick={(e)=>this.delContact(v, e)}>×</a>
                    <ContactInfo imcore={imcore} contacts={v} isHistory={false} actions={actions}/>
                    <ContactCard imcore={imcore} contacts={v}/>
                  </li>
                )
              })
            }
            </ul>
            <h4>更早</h4>
           <ul>
            {
              earlierContacts && earlierContacts.map((v,i)=>{
                return (
                  <li key={i} onClick={()=>actions.selectContact(imcore, v)} className="clearfix" onMouseEnter={()=>{this.setHoverStyle()}} onMouseLeave={()=>{this.removeHoverStyle()}}>
                    <a className="close" href="javascript:;" onClick={(e)=>this.delContact(v, e)}>×</a>
                    <ContactInfo imcore={imcore} contacts={v} isHistory={false} actions={actions}/>
                    <ContactCard imcore={imcore} contacts={v}/>
                  </li>
                )
              })
            }
            </ul>
          </div>
      );
    }
  }
  render(){
    let {activeTab, actions} = this.props;
    return (
      <div className={classnames('historycontacts', {hide: activeTab.key!=='historycontacts'})} >
        <div className="history-contact-list" ref={(dom)=>this.containerDom=dom}>
          {this.renderList()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  activeTab: state.panel.activeTab,
  firstLoaded: state.historyContacts.firstLoaded,
  curMonthContacts: state.historyContacts.curMonthContacts,
  earlierContacts: state.historyContacts.earlierContacts,
  loading: state.historyContacts.loading,
  nomore: state.historyContacts.nomore
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...contactsActions,
    ...panelActions,
    ...historyContactsActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContacts);