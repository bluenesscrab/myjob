/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  BackAndroid,
  Navigator,
  Image,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import MainScreen from './views/MainScreen';
import Navbar from './navbar';

FormatData = (data) => {
  return {
    view_id:InitPram.view_id,
    device_uuid:InitPram.device_uuid,
    dev_type:InitPram.dev_type,
    client_id:InitPram.client_id,
    channel_code:InitPram.channel_code,
    version:InitPram.version,
    version_code:InitPram.version_code,
    user_token:InitPram.user_token,
    data: data,
    timestamp: new Date().getTime(),
  }
}

class yuer extends Component {

  constructor(props) {
    super(props);
    this.didMoun();
  }

  //获取 android  version,versioncode
  didMoun() {
    if( Platform.OS === 'ios'){
      let {view_id='' ,device_uuid='' ,dev_type='' ,client_id='' ,channel_code='' ,version='' ,version_code='' ,user_token='' } = (this.props?this.props:{});
      InitPram = {
        view_id:view_id,
        device_uuid:device_uuid,
        dev_type:dev_type,
        client_id:client_id,
        channel_code:channel_code,
        version:version,
        version_code:version_code,
        user_token:user_token,
      }
    }else{
      NativeModules.IntentModule.initParam((msg) => {
        let {view_id='' ,device_uuid='' ,dev_type='' ,client_id='' ,channel_code='' ,version='' ,version_code='' ,user_token='' } = JSON.parse(msg);
        InitPram = {
          view_id:view_id,
          device_uuid:device_uuid,
          dev_type:dev_type,
          client_id:client_id,
          channel_code:channel_code,
          version:version,
          version_code:version_code,
          user_token:user_token,
        };
      },(result) => {
        InitPram = {
          view_id:'',
          device_uuid:'',
          dev_type:'',
          client_id:'',
          channel_code:'',
          version:'',
          version_code:'',
          user_token:'',
        };
      });
    }
  }

  /// start 路由设置 back
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid () {
    const routers = _navigator.getCurrentRoutes();
    if (routers.length > 1) {
      _navigator.pop();
      return true;
    }
    return false;
  }
  /// end 路由设置 back

  render() {
    let defaultName = 'MainScreen';
    let defaultTitle = '设置';
    let defaultComponent = MainScreen;
    return (
      <View style={styles.container}>
        
        <Navigator
        initialRoute={{ name: defaultName, title: defaultTitle, component: defaultComponent}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          _navigator = navigator;
          return (
            <View style={styles.container}>
              <Navbar navigator={navigator} title={route.title} style={{borderWidth:1,height:60}}/>
              <Component {...route.params} navigator={navigator} />
            </View>
          );
        }} />
        
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ebebeb',
  },
});

AppRegistry.registerComponent('yuer', () => yuer);
