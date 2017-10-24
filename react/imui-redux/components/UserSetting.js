import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userSettingActions} from '../actions';
import {UserType} from '@liepin/imcore/constants';
import {ChatDialog} from '../common/Dialog';
import Shield from './Shield';
import Report from './Report';
import '../css/UserSetting.css';

class UserSetting extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }
  render(){
    let {imcore, actions, activeContact, dialogVisible} = this.props;
    return (
      <div ref="usersettingBtn" className={classnames('shield-box', {'hide':!dialogVisible})}>
        {
          (activeContact.oppositeUserKind != UserType.USER_TYPE_B) && <Shield imcore={imcore}/>
        }
        {imcore.env === 'c' && <Report imcore={imcore} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeContact: state.panel.activeContact,
  dialogVisible: state.userSetting.dialogVisible
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userSettingActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);