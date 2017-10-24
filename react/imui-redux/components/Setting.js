import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {settingActions, setGreetingActions} from '../actions';
import '../css/Setting.css';
import SetGreeting from './SetGreeting';
import {PanelDialog} from '../common/Dialog';
import getConfig from '../config';

class Setting extends Component{
  constructor(props) {
    super(props);
    this.state = {
      settingDate: []
    };
    this.config = getConfig(props.imcore.env);
  }
  componentDidMount() {
    let {imcore, actions, setting, show} = this.props;
    let {settingDom, greetingBtn} = this.refs;
    imcore.env === 'c' && actions.settingList(imcore);
    setting && this.setState({
      settingDate: this.settingDate(setting)
    });

    //点击其他区域关闭设置弹层
    $(document).on('click.setting', function(event) {
      //link-open-setting 不知道怎么得到
      if($(settingDom).has(event.target).length === 0 && $('.link-open-setting').has(event.target).length === 0){
        actions.settingShow(true);
      }
      
    });
  }
  componentWillUnmount() {
    //取消事件绑定
    $(document).off('click.setting');
  }
  componentWillReceiveProps(nextProps){
    let {imcore, actions, setting} = this.props;
    this.setState({
      settingDate: this.settingDate(nextProps.setting)
    });
  }
  settingDate(options){
    let {imcore} = this.props;
    let settingDataBH = [{
        title: '消息提醒设置',
        event: 'message',
        option:[{
          icon: options.message,
          text: '接收消息并且提醒',
          status: true
        },{
          icon: !options.message,
          text: '接收消息但不提醒',
          status: false
        }]
      },{
        title: '对话框设置',
        event: 'dialog',
        option:[{
          icon: options.dialog,
          text: '按Enter发送消息',
          status: true
        },{
          icon: !options.dialog,
          text: '按Ctrl+Enter发送消息',
          status: false
        }]
      }];
    let settingDataC = [
      {
        title: '自动打招呼设置',
        event: 'greeting',
        option:[{
          icon: options.greeting,
          text: '开启',
          status: true,
          tips: '设置打招呼语'
        },{
          icon: !options.greeting,
          text: '关闭',
          status: false
        }]
      },{
        title: '沟通时自动应聘设置',
        event: 'application',
        option:[{
          icon: options.application,
          text: '开启',
          status: true
        },{
          icon: !options.application,
          text: '关闭',
          status: false
        }]
      }
    ];
    if(imcore.env === 'c'){
      return settingDataBH.concat(settingDataC);
    }else if(imcore.env === 'b' || imcore.env === 'h'){
      return settingDataBH;
    }
  }
  clickSelect(event, icon){
    let {imcore, actions, setting, greetingType} = this.props;
    setting[event] !== icon && actions.settingSelect(event, icon, setting, imcore, greetingType, this.config.tlogs);
  }
  showGreeting(status){
    let {imcore, actions} = this.props;
    if(status){
      actions.greetingShow(true);
      actions.settingShow(true);
    }
  }
  closeDialog(){
    let {imcore, actions} = this.props;
    actions.greetingShow(false);
    actions.settingShow(false);
  }
  render(){
    let {imcore, actions, setting, show, setGreetingShow} = this.props;
    let {settingDate} = this.state;

    return (
      <div className={classnames('set-box',{hide: !show})} ref="settingDom">
        {
          setting && settingDate.map((v,i)=>{
            return (
              <dl key={i}>
                <dt>{v.title}</dt>
                {
                  v.option && v.option.map((m,n)=>{
                    return (
                      <dd key={n}>
                        <label onClick={()=>this.clickSelect(v.event, m.status)}>
                          <em className={classnames('webim-icons16', {
                            'icons16-radio': !m.icon,
                            'icons16-radio-checked': m.icon
                          })}></em>
                          {m.text}
                        </label>
                        {m.tips && <a ref="greetingBtn" onClick={()=>this.showGreeting(m.icon)} className={classnames({muted: !m.icon})} href="javascript:;">{m.tips}</a>}
                      </dd>
                    )
                  })
                }
              </dl>
            )
          })
        }
        <span className='triangle'></span>
        <PanelDialog
            id="greeting"     
            visible={setGreetingShow}
            onClose={()=>{this.closeDialog()}}
            header={true}
            backBtn={true}
            footer={false}
            title="请选择打招呼语"
            position="bottom"
            width="100%"
          >
            <SetGreeting imcore={imcore} />
          </PanelDialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setting: state.setting.setting,
  show: state.setting.show,
  setGreetingShow: state.setGreeting.show
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...settingActions,
    ...setGreetingActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);