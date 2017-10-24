import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../css/Toast.css';

class Toast extends Component{
  render() {
    let {text,top,show} = this.props.toast;
    //组件样式
    let compstyle = Object.assign({}, {top});
    let visible = (typeof(show)==='undefined'||show)?'block':'none';
    let mergedStyles = Object.assign(compstyle, {display: visible});
    return (
      <div>
        <div style={mergedStyles} className="toast">
          {text}
        </div>
      </div>
    );
  }  
}

const mapStateToProps = state => ({
  toast: state.toast,
});

export default connect(mapStateToProps, null)(Toast);