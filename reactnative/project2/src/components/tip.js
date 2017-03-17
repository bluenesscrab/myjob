import React,{Component} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {tipActions}  from '../core/tip';

class Tip extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let {tip} = this.props;
    if(tip.text){
      return (
      <View style={[styles.tipTextFrame, tip.position]}>
        <Text style={styles.text}>{tip.text}</Text>
      </View>
      );
    }
    else{
      return null;
    }
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const styles=StyleSheet.create({
  tipTextFrame:{position:'absolute',left:width*0.5-75,padding:10,overflow:'hidden',width:150,minHeight:60,borderRadius:4,backgroundColor:'rgba(0,0,0,0.75)',justifyContent:'center',alignItems:'center'},
  text:{color:'#fff', textAlign:'center'}
});

const mapStateToProps = state => ({
  tip: state.tip,
});

export default connect(mapStateToProps, null)(Tip);