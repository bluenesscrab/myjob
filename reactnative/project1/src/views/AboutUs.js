import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableHighlight,
  Linking,
  LinkingIOS,
  NativeModules,
} from 'react-native';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: '1.0.12',
      phone:'400-6838-789',
      qq:'40031233',
      site:'www.liepin.com',
    };
    this.Tel = this.Tel.bind(this);
    this.Url = this.Url.bind(this);
  }
  Tel() {
    if(Platform.OS==='ios'){
      NativeModules.RNBridgeModule.RNInvokeOCTel();
    }else{
      Linking.openURL(`tel:${this.state.phone}`).catch(err => console.error('An error occurred', err));    
    }
  }
  Url() {
    if(Platform.OS==='ios'){
      NativeModules.RNBridgeModule.RNInvokeOCUrl();
    }else{
      Linking.openURL('http://m.weibo.cn/d/lietouwang?jumpfrom=weibocom').catch(err => console.error('An error occurred', err));    
    }
  }

  render(){
    let logoIcon = null;
    if(Platform.OS === 'ios'){
      logoIcon = {uri:'logo.png'};
     }else{
      logoIcon = {uri:'data:image/png;base64,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'};
    }
     return (
      <View style={styles.containView}>
        <Image source={logoIcon} style={styles.img} />
        <Text style={[styles.text,styles.titles]}>
          猎聘招聘版 {this.state.version}
        </Text>
        
        <TouchableHighlight
        onPress={()=>{this.Tel()}}
        underlayColor="#FFF">
          <View style={[styles.list,styles.borderTop]}>
            <Text style={styles.text}>服务热线</Text>
            <Text style={[styles.text,{color:'#3da1d0'}]}>{this.state.phone}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
        underlayColor="#FFF">
          <View style={styles.list}>
            <Text style={styles.text}>官方QQ群</Text>
            <Text style={[styles.text,{color:'#666'}]}>{this.state.qq}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
        underlayColor="#FFF">
          <View style={styles.list}>
            <Text style={styles.text}>官方网站</Text>
            <Text style={[styles.text,{color:'#666'}]}>{this.state.site}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={()=>{this.Url()}}
        underlayColor="#FFF">
          <View style={styles.list}>
            <Text style={styles.text}>官方微博</Text>
            <Text style={[styles.text,{color:'#3da1d0'}]}>@猎聘</Text>
          </View>
        </TouchableHighlight>

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
  img:{
    marginTop:20,
    width:107,
    height:102,
    alignSelf:'center',
  },
  text: {
    fontSize:14,
    alignSelf:'center',
    color:'#33444c',
  },
  titles:{
    fontWeight:'bold',
    padding:20,
    textAlign:'center',
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
  }
});
export default AboutUs;