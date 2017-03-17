import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Image,
  NativeModules,
} from 'react-native';

import MsgSetting from './MsgSetting';
import Suggest from './Suggest';
import AboutUs from './AboutUs';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.toMsgSetting = this.toMsgSetting.bind(this);
    this.toSuggest = this.toSuggest.bind(this);
    this.aboutUs = this.aboutUs.bind(this);
    this.loginOut = this.loginOut.bind(this);

  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.myTextContent === this.props.myTextContent;
  }

  toMsgSetting() { //新消息通知
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
          name: 'MsgSetting',
          title: '新消息通知',
          component: MsgSetting,
      })
    }
  }
  toSuggest() { //意见反馈
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
          name: 'Suggest',
          title: '意见反馈',
          component: Suggest,
      })
    }
  }
  aboutUs() { //关于我们
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
          name: 'AboutUs',
          title: '关于我们',
          component: AboutUs,
      })
    }
  }
  loginOut() { //退出登录
    if( Platform.OS === 'ios' ){
      NativeModules.RNBridgeModule.RNInvokeOCLogout({name:'test',description:'http://www.liepin.com'});
    }else{
      NativeModules.IntentModule.logoutFromReactNative();
    }
  }

  render(){
    let rightIcon = null;
    if(Platform.OS === 'ios'){
      rightIcon = {uri:'rightarrow.png'};
     }else{
      rightIcon = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAMAAAArvOYAAAAAY1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMxy00NsAAAAIHRSTlMA9sHyEOOyWVAvvIQp7N3Yt402IhXSq5SOfHJkYkUdDOoAwKgAAACLSURBVBjTfdBZDoMwDARQ4iwkEJYC3Tff/5RVmSiOUqn+85Nl2dO8nKbYlNUxs/alKP5WX4jjvWaTxXSgMcjUAaRaoVbBLkJhBNEmy2aQXWSsB6mHkNewm1CcdhlEFotVGe7phHzVGf3wTP1GgOOaIFjA6V19ca0+1b5KY4pVYs78SZV+kl9JUSjhA7g8Eo36ERbSAAAAAElFTkSuQmCC'};
    }

    return (
      <View style={styles.containView} >
        <TouchableHighlight
        onPress={this.toMsgSetting.bind(this)}
        underlayColor="#B5B5B5">
          <View style={[styles.list,styles.mt20,styles.borderTop]}>
            <Text style={styles.text}>新消息提醒设置</Text>
            <Image source={rightIcon} style={styles.rightBtn} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight
        onPress={this.toSuggest.bind(this)}
        underlayColor="#B5B5B5">
          <View style={[styles.list,styles.mt20,styles.borderTop]}>
            <Text style={styles.text}>意见反馈</Text>
            <Image source={rightIcon} style={styles.rightBtn} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={this.aboutUs.bind(this)}
        underlayColor="#B5B5B5">
          <View style={styles.list}>
            <Text style={styles.text}>关于我们</Text>
            <Image source={rightIcon} style={styles.rightBtn} />
          </View>
        </TouchableHighlight>

        <TouchableOpacity
        onPress={this.loginOut.bind(this)}>
          <View style={styles.box}>
            <Text style={[styles.text, styles.btns]}>退出登录</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containView:{
    backgroundColor:'#ebebeb',
    ...Platform.select({
      ios: {
        marginTop:64,
      },
      android:{
        marginTop:60,
      }
    })
  },
  mt20: {
   marginTop:20,
  },
  list:{
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    backgroundColor: 'white',
    height:40,
    paddingLeft:15,
    paddingRight:15,
    flex: 1,
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent: 'space-between',
  },
  borderTop:{
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4',
  },
  text: {
    alignSelf:'center',
    fontSize:14,
    color:'#33444c',
  },
  rightBtn:{
    alignSelf:'center',
    marginLeft:15,
    width:8,
    height:12,
  },
  box: {
    margin:20,
    backgroundColor:'rgba(34,153,204,1)',
    height:40,
    borderRadius:4,
    flex:1,
    justifyContent:'center',
  },
  btns: {
    fontWeight:'bold',
    fontSize:16,
    color:'#fff',
  },
});
export default MainScreen;