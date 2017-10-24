import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ActionType from '../actions/ActionType';
import classnames from 'classnames';
import '../css/Dialog.css';

const emptyFn = ()=>{};

class DialogContent extends Component{
  constructor(props){
    super(props);
  }
  renderFooter(){
    const {footer, onCancel = emptyFn, onOk = emptyFn, onClose = emptyFn, cls:{footerCls}, okVal='确定', cancelVal='取消'} = this.props;
    if (!footer) return null;
    if (typeof footer==='boolean'){
      return (
        <div className={classnames('im-dialog-footer', {[`${footerCls}`]: !!footerCls})}>
          <a className="btn-ok" href="javascript:;" onClick={()=>{onOk();onClose();}}>{okVal}</a>
          <a className="btn-cancel" href="javascript:;" onClick={()=>{onCancel();onClose();}}>{cancelVal}</a>
        </div>
      );
    }
    else{
      return footer(this.props);
    }
  }
  render(){
    let {cls: {dialogCls = '', headerCls = '', maskCls = '', mainCls = '', contentCls = '', footerCls = ''}, width=200, position='center', title, closeBtn=true, backBtn, footer, children, visible, onCancel = emptyFn, onOk = emptyFn, onClose = emptyFn, onBack = emptyFn, content} = this.props;
    let style={};
    if(width==='100%'){
      style={width, marginLeft:0, left:0,borderRadius:0};
    }
    else{
      width=width-0;
      style={width, marginLeft:-(width/2)};
    }
    return (
      <div className={classnames('im-dialog', 'im-dialog-'+position, {hide: !visible, [`${dialogCls}`]: !!dialogCls})}>
        <div className={classnames('im-dialog-mask', {[`${maskCls}`]: !!maskCls})}></div>
        <div className={classnames('im-dialog-main', {[`${maskCls}`]: !!maskCls})} style={style}>
          {closeBtn && <a href="javascript:;" className="btn-close" onClick={()=>{onCancel();onClose()}}>×</a>}
          {title && <div className={classnames('im-dialog-header', {[`${headerCls}`]: !!headerCls})}>
            {backBtn && <a href="javascript:;" className="btn-back" onClick={()=>{onBack();onClose()}}><em className="webim-icons24 icons24-back "></em></a>}
            <span className="title">{typeof title==='string' ? title : ''}</span>
          </div>}
          <div className={classnames('im-dialog-content', {[`${contentCls}`]: !!contentCls})}>
            {children || content}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}
DialogContent.defaultProps = {
  cls:{}
};

class Dialog extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.appendDialog();  
  }
  componentDidUpdate() {    
    this.appendDialog();
  }
  appendDialog(){
    let {id, parent = 'panel'} = this.props;
    let dialogOrigin = $(`#${parent}-dialog-container`);
    let dialog = dialogOrigin;
    if(id){
      dialog = $(`#${parent}-dialog-container-${id}`);
      if(!dialog.length){
        dialog = $(dialogOrigin).after(`<div id="${parent}-dialog-container-${id}"></div>`);
      }
    }

    if(dialog.length){
      ReactDOM.unstable_renderSubtreeIntoContainer(this, <DialogContent {...this.props}/>, dialog[0]);
    }
  }
  render(){
    return null;
  }
}

Dialog.propTypes = {
  parent: PropTypes.string,
  cls: PropTypes.object, //各级自定义classnames的集合
  title: PropTypes.oneOfType([ 
    PropTypes.bool,
    PropTypes.string,
  ]),//标题
  footer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
  ]),//按钮行
  backBtn: PropTypes.bool,//标题返回钮
  onCancel:PropTypes.func,
  onOk:PropTypes.func,
  onBack:PropTypes.func,
  okVal:PropTypes.string,
  cancelVal:PropTypes.string,
  width: PropTypes.oneOfType([//总宽度
    PropTypes.number,
    PropTypes.string,
  ]),
  content: PropTypes.oneOfType([//内容，可以是文本也可以是元素
    PropTypes.element,
    PropTypes.string,
  ]),
  closeBtn: PropTypes.bool,
  position: PropTypes.oneOf(['bottom', 'center'])//靠下还是居中，默认center
};

function ChatDialog(props) {
  let {children, ...rest} = props;
  return <Dialog {...rest} parent="chat">{children}</Dialog>
}

function PanelDialog(props) {
  let {children, ...rest} = props;
  return <Dialog {...rest} parent="panel">{children}</Dialog>
}

function MainDialog(props) {
  let {children, ...rest} = props;
  return <Dialog {...rest} parent="main">{children}</Dialog>
}
/*支持time*/
function confirm(props) {
  let {parent ='panel', } = props;
  let $confirm = $(`#${parent}-dialog-container-confirm`);
  if($confirm.length===0){
    $(`#${parent}-dialog-container`).after(`<div id="${parent}-dialog-container-confirm"></div>`);
    $confirm = $(`#${parent}-dialog-container-confirm`);
  }
  let {onClose, outerClose = emptyFn, text, time, ...rest} = props;
  const onConfirmClose = ()=>{
    if($confirm.length){
      ReactDOM.unmountComponentAtNode($confirm[0]);
    }
  }
  time && setTimeout(()=>{onConfirmClose()}, time);
  outerClose(onConfirmClose);
  ReactDOM.render(
    <DialogContent onClose={()=>onConfirmClose()} content={<p className="confirm-msg">{text}</p>} {...rest}/>
  , $confirm[0]);
}
/*外部关闭dialog用法：
setTimeout(()=>Dialog.closeAllConfirm({parent:'main'}), 1000)
*/

Dialog.closeAllConfirm = function (props) {
  let {parent ='panel'} = props;
  let $confirm = $(`#${parent}-dialog-container-confirm`);
  if($confirm.length){
    ReactDOM.unmountComponentAtNode($confirm[0]);
  }
}

Dialog.confirm = function (props) {
  let config = Object.assign({
    footer: true,
    width: 200,
    position: 'center', 
    visible: true
  }, props);
  return confirm(config);
};

Dialog.info = function (props) {
  let config = Object.assign({
    footer: false,
    width: 200,
    position: 'center', 
    visible: true,
    closeBtn: false,
  }, props);
  return confirm(config);
};

let alertFooter = function(props){
  let {onOk=()=>{}, onClose=()=>{}} = props;
  return(
    <div className="im-dialog-footer im-dialog-alert-footer">
      <a className="btn-ok" href="javascript:;" onClick={()=>{onOk();onClose();}}>确 定</a>
    </div>
  )
};

Dialog.alert = function (props) {
  let config = Object.assign({
    footer: alertFooter,
    width: 200,
    position: 'center', 
    visible: true
  }, props);
  return confirm(config);
};


export default Dialog;
export {ChatDialog, MainDialog, PanelDialog};

