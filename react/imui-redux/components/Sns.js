import React, {Component} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {snsActions} from '../actions';
import '../css/Sns.css';

class Sns extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let {activeTab, sns, imcore, actions} = this.props;

    return (
      <div className={classnames('sns', {hide: activeTab.key!=='sns'})}>
        {
          sns.map((v,i)=>{
            return (
              <ul key={i} className='contact-list'>
                {
                  v.map((m,n)=>{
                    if(m.count>=0){
                      return (
                        <li key={n}>
                          <a href={m.url} target='_blank'>
                            <dl className="clearfix">
                              <dt>
                                <span className={m.icon === 'person-arrow' || m.icon === 'person-arr' ? 'back-brown' : m.icon === 'building' ? 'back-red' : m.icon === 'concern' ? 'back-pink' :'back-blue'}><i className={classnames('webim-icons24', `icons24-${m.icon}`)}></i></span>
                                  <i className='dot'></i>
                              </dt>
                              <dd>{m.txt}</dd>
                              <dd className={classnames('number')}>{m.count}</dd>
                            </dl>
                          </a>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeTab: state.panel.activeTab,
  sns: state.sns.sns
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...snsActions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sns);