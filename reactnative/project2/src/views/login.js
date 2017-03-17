import React,{Component} from 'react';
import{
  Text, 
  View,
  Image,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {CustomButton as Button} from '../components/button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userActions}  from '../core/user';
import {tipActions}  from '../core/tip';
import {routerActions}  from '../core/router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      inputFocused:false,
      input:{},
    };
  }
  login() {
    let {password, username} = this.state.input;
    if(!password||!username){
      this.props.actions.openTip('账号/密码错误');
    }
    else{
      this.props.actions.login(this.state.input);
    }
  }
  forgetPwd() {
    this.props.actions.pushRouter({name:'forgetpwd'});;
  }
  getUsername(val) {
    let input = Object.assign({}, this.state.input, {username:val});
    this.setState({
      input
    });
  }
  getPassword(val) {
    let input = Object.assign({}, this.state.input, {password:val});
    this.setState({
      input
    });
  }
  render(){
    return(
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <Image
            style={height<=500 ? styles.image_logo_ip4 : styles.image_logo} 
            source={require('../../images/logo.png')} resizeMode="stretch"/>
        <View style={styles.view_textinput}>
          <Text style={styles.text_label}>账号</Text>
          <TextInput 
            style={styles.textinput}
            numberOfLines={1}
            underlineColorAndroid={'transparent'} 
            onChangeText={this.getUsername.bind(this)}
            value={this.state.input.username}
            keyboardType='ascii-capable'
          />
        </View>
        <View style={[styles.view_textinput,styles.view_textinput_pwd]}>
          <Text style={styles.text_label}>密码</Text>
          <TextInput 
              style={styles.textinput}
              numberOfLines={1}
              secureTextEntry={true}
              underlineColorAndroid={'transparent'} 
              onChangeText={this.getPassword.bind(this)} 
              value={this.state.input.password}
              returnKeyType="done"
              onSubmitEditing={()=>this.login()}
          />
        </View>
        <Button containerStyle={styles.btn_container} keyboardType={'email-address'} disabled={!this.state.input.password || !this.state.input.username} large={true} onPress={this.login.bind(this)}>登录</Button>
        <TouchableOpacity style={styles.touch_forgetpwd} onPress={this.forgetPwd.bind(this)}>
          <Text style={styles.text_forgetpwd}>忘记密码</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const styles = StyleSheet.create({
  image_logo:{
    height:41.2,
    width:160,
    marginTop: 70,
    marginBottom:10,
    alignSelf:'center',
  },
  image_logo_ip4:{
    height:30.9,
    width:120,
    marginTop:40,
    marginBottom:5,
    alignSelf:'center'
  },
  image_logo_hide:{
    borderRadius:35,
    height:0,
    width:0,
    marginTop:10,
    marginBottom:10,
    alignSelf:'center',
  },
  view_textinput:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#ddd',
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    flexDirection:'row',
  },
  view_textinput_pwd:{  
    marginTop:0
  },  
  textinput:{  
    backgroundColor:'#fff',
    height:44,
    fontSize:16,
    color:'#333',
    flex:1
  },
  text_label:{
    width:50,
    color:'#999',
    fontSize:14,
    marginTop:14,
  },
  btn_container:{
    margin:20
  },
  touche_forgetpwd:{
    backgroundColor:'transparent'
  },
  text_forgetpwd:{
    color:'#666',
    fontSize: 14,
    textAlign:'right',
    marginRight:20,
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
    ...routerActions,
    ...tipActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);