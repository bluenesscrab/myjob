import React,{Component} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {overlayActions}  from '../core/overlay';

class Overlay extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    if(this.props.overlay.loadingStack){
      return (//加载中蒙层
        <View style={[styles.container, {top:70}, {backgroundColor:'rgba(0,0,0,0)'}]}>
          <View style={styles.spinnerFrame}>
            <ActivityIndicator size="large" color="#fff"/>
          </View>
        </View>       
      );
    }else{
      return null;
    }
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const styles=StyleSheet.create({
  container:{backgroundColor:'rgba(52,52,52,0.8)',position:'absolute',top:0,bottom:0,left:0,right:0,flexDirection: 'row',justifyContent:'center',alignItems:'center'},
  spinnerFrame:{width:100,height:80,borderRadius:10,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center',},
});

const mapStateToProps = state => ({
  overlay: state.overlay,
});

export default connect(mapStateToProps, null)(Overlay);