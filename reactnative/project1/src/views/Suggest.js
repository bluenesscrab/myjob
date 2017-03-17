import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class Suggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.sub = this.sub.bind(this);
  }

  sub(){
    if(this.state.text.length>200){
      if (Platform.OS === 'android') {
        //
      }else{
        alert('最多输入200字');
      }
      return false;
    }
    fetch('https://app-leiting.liepin.com/user/feedback.json',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Content-Encoding': 'gzip',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(FormatData({'context':this.state.text}) )
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else{
        throw new Error(response.status)
      }
    }).then((json) =>{
      if(json.flag===0){

      } else {
        setTimeout(function(){
          _navigator.pop();
        },300);
      }
    }).catch((error) => {
      alert(error);
    });
  }

  render(){
     return (
      <View style={styles.containView}>
        <View style={styles.default}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => {
              let str = text.replace(/\s/g, '');
              this.setState({text: str});
            }}
            autoFocus={true}
            maxLength={200}
            multiline={true}
            numberOfLines={3}
            value={this.state.text}
            placeholder={'HI , 我是猎聘的产品经理 ,有什么建议，我们一定努力改进！'} />
        </View>
        <TouchableOpacity
        onPress={this.sub.bind(this)}>
          <View style={styles.box}>
            <Text style={styles.btns}>提交</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.ather}>
          {`欢迎您加入用户交流QQ群：1234567890\n关于招聘方App，您的意见很重要！`}
        </Text>
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
  default: {
    height: 150,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius:4,
    backgroundColor: '#fff',
    padding: 5,
    margin:14,
    marginBottom:0,
  },
  text:{
    padding:10,
    paddingTop:5,
    height:110,
    fontSize:14,
    color:'#666',
  },
  box: {
    margin:15,
  },
  btns: {
    padding:14,
    borderRadius:4,
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center',
    backgroundColor:'rgba(34,153,204,1)',
    color:'#fff',
  },
  ather:{
    textAlign:'center',
    color:'#666',
    fontSize:14,
    lineHeight:24,
  },
});
export default Suggest;