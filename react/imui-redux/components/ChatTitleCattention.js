import React, {Component} from 'react';
import classnames from 'classnames';
import getConfig from '../config';
import {Atlog} from '../common/addTlog';
import {connect} from 'react-redux';

class ChatTitleCattention extends Component {
  constructor(props) {
    super(props);
    this.config = getConfig(props.imcore.env);
  }

  componentDidMount() {
    this.initAttention(this.props);
  }
  initAttention(props){
    LT.Attention = LT.Attention || Apps.Attention;
    LT.Attention.get(props.uid);
  }
  componentWillReceiveProps(nextProps){
    this.initAttention(nextProps);
  }
  attention(e){
    let {imcore, uid} = this.props;
    let that = this;
    window.tlog = window.tlog || [];
    if($('#im-root [data-selector="attention"]').hasClass('btn-attention-cancel')){
      tlog.push(that.config.tlogs.ATTENTION_BTN);
      LT.Attention.remove(uid);
    }else{
      tlog.push(that.config.tlogs.CANCEL_ATTENTION_BTN);
      LT.Attention.add(uid);
    }
  }
  render(){
    let {uid} = this.props;
    return(
      <Atlog href="javascript:;" data-uid={uid} className="btn-controller btn-attention btn-attention-add" data-selector="attention" ref='attention' onClick={()=>this.attention()}>关注</Atlog>
    )
  }
}

export default connect(null, null)(ChatTitleCattention);