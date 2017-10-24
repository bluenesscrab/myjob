import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGreetingActions} from '../actions';
import '../css/SetGreeting.css';

class SetGreeting extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let {imcore, actions, setting} = this.props;
  }
  componentWillReceiveProps(nextProps){
  }
  selectGreeting(code, name){
    let {imcore, actions, application, greeting} = this.props;
    actions.selectGreeting(imcore, code, name, application, greeting);
  }
  render(){
    let {imcore, actions, greetingList, greetingType} = this.props;

    return (
      <div className="greeting-box">
        <ul>
        {
          greetingList && greetingList.map((v,i)=>{
            return (
              <li key={i}>
                <label onClick={()=>this.selectGreeting(v.code, v.name)}>
                  <em className={classnames('webim-icons16', {
                    'icons16-radio': v.code!==greetingType,
                    'icons16-radio-checked': v.code===greetingType
                  })}></em>
                  {v.name}
                </label>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  greetingList: state.setGreeting.greetingList,
  greetingType: state.setGreeting.greetingType,
  greeting: state.setting.setting.greeting
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...setGreetingActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SetGreeting);