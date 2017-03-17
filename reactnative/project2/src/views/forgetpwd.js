import React,{Component} from 'react';
import{
  Text,  View, StyleSheet
} from 'react-native';

export default class ForgetPwd extends Component {
  render () {
    let user = this.props.user;
    return (
      <View style={{flex:1}}>
        <Text style={Styles.text}>请联系当地HR重置密码</Text>
      </View>
    );
  }
}

const Styles=StyleSheet.create({
  text:{textAlign:'center',marginTop:60,fontSize:16,color:'#666'}
});
