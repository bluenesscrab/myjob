import React,{Component} from 'react';
import {
  Text,  View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Cell extends Component {
  constructor(props) {
    super(props);
  }
  _renderLeftIcon() {
    if(this.props.leftIcon){
      return(
        <View style={styles.lefticonwrap}>
          <Icon name={this.props.leftIcon} style={styles.lefticon}/>
        </View> 
      )
    }
    return null;
  }
  _renderRightIcon(){
    if(this.props.rightIcon|| (this.props.onPress && this.props.rightIcon!==false)){
      return (
        <View style={styles.righticonwrap}>
          <Icon name={"angle-right"} style={styles.righticon}/>
        </View>
      );
    }
    else{
      return null;
    }
  }
  _renderLabel(){
    let {label,labelCenter,labelStyle,labelwrapStyle,numberOfLinesLabel=1} = this.props;
    if(label){
      return (
        <View style={[styles.celllabelwrap, labelwrapStyle]}>
          <Text style={[styles.celllabel,labelCenter&&styles.labelcenter,labelStyle]} numberOfLines={numberOfLinesLabel}>{label}</Text>
        </View>
      );
    }
    else{
      return this.props.children;
    }
  }
  _renderText(){
    let {text,textStyle,textwrapStyle,numberOfLinesText=1} = this.props;
    if(text){
      return (
        <View style={[styles.celltextwrap, textwrapStyle]}>
          <Text style={[styles.celltext,textStyle]} numberOfLines={numberOfLinesText}>{text}</Text>
        </View>
      );
    }
    else{
      return null;
    }
  }
  _renderTextInput(){
    let {textInput, placeholder='请填写' , textinputwrapStyle, defaultValue, textinputStyle, onChangeText, onFocus} = this.props;
    if(textInput){
      return (
        <View style={[styles.textinputwrap, textinputwrapStyle]}>
          <TextInput 
            style={[styles.textinput, textinputStyle]}
            placeholder={placeholder}
            underlineColorAndroid={'transparent'} 
            onChangeText={onChangeText}
            defaultValue={defaultValue}
            onFocus={onFocus}
          />
        </View>
      );
    }
    else{
      return null;
    }
  }
  render () {
    let {onPress, leftIcon, rightIcon, text, textStyle, cellStyle, textwrapStyle,first,passthrough} = this.props;
    if (onPress){
      return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.cell,styles.celltouch, cellStyle,first&&styles.firstcell,passthrough&&styles.cellthrough]}>
          {this._renderLeftIcon()}
          {this._renderLabel()}
          {this._renderText()}
          {this._renderTextInput()}
          {this._renderRightIcon()}
        </View>
      </TouchableOpacity>
      );
    }
    else{
      return (
        <View style={[styles.cell,cellStyle,first&&styles.firstcell,passthrough&&styles.cellthrough]}>
          {this._renderLeftIcon()}
          {this._renderLabel()}
          {this._renderText()}
          {this._renderTextInput()}
          {this._renderRightIcon()}
        </View>   
      );
    }
  }
}

export class Cells extends Component {
  render () {
    let {style, ...other}=this.props;
    return (
      <View style={[styles.group, style]} {...other}>
        {this.props.children}
      </View>
    );
  }
}

const styles=StyleSheet.create({
  group:{marginTop:15,backgroundColor:'#fff',borderTopWidth:StyleSheet.hairlineWidth,borderBottomWidth:StyleSheet.hairlineWidth,borderTopColor:'#ddd',borderBottomColor:'#ddd',},
  cell:{flexDirection: 'row',borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:'#ddd',backgroundColor:'#fff',marginLeft:15,paddingRight:15},
  cellthrough:{marginLeft:0, paddingLeft:15},
  firstcell:{borderTopWidth:0},
  celltext:{color:'#666',fontSize:14,lineHeight:18,marginTop:10,marginBottom:12,textAlign:'right'},
  celltextwrap:{flex:1},
  celllabel:{color:'#333',fontSize:15,lineHeight:18,marginTop:10,marginBottom:12},
  celllabelwrap:{flex:1,paddingRight:8},
  labelcenter:{textAlign:'center'},
  celltouch:{paddingRight:0},
  righticon:{fontSize:24,color:'#ccc',textAlign:'center',
    ...Platform.select({
      ios: {
        paddingTop:7,
      },
      android:{
        marginTop:7
      }
    })
  },
  righticonwrap:{width:40,},
  lefticon:{fontSize:22,color:'#aaa',},
  lefticonwrap:{marginRight:10,width:34,justifyContent:'center'},
  textinputwrap:{flex:1},
  textinput:{  
    height:40, 
    paddingTop:5,
    paddingBottom:5,
    fontSize:14,
    color:'#666',
    textAlign:'right'
  },
});
