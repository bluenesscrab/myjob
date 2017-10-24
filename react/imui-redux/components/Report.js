import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reportActions, userSettingActions} from '../actions';
import {UserType} from '@liepin/imcore/constants';
import {ChatDialog, Dialog} from '../common/Dialog';
import {enums} from '../constants';

class Report extends Component{
  constructor(props) {
    super(props);
    this.state = {
      reportList : [{
        code: 5,
        text: '虚假信息'
      },{
        code: 3,
        text: '广告、非法、色情内容'
      },{
        code: 7,
        text: '其他'
      }]
    };
  }
  componentDidMount(){
  }
  showReportDialog(){
    let {imcore, actions} = this.props;
    actions.showReportDialog();
  }
  closeReportDialog(status){
    let {imcore, actions} = this.props;
    actions.closeReportDialog(function(){
      actions.hideUserSetting();
    });
  }
  setReport(code){
    let {imcore, actions} = this.props;
    actions.setReport(code);
  }
  addReport(){
    let that = this;
    let {imcore, actions, activeContact, reportCode, msgList} = this.props;

    actions.addReport(imcore, activeContact, reportCode, msgList, ()=>{
      that.closeReportDialog();
    });
  }
  render(){
    let {imcore, actions, reportCode, dialogVisible} = this.props;
    let {reportList} = this.state;
    return (
      <a href="javascript:;" onClick={()=>this.showReportDialog()}>
      举报
        <ChatDialog     
          id="report"  
          visible={dialogVisible}
          onClose={()=>{this.closeReportDialog()}}
          header={true}
          backBtn={false}
          footer={false}
          title="请在下方选取您的举报类型"
          position="bottom"
          width="100%"
        >
          <div className='report-dialog-box'>
            <p>
              {
                reportList.map((v,i)=>{
                  return (
                    <a key={i} className={classnames({'active': reportCode===v.code})} onClick={()=>this.setReport(v.code)} href='javascript:;'>{v.text}</a>
                  )
                })
              }
            </p>
            <div className='btns-group'><a href='javascript:;' className='btn btn-primary btn-mini' onClick={()=>this.addReport()}>提交举报</a></div>
          </div>
        </ChatDialog>
      </a>
    )
  }
}

/*对msgList根据当前联系人进行筛选,合并内存中的缓存msg和从服务器获取的历史消息数据*/
const msgListFilterByContact = (contact, msgList, initialServerHistory, activeContact)=>{  
  let formattedMsgList = msgList.filter((v)=> v.to===activeContact.oppositeEmUserName);
  let allArr = initialServerHistory.concat(formattedMsgList);
  return allArr;
}

const mapStateToProps = state => ({
  activeContact: state.panel.activeContact,
  reportCode: state.report.reportCode,
  dialogVisible: state.report.dialogVisible,
  msgList: msgListFilterByContact(state.panel.activeContact, state.panel.msgList, state.history.initialServerHistory, state.panel.activeContact)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...reportActions,
    ...userSettingActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);