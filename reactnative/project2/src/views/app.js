import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Navigator, Platform ,Alert} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Router, Route} from '../components/router';
import {routerActions}  from '../core/router';
import {userActions}  from '../core/user';
import Home from './home';
import Search from './search';
import AddRecord from './addrecord';
import Record from './record';
import AddOpportunity from './addopportunity';
import Opportunity from './opportunity';
import Snapshot from './snapshot';
import Album from './album';
import Login from './login';
import ForgetPwd from './forgetpwd';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contact from "./contact";
import Manager from './manager';

class App extends Component {
  _renderNavRight(rightTitle, rightLink) {
    return (
      <TouchableOpacity style={styles.rightWrap} onPress={() => this.props.actions.pushRouter({name:rightLink})}>
        <View>
          <Text style={styles.rightText}>
            <Icon name="list-ul" style={styles.rightIcon}/> {rightTitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  _renderNavLogout() {
    return (
      <TouchableOpacity style={styles.rightWrap} onPress={() => this.props.actions.logout()}>
        <View>
          <Text style={styles.rightText}>
            <Icon name="sign-out" style={styles.rightIcon}/> 退出
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  componentDidMount(){
    //未登录，去登录
    if(!this.props.user.token){
      this.props.actions.replaceRouter({name:'login'});
    }
  }
  render() {      
    return (
      <Router {...this.props} initial="home">
        <Route component={Home} name="home" navbar={true} title="客户拜访"  right={this._renderNavLogout()}/>
        <Route component={Search} name="search"/>
        <Route component={AddRecord} name="addrecord" navbar={true} title="添加沟通记录" leftBtn={true} right={this._renderNavRight("沟通记录", "record")}/>
        <Route component={Record} name="record" navbar={true} title="沟通记录" leftBtn={true} test={"1234"}/>
        <Route component={AddOpportunity} name="addopportunity" navbar={true} title="添加销售商机" leftBtn={true} right={this._renderNavRight("历史商机", "opportunity")}/>
        <Route component={Opportunity} name="opportunity" navbar={true} titleStyle={{fontSize:13}} title={()=>'销售商机-'+this.props.client.name} leftBtn={true} />
        <Route component={Snapshot} name="snapshot" navbar={true} title="快照" leftBtn={true}  right={this._renderNavRight("快照相册", "album")}/>
        <Route component={Album} name="album" navbar={true} title="快照相册" leftBtn={true}/>
        <Route component={Login} name="login" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />
        <Route component={ForgetPwd} name="forgetpwd" navbar={true} title="忘记密码" leftBtn={true}  />
        <Route component={Contact} name="contact" navbar={true} title="选择联系人" leftBtn={true}  />  
        <Route component={Manager} name="manager" navbar={true} title="选择行业经理" leftBtn={true}  />
      </Router>
    );
  }
}

var styles = StyleSheet.create({
  rightWrap: {position:'absolute',right:15,justifyContent:'center',alignItems:'center',
    height:50,
    ...Platform.select({
      ios: {
        top:20,
      },
      android:{
        top:0
      }
    })
  },
  rightText: {fontSize:12},
  rightIcon: {fontSize:12,textAlign:'center',fontWeight:'100',color:'#666'}
});

const mapStateToProps = state => ({
  router: state.router,
  user: state.user,
  client: state.client
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    ...userActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);