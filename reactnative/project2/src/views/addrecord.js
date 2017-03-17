import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cell,  Cells} from '../components/cell';
import {CustomButton as Button} from '../components/button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions}  from '../core/router';
import {recordActions}  from '../core/record';

class AddRecord extends Component {
  constructor(props){
    super(props);
    this.state={
      content:''
    };
  }
  getContent(text) {
    this.setState({content:text});
  }
  submitRecord() {
    let {client, actions} = this.props;
    actions.addRecord({customerId:client.id, linkmanId:client.contact.id, content:this.state.content, succCallback:()=>this.setState({content:''})});
  } 
  scrolldown(ref) {
    const self = this;
    if(height<500){
      this.refs[ref].measure((ox, oy, width, height, px, py) => {
          self.refs.scrollView.scrollTo({y: oy + 80});
      });
    }
  }
  scrollup(ref) {
    const self = this;
    if(height<500){
      this.refs[ref].measure((ox, oy, width, height, px, py) => {
          self.refs.scrollView.scrollTo({y: 0});
      });
    }
  }
  render() {
    let {client, actions} = this.props;
    return (
      <ScrollView ref="scrollView"> 
        <Cells>
          <Cell first={true} label="联系人" text={client.contact.name} onPress={()=>{actions.pushRouter({name:'contact'})}}/>
        </Cells>
        <View style={styles.form}>
          <View style={styles.labelwrap}>
            <Text style={styles.formlabel}>沟通内容</Text>
          </View>
          <View style={styles.textinputwrap}>
            <TextInput 
              style={styles.textinput}
              placeholder='请填写沟通内容'
              multiline={true}
              underlineColorAndroid={'transparent'} 
              onChangeText={(text)=>this.getContent(text)}
              value={this.state.content}
              onFocus={this.scrolldown.bind(this,'value')}
              onBlur={this.scrollup.bind(this,'value')}
              ref="value" 
            />
          </View>
        </View> 
        <View style={styles.optwrap}>
          <Button containerStyle={styles.button} large={true} disabled={client.contact.name===""||this.state.content===""} onPress={this.submitRecord.bind(this)}>提交</Button>
        </View>      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  labelwrap:{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:'#ddd',marginLeft:15,marginRight:15},
  textinputwrap:{marginTop:2,paddingLeft:15,paddingRight:15,paddingBottom:10},
  textinput:{  
    backgroundColor:'#fff',
    height:60,
    fontSize:14,
    color:'#666',
    textAlignVertical:'top'
  },
  optwrap:{paddingLeft:15, paddingRight:15,marginTop:15},
  form:{
    marginTop:15,backgroundColor:'#fff',borderTopWidth:StyleSheet.hairlineWidth,borderBottomWidth:StyleSheet.hairlineWidth,borderTopColor:'#ddd',borderBottomColor:'#ddd',
  },
  formlabel:{
    color:'#333',fontSize:14,lineHeight:18,marginTop:6,marginBottom:10
  },
});

const {
  width,
  height
} = Dimensions.get("window");

const mapStateToProps = state => ({
  client: state.client
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    ...recordActions
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);