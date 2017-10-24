import React, {Component} from 'react';
import {UserType, ErrorType} from '@liepin/imcore/constants';
import {ImgMsg, TxtMsg} from '@liepin/imcore/messages/send';
import {checkFileType, checkFileSize} from '@liepin/imcore/upload/checkFile';
import {Emotions} from '../constants';
import {Atlog, InputTlog} from '../common/addTlog';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {messageActions, historyActions, settingActions, userSettingActions, toastActions} from '../actions';
import getConfig from '../config';
import classnames from 'classnames';
//import getFlashUpload from '../common/getFlashUpload';
import '../css/ChatForm.css';
//let getFlashUpload = ()=>{}

let emotionArr = [];
for(let i in Emotions){
  emotionArr.push({key: i, url: Emotions[i]});
}

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      emojiActive: false,
      historyActive: false,
      entrustActive: false,
      recommendActive: false,
      inputValue: '',
      messageVisible: false,
      clipboardImg: '',
      placeholderVisible: true,
    }
    this.config = getConfig(props.imcore.env);
    this.textarea = null;//文本框dom
    this.emojiEntrance = null;
    this.fakeDom = null;//虚拟文本框dom
    this.pictureDom = null; //隐藏的发送文件框
    this.iconSendPicDom = null; //发送图片icon
    this.sendBtnDom = null; //发送按钮
    this.userSettingDom = null; //发送弹层
    this.blob = null;
    this.ie9 = navigator.userAgent.indexOf("MSIE 9.0")>0;
    this.sending = false;
  }
  componentDidMount() {
    let that = this;
    let {actions} = this.props;
    let {sendBtn} = this.refs;

    //点击外部时关闭表情弹层
    $(document).on('click.emoji', (e)=>{
      if(e.target !== that.sendBtnDom && $(that.sendBtnDom).has(e.target).length === 0 && e.target !== that.userSettingDom && $(that.userSettingDom).has(e.target).length === 0){
        this.setState({messageVisible: false});
      }
      if(e.target === that.userSettingDom) return false;
      if(e.target===that.emojiEntrance) return false;
      that.disactiveEmoji();
    });
    this.textarea.style.height='40px';
    //初始化flashupload
    //WebIM.flashUpload = getFlashUpload({fileInputId: 'uploadShim', sendImage: this.sendImage.bind(this), imcore: this.props.imcore, iconDom: this.iconSendPicDom});
    $(document).on('keydown.clipboardImg', (e)=>{
      if(this.state.clipboardImg){
        this.handleKeyDown(e);
      }
    });
  }
  componentWillUnmount() {
    //取消事件绑定
    $(document).off('click.emoji');
    $(document).off('keydown.clipboardImg');
  }
  openMessage(status){
    this.setState({messageVisible: !status});
  }
  sendHandler() {
    let {imcore, activeContact, actions, cansendErrMsg} = this.props;
    let {userInfo} = imcore; 
    let msg;
    if(this.state.clipboardImg){
      if(!this.sending){
        this.sending = true;
        //发截图
        msg = new ImgMsg();
        msg.set({
          from: imcore.userInfo, 
          to: activeContact, 
          dataType:'img',
          data:{
            file:{
              data: this.blob, 
              url: this.state.clipboardImg, 
              filetype: 'jpg'
            }
          },
        });    
        actions.sendMsg(imcore, msg);
        this.onClearClipboardImg();
        setTimeout(()=>{
          this.sending = false;
        }, 300);
      }
    }
    else{
      let value = this.state.inputValue.trim();
      if(value && !this.sending){
        this.sending = true;
        msg = new TxtMsg();
        //msg.set({from: userInfo, to: activeContact, data: '', extType: 19})
        msg.set({from: userInfo, to: activeContact, data: value});

        this.textarea.value = '';
        this.textarea.style.height = '40px';
        this.setState({
          inputValue:''
        });
        this.props.setInputHeight(40);
        //发送文本消息
        actions.sendMsg(imcore, msg);
        //设置100毫秒间隔，避免重复提交
        setTimeout(()=>{this.sending = false}, 100);
        this.setState({placeholderVisible:true});
      }
    }
  }
  handleChange() {
    this.setState({
      inputValue: this.textarea.value
    }, ()=>{
      let inputHeight = $(this.fakeDom).height();
      this.textarea.style.height = inputHeight + 'px';
      this.props.setInputHeight(inputHeight);
    });
  }
  handleKeyDown(e) {
    if(this.sending) return;
    if(this.ie9 && this.state.placeholderVisible) {
      this.setState({placeholderVisible:false});
    }
    let {dialog} = this.props;
    let keyDown;
    if(dialog){
      keyDown = e.keyCode===13 && !e.ctrlKey;
    }
    else{
      keyDown = e.keyCode==13 && e.ctrlKey;
    }
    if(keyDown){
      this.sendHandler();
      e.preventDefault();
    }
  }
  toggleEmoji(e) {
    if(!this.state.emojiActive){
      this.setState({
        emojiActive: true
      }); 
      window.tlog = window.tlog || [];
      tlog.push(this.config.tlogs.OPEN_EMOJI);
    }
    else{
      this.disactiveEmoji();
    }
    e.nativeEvent.stopImmediatePropagation();
  }
  disactiveEmoji() {    
    this.setState({
      emojiActive: false
    });
  }
  activeHistory() {
    this.setState({
      historyActive: true
    });
  }
  disactiveHistory() {
    this.setState({
      historyActive: false
    });
  }
  activeEntrust() {
    this.setState({
      entrustActive: true
    });
  }
  disactiveEntrust() {
    this.setState({
      entrustActive: false
    });
  }
  activeRecommend() {
    this.setState({
      recommendActive: true
    });
  }
  disactiveRecommend() {
    this.setState({
      recommendActive: false
    });
  }
  onIconSendPicClick() {
    window.tlog = window.tlog || [];
    tlog.push(this.config.tlogs.SEND_IMAGE);
    this.pictureDom.click();
  }
  onImageFileChange(){
    //检查文件名和文件大小
    if(!checkFileType({fileInputId: this.pictureDom})){
      this.pictureDom.value = null;
      imcore.handleVisibleErr('UPLOAD_FILE_TYPE_ERROR');
      return false;
    }
    if(!checkFileSize({fileInputId: this.pictureDom})){
      this.pictureDom.value = null;
      imcore.handleVisibleErr('UPLOAD_FILE_OVERSIZE');
      return false;
    }

    this.sendImage();
  }
  sendImage(){
    let {activeContact, imcore, actions, cansendErrMsg} = this.props;
    let msg = new ImgMsg();
    msg.set({
      from: imcore.userInfo, 
      to: activeContact, 
      dataType:'img',
      data:{
        fileInputId: this.pictureDom,
        //flashUpload: WebIM.flashUpload,
        //apiUrl: WebIM.config.apiURL,
      },
      onFileUploadError: (error)=>{
        this.pictureDom.value = null;
      },
      onFileUploadComplete: (data)=>{
        this.pictureDom.value = null;
      },
    });    
    actions.sendMsg(imcore, msg);
  }
  selectEmotion(emotion) {
    this.textarea && (this.textarea.value += emotion.key);
    this.ie9 && this.state.placeholderVisible && this.setState({placeholderVisible: false});
    this.handleChange();
    this.textarea.focus();
  }
  handleClickEntrust() {
    let {actions, imcore, activeContact, cansendErrMsg} = this.props;
    actions.cEntrustResume(imcore, activeContact.oppositeEmUserName);
  }
  setMessage(status){
    let that = this;
    let {actions, imcore, setting} = this.props;
    actions.settingSelect('dialog', status, setting, imcore, '', that.config.tlogs);
  }
  recommendJob(){
    //推荐职位
    Apps.Recommend.hjob(this.props.activeContact.usercEncodeId);
  }
  renderCustomBtn() {
    let {entrustActive, recommendActive} = this.state;
    if(this.props.activeContact.oppositeUserKind == UserType.USER_TYPE_H){
      return(
        <Atlog href="javascript:;" className="link-entrust" pushStr={this.config.tlogs.CLICK_ENTRUST_ICON} onMouseEnter={()=>{this.activeEntrust()}} onMouseLeave={()=>this.disactiveEntrust()} onClick={()=>this.handleClickEntrust()}>
          <em className={classnames({'webim-icons16':true, 'icons16-arr-gray': entrustActive===false, 'icons16-arr-orange': entrustActive===true})} ></em> 委托简历
        </Atlog>
      );
    }
    if(this.props.imcore.env==='h'){
      return (
        <Atlog href="javascript:;" className="link-recommend" pushStr={this.config.tlogs.CLICK_RECOMMEND_ICON} onMouseEnter={()=>{this.activeRecommend()}} onMouseLeave={()=>this.disactiveRecommend()} onClick={()=>this.recommendJob()}>
          <em className={classnames({'webim-icons16':true, 'icons16-recommend-resume': recommendActive===false, 'icons16-recommend-orange': recommendActive===true})}></em> 推荐职位
        </Atlog>
      )
    }
    return null;
  }
  onPaste(event) {
    if (event.clipboardData || event.originalEvent) { //chrome
      let clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
      if (clipboardData.items) {
        let items = clipboardData.items;
        let v;
        if (!items.length) return;
        for(let i=0; i<items.length; i++){
          v = items[i];
          if (v.type.indexOf('image') !== -1) {
            let blob = v.getAsFile();
            if(blob.size===0) return;
            let url = window.URL.createObjectURL(blob);
            this.setState({clipboardImg: url});
            this.blob = blob;
            return;
          }
        }
      }
    }
  }
  onClearClipboardImg(){
    this.setState({
      clipboardImg: ''
    });
    this.props.setInputHeight(40);
    this.textarea.value = '';
    this.setState({
      inputValue:''
    });
    this.textarea.style.height = '40px';
    this.blob = null;
  }
  onLoadClipboardImg(){
    this.props.setInputHeight(this.refs.cbimg.height+5);
  }
  onTextareaBlur(){
    if(!this.textarea.value){
      this.setState({placeholderVisible:true});
    }
  }
  setTextareaFocus(){
    this.textarea.focus();
  }
  render(){
    let {activeContact, imcore, actions, dialog} = this.props;
    let {emojiActive, historyActive, inputData, messageVisible} = this.state;
    return(
      <div className="chat-form">
        <div className="top-options clearfix">
          <div className="upload-wrap">
            <input type="file" ref={(dom)=>{this.pictureDom=dom}} className="hide" onChange={()=>this.onImageFileChange()}/>
            <input id="uploadShim" className="hide"/>
            <a href="javascript:;" ref={(dom)=>{this.iconSendPicDom=dom}} onClick={()=>{this.onIconSendPicClick()}} className={classnames({hide:this.ie9})}><em className="webim-icons16 icons16-picture"></em></a>
          </div>
          <div className={classnames({'emoji-wrap':true, 'emoji-wrap-ie9': this.ie9})}>
            <em onClick={(e)=>this.toggleEmoji(e)} className={classnames({'webim-icons16':true, 'icons16-smile':emojiActive===false,'icons16-smile-orange':emojiActive===true})} ref={(dom)=>{this.emojiEntrance = dom;}}></em>
            <ul className={classnames({hide:emojiActive===false})}>
              {emotionArr.map((emotion, index) => 
              <li key={index} onClick={()=>this.selectEmotion(emotion)}><img src={emotion.url} alt=""/></li>
              )}                
            </ul>
          </div>
          <Atlog href="javascript:;" className="link-history" onClick={()=>actions.showHistory(imcore)} pushStr={this.config.tlogs.CLICK_HISTORY_ICON} onMouseEnter={()=>{this.activeHistory()}} onMouseLeave={()=>this.disactiveHistory()}>
            <em className={classnames({'webim-icons16':true, 'icons16-history-gray': historyActive===false, 'icons16-history-orange': historyActive===true})}></em> 历史消息
          </Atlog>
          {this.renderCustomBtn()}
        </div>
        <div className="fake-textarea" ref={(dom)=>{this.fakeDom=dom;}}>{this.state.inputValue}</div>
        <div className={classnames({'clipboard-img-wrap':true, hide:this.state.clipboardImg===''})}>
          <a href="javascript:;" className="close-btn" onClick={()=>this.onClearClipboardImg()}>×</a>
          <img src={this.state.clipboardImg} onLoad={()=>{this.onLoadClipboardImg()}} ref="cbimg"/>
        </div>
        <div className="relative">
          <textarea maxLength="800" className={classnames({textarea:true, hide: this.state.clipboardImg!==''})} placeholder={imcore.env==='h' ? '说点什么…' : '说点什么…（为了您的个人隐私安全，请不要轻易向对方泄露您的联系方式）'}
          onChange={(e)=>this.handleChange(e)} onKeyDown={(e)=>{this.handleKeyDown(e)}} ref={(input)=>{this.textarea=input;}} onPaste={(e)=>this.onPaste(e)} onBlur={()=>this.onTextareaBlur()}></textarea>
          {this.ie9 && <div className={classnames({'ie9-placeholder':true, hide:!this.state.placeholderVisible})} onClick={()=>{this.setTextareaFocus()}}>{imcore.env==='h' ? '说点什么…' : '说点什么…（为了您的个人隐私安全，请不要轻易向对方泄露您的联系方式）'}</div>}
        </div>
        <div className={classnames({'send-wrap': true, 'send-disabled': this.state.sending})}>
          <Atlog className="btn-send" href="javascript:;" pushStr={this.config.tlogs.CLICK_SEND_BTN} onClick={()=>this.sendHandler()}>发送</Atlog>
          <span ref={(dom)=>{this.sendBtnDom = dom;}} onClick={()=>{this.openMessage(messageVisible)}}><em></em></span>
          <div ref={(dom)=>{this.userSettingDom = dom;}} className={classnames('dialog-setting-box', {hide: !this.state.messageVisible})}>
            <ul>
              <li onClick={()=>{this.setMessage(true)}}><em className={classnames('webim-icons16', {'icons16-radio': !dialog,'icons16-radio-checked': dialog})}></em>按Enter发送消息</li>
              <li onClick={()=>{this.setMessage(false)}}><em className={classnames('webim-icons16', {'icons16-radio': dialog,'icons16-radio-checked': !dialog})}></em>按Ctrl+Enter发送消息</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeContact: state.panel.activeContact,
  cansendErrMsg: state.panel.cansendErrMsg,
  setting: state.setting.setting,
  dialog: state.setting.setting.dialog
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...historyActions,
    ...messageActions,
    ...settingActions,
    ...userSettingActions
  }, dispatch),dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);