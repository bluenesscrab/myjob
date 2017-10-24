import React, {Component} from 'react';
import classnames from 'classnames';
import getConfig from '../config';
import {panelActions} from '../actions';
import {Atlog} from '../common/addTlog';
import {bindActionCreators} from 'redux';
import * as ActionType from '../actions/ActionType';
import {publish} from '../utils';
import {connect} from 'react-redux';
import '../css/ChatTitleHattention.css';

class ChatTitleHattention extends Component {
  constructor(props) {
    super(props);
    this.config = getConfig(props.imcore.env);
    this.state = {
      showHdrop:false
    }
  }
  componentDidMount() {
    //点击外部时关闭关注弹层
    $(document).on('click.showAttention', (e)=>{
      if(e.target === this.attentionBtn || e.target === this.attentionSelect || $(this.attentionSelect).has(e.target).length > 0) return false;
      this.closeAttentionDrop()
    });
  }
  componentWillUnmount() {
    //取消事件绑定
    $(document).off('click.showAttention');
  }
  showAttentionDrop(e){
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      showHdrop:true
    });
  }
  closeAttentionDrop(){ //关闭h端关注下拉弹层
    this.setState({
      showHdrop:false
    });
  }
  attention(e){
    e.stopPropagation();
    let {imcore,actions, dispatch,activeContact,cansendErrMsg} = this.props;
    window.tlog = window.tlog || [];
    tlog.push(this.config.tlogs.ATTENTION_BTN);
    Apps.Attention && Apps.Attention.add({ids:this.props.activeContact.usercEncodeId},()=>{
      actions.updateHattention(imcore,true);
    });
  }
  cancelAttention(e){
    e.stopPropagation();
    let {imcore,actions, dispatch,activeContact,cansendErrMsg} = this.props;

    window.tlog = window.tlog || [];
    tlog.push(this.config.tlogs.CANCEL_ATTENTION_BTN);
    Apps.Attention && Apps.Attention.remove(this.props.activeContact.usercEncodeId,()=>{
      this.setState({
        showHdrop:false
      });
      actions.updateHattention(imcore,false);
    });
  }
  changeGroup(e){
    e.stopPropagation();
    //调整分组
    Apps.Attention.add({
      ids: this.props.activeContact.usercEncodeId,
      mend: true
    },function(){
    });
  }
  render(){
    let {activeContact} = this.props;
    return(
      <div className="attention-wrap">
        <Atlog href="javascript:;"><em ref={(dom)=>{this.attentionBtn = dom;}} data-uid={activeContact.usercEncodeId} className={classnames('btn-controller','btn-attention', {'btn-attention-add': !activeContact.isAttention,'btn-attention-cancel': activeContact.isAttention})} data-selector="attention" onClick={activeContact.isAttention ? (e)=>this.showAttentionDrop(e) : (e)=>this.attention(e)}>{activeContact.isAttention ? '取消关注' : '关注'}</em></Atlog>
        {this.state.showHdrop ? <section ref={(dom)=>{this.attentionSelect = dom;}} className="attention-drop"><a href="javascript:;" className="change-group" onClick={(e)=>this.changeGroup(e)}>调整分组</a><a href="javascript:;" className="cancel-attention" onClick={(e)=>this.cancelAttention(e)}>取消关注</a></section> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeContact: state.panel.activeContact,
  cansendErrMsg: state.panel.cansendErrMsg
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...panelActions
  }, dispatch), dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatTitleHattention);