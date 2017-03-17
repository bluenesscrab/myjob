import React,{Component} from 'react';
import {
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';

export class CustomButton extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { containerStyle, style, ...other } = this.props;
    let newContainerStyle=[styles.primaryContainer,this.props.light&&styles.lightContainer,this.props.large&&styles.largeContainer,this.props.mini&&styles.miniContainer,this.props.disabled&&styles.disabledContainer,containerStyle];
    let newTextStyle=[styles.primaryText,this.props.light&&styles.lightText,this.props.large&&styles.largeText,this.props.mini&&styles.miniText,this.props.disabled&&styles.disabledText,style];
    return(
      <Button  {...other} containerStyle={newContainerStyle} style={newTextStyle}>
        {this.props.children}
      </Button>   
    )
  }
}

const styles=StyleSheet.create({
  primaryContainer:{height:34,overflow:'hidden', borderRadius:2, backgroundColor: '#f9be00',justifyContent:'center',alignItems:'center',},
  primaryText:{fontSize: 13, color: '#333'},
  lightContainer:{borderColor:'#ccc',borderWidth:0.5,backgroundColor:'#fff'},
  lightText:{color:'#444'},  
  disabledContainer:{borderWidth:0,backgroundColor:'#e5e5e5'},
  disabledText:{color:'#ccc'},
  largeContainer:{height:44},
  largeText:{fontSize: 16},
  miniContainer:{height:28},
  miniText:{fontSize:12},
});