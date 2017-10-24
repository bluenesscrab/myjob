import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {UserType} from '@liepin/imcore/constants';
import getConfig from '../config';
import {getBrief,dateFormat} from '../utils';
import {Atlog} from '../common/addTlog';
import {noticeActions} from '../actions';
import '../css/NoticeDetailList.css';

class NoticeDetailList extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let {sysMsgList,imcore,noticeDetail} = this.props;
    return(
      <div className="scroll-box">
        {
          sysMsgList.map((val,index)=>{
            return (
              <section key={index} className="scroll-item" data-id={val.id} data-type={val.type}>
                <div className="title">{val.title}</div>
                <div className="content-box">
                 <p className="time">{dateFormat(val.createtime, 'notice')}</p>
                 <div className="content-main" dangerouslySetInnerHTML={{__html: val.context}}></div>
                </div>
              </section>
            )
          })
        }
      </div>
    )

  }
}

// const mapStateToProps = state => ({
//   noticeList: state.noticeList
// });

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({
//     ...noticeActions,
//   }, dispatch)
// });

//export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetailList);
export default NoticeDetailList;