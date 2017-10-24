import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getBrief,dateFormat} from '../utils';
import {Atlog} from '../common/addTlog';
import {noticeActions} from '../actions';
import getConfig from '../config';
import NoticeDetail from './NoticeDetail';
import Dialog from '../common/Dialog';
import '../css/Notice.css';

class Notice extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showNoticeDetail:false,
      dialogVisible: false,
      canload:true
    };
  }
  componentDidMount() {
    let {imcore, actions,loading, nomore} = this.props;
    //监听收到的通知
    LT.Comet.on("event_msg_unread_cnt_change",({flag, data})=> {
      if (flag === 1 && data.s_unread_cnt > 0) {
        actions.showNoticeTabUnread(imcore);
        actions.getNoticeList(imcore,true);
      }
    });
  }
  scrollList(){
    let {imcore, actions} = this.props;
    let wrapHeight = this.refs.noticeWrap.clientHeight,
      listHeight = this.refs.noticeListH.offsetHeight,
      srcollH = this.refs.noticeWrap.scrollTop;
      if((listHeight-wrapHeight-srcollH)<50 && this.canload){
        this.canload = false;
        actions.getNoticeList(imcore);
      } 
  }
  componentWillReceiveProps(nextProps){
    let {sysMsgList} = nextProps;
    if(this.props.sysMsgList && sysMsgList.length!==this.props.sysMsgList.length && sysMsgList.length !== this.props.totalCnt){
      this.canload = true;
    }
    if(nextProps.activeTab.key !== this.props.activeTab.key && this.props.activeTab.key==='notice'){
      Dialog.closeAllConfirm({parent: 'main'});
    }
  }
  openDialog(){
    this.setState({dialogVisible:true});
  }
  closeDialog(){
    this.setState({dialogVisible:false});
  }
  selectNotice(imcore,noticeDetail,index){
    window.tlog = window.tlog || [];
    tlog.push(getConfig(imcore.env).tlogs.OPEN_NOTICE_LAYER);
    this.props.actions.hasReadNotice(imcore,noticeDetail,index);
    this.setState({
      showNoticeDetail:true,
      index:index,
      noticeDetail:noticeDetail
    });
  }
  closeDetail(imcore){
    this.setState({
      showNoticeDetail:false,
      index:0
    });
    if(imcore.env === 'b'){
      window.tlog = window.tlog || [];
      tlog.push(getConfig(imcore.env).tlogs.CLOSE_NOTICE_LAYER);
    }
  }
  delNoticeItem(e,id,type) {
    e.stopPropagation();
    let {actions,imcore} = this.props;
    window.tlog = window.tlog || [];
    tlog.push(getConfig(imcore.env).tlogs.DELETE_NOTICE);
    this.objectId = id;
    this.objectType = type;
    Dialog.confirm({
      parent:'main',
      text:'确定要删除通知吗',
      onOk:()=>{
        actions.deleteNoticeItem(imcore, this.objectId, this.objectType);
      }
    });
  }
  render(){
    let {activeTab, sysMsgList, totalCnt, imcore, actions,nomoreNotice, loading, firstLoaded,failMsg} = this.props;
    if(!firstLoaded){
      return(
        <div className={classnames({hide: activeTab.key!=='notice'},"notice")}>
        {failMsg ? <div className="fail-loading">{failMsg}，请刷新页面重试！</div> : <div className="list-loading"><em></em></div>}
        </div>
      );
    }
    else if(sysMsgList.length === 0){
      return (
        <div className={classnames({hide: activeTab.key!=='notice'},"notice")}>
          <div className="no-message"><span>暂无通知</span></div>
        </div>
      );
    }
    return (
      <div className={classnames({hide: activeTab.key!=='notice'},"notice")}>
        <div className="noticeWrap" ref="noticeWrap" onScroll={()=>this.scrollList()}>
          <ul className="notice-list" ref="noticeListH">
          {
           sysMsgList && sysMsgList.map((val,index)=>(
                <li key={index} onClick={()=>this.selectNotice(imcore,val,index)} data-id={val.id} data-type={val.type}>
                  <a href="javascript:;" className="close" onClick={(e)=>this.delNoticeItem(e,val.id,val.type)}>×</a>
                  <dl className="clearfix">
                    <dd>
                      <span className="clearfix">
                        <time>{val.createtime ? dateFormat(val.createtime, 'notice') : ''}</time>
                        <label>{getBrief(val.title, 5)}</label>
                        {val.readFlag === '0' ? <i className="dot">new</i> : ''}
                      </span>
                      <p>{LT.String.substr(val.context.charAt(0) === "<" ? $(val.context).text():$('<div></div>').html(val.context).text(),"0","84","…")}</p>
                    </dd>
                  </dl>
                </li>
              )
            )
          }
          </ul>
        </div>
        {this.state.showNoticeDetail ? <NoticeDetail index={this.state.index} canLoad={this.canload} closeDetail={this.closeDetail.bind(this)} imcore={imcore} noticeDetail={this.state.noticeDetail}/> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeTab: state.panel.activeTab,
  unReadTabs: state.panel.unReadTabs,
  sysMsgList: state.notice.sysMsgList,
  totalCnt: state.notice.totalCnt,
  firstLoaded: state.notice.firstLoaded,
  nomoreNotice: state.notice.nomoreNotice,
  loading: state.notice.loading,
  failMsg:state.notice.failMsg
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...noticeActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);