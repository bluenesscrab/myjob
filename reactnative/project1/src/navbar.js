import React,{Component}from 'react';
import{
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';




class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let navigator = this.props.navigator;
    let leftIcon = null;
    if(Platform.OS === 'ios'){
      leftIcon = {uri:'leftarrow.png'};
    }else{
      leftIcon = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAoCAMAAADT08pnAAAAnFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+TINBkAAAAM3RSTlMA+wYC7A8K9vDnhjIg4tfLxKmjem9kOSsnFPPe2tPOv7u3sq6ZlWdaU0lAGAyekI5cURpQbJDXAAAA4UlEQVQoz23SRxaCQBREUWwyCAgqwZwlGdn/3qQ8OqF+De8bELo1aZ69zgTWk67rYnYVd/3O5NYBHpnkO/iE3JzAd9bQiwh+UENv1vCYfBzCbzr5Un7P3IV75L4Bn5KnX5+R14ueRxfyyoY/yV8jeEl+hdsV+Ry+qMkveB0nJVc23BcOMsCD5xovdQafRj+Dl4m/D8sDlAf5/yhOOpd3iJIIpdigHBUXM0LZW1zaLcq25WLtpUuIqSPKphBKghI2XPQTymqs8e4oQS4UD8XNhDJFMXyhzFBWxL/b4ZBipWtcP2FnJtbDyPbOAAAAAElFTkSuQmCC'};
    }
    return (
      <View style={styles.viewWrap}>
        <TouchableOpacity 
        style={[styles.box,{alignItems:'flex-start'}]}
        onPress={() => {
          if(navigator.getCurrentRoutes().length>1){
            navigator.pop(); 
          }else{
            if (Platform.OS === 'android') {
              NativeModules.IntentModule.finishPage();
            }else{
              NativeModules.RNBridgeModule.finishPage('http://www.liepin.com');
            }
            //react 跳转 native
          }
        }}>

          <Image source={leftIcon} style={styles.leftBtn} />
        </TouchableOpacity>
        <View style={[styles.box,{flex:3}]}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        
        <View style={styles.box}>
        </View>
      </View>
    )
  }
};
const styles=StyleSheet.create({
  viewWrap:{
    position:'absolute',
    top:0,
    right:0,
    left:0,
    paddingTop:20,
    backgroundColor: 'rgba(34,153,204,1)',
    flexDirection: 'row',
    alignItems:'stretch',
    ...Platform.select({
      ios: {
        height:64,
      },
      android:{
        height:60,
      }
    })
  },
  leftBtn:{
    alignItems:'center',
    marginLeft:15,
    width:12,
    height:20,
  },
  text:{
    fontSize:16,
    color:'#fff',
  },
  box:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});


export default Navbar;