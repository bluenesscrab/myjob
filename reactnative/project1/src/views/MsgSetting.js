import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  Platform,
  TouchableHighlight,
} from 'react-native';

class MsgSetting extends Component {
  constructor(props) {
    super(props);
    this.offOn = this.offOn.bind(this);
    this.reandSwitch = this.reandSwitch.bind(this);
    this.state = {
      system: false,
    };
  }

  reandSwitch(){ //ios android 开关
    if (Platform.OS === 'ios') {
      return ( <Text style={[styles.text,{color:'#666'}]}>已开启</Text> );
    }else{
      fetch('https://app-leiting.liepin.com/user/getPushOnOff.json',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Content-Encoding': 'gzip',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify( FormatData({}) )
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else{
          throw new Error(response.status)
        }
      }).then((json) =>{
        if(json.flag===0){
        } else {
          this.setState({system: json.data.isOpen});
        }
        return (
          <Switch
          onValueChange={(value) => {this.offOn(value) } }
          style={styles.switchs}
          value={this.state.system} />
        );
      }).catch((error) => {
        alert(error);
      });
    }
  }

  offOn(value){ // 系统开关
    this.setState({system: value});

    fetch('https://app-leiting.liepin.com/user/setPushOnOff.json',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Content-Encoding': 'gzip',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify( this.FormatData({'isOpen':value}) )
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else{
        throw new Error(response.status)
      }
    }).then((json) =>{
      if(json.flag===0){
        this.setState({system: !value});
      }else{
        alert('成功！');
      }
    }).catch((error) => {
      alert(error);
    });
  }

  render(){
    return (
      <View style={styles.containView}>
        <TouchableHighlight>
            <View style={styles.list}>
              <Text style={styles.text}>新消息提醒</Text>
              {this.reandSwitch()}
            </View>
          </TouchableHighlight>
          <Text style={styles.ather}>{Platform.OS === 'ios'?'如果你要关闭或开启猎聘的新消息通知，请在iPhone的“设置”-“通知”功能中，找到应用程序猎聘修改。':''}</Text>
      </View>
    );
  }
};

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
  switchs:{
    height: 32,
    alignSelf:'center',
  },
  text: {
    alignSelf:'center',
    fontSize:14,
    color:'#33444c',
  },
  list:{
    backgroundColor: '#fff',
    height:40,
    paddingLeft:15,
    paddingRight:15,
    marginTop:20,
    marginBottom:10,
    flex: 1,
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e4e4e4',
  },
  ather:{
    textAlign:'center',
    color:'#666',
    paddingLeft:8,
    paddingRight:8,
    fontSize:12,
  },
});
export default MsgSetting;