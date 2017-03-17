import React, {Component} from 'react';
import {Text, View, ScrollView, ListView, TouchableOpacity, StyleSheet, 
  Platform, ActivityIndicator, InteractionManager} from 'react-native';
import {Cell,  Cells} from '../components/cell';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions}  from '../core/router';
import {clientActions}  from '../core/client';
import {contactActions}  from '../core/contact';

class Contact extends Component {
  constructor(props){
    super(props);
    this.state={
      firstEntered: true,
      isLoadingMore: false
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.getContact({
        customerId:this.props.client.id, 
        curPage: 0,
        succCallback:(data)=>{
          this.setState({firstEntered: false});
        }
      });
    });
  } 
  selectContact(v) {
    let {actions} = this.props;
    actions.selectContact({contact:v, succCallback:()=>actions.popRouter()});
  }
  render() {
    let {actions, contact} = this.props;
    return (
      <View style={{flex:1}}>
        <ListView
          keyboardShouldPersistTaps={true} 
          keyboardDismissMode="on-drag"
          enableEmptySections={true}
          dataSource={this._genSourceData(contact.contactList)}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={100}
        />
      </View>
    );
  }
  _genSourceData(data){
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    return ds.cloneWithRows(data);
  }
  _renderRow(rowData){
    return <Cell passthrough={true} label={rowData.name} rightIcon={false} onPress={() => this.selectContact({contact:{id:rowData.id, name:rowData.name}})}/>
  }
  _renderFooter(){
    let {contact} = this.props;
    if(contact.more && contact.contactList.length){
      return (<View style={styles.more}>
        {this.state.isLoadingMore? <ActivityIndicator style={styles.loadingIcon} color="#aaa"/> : <Text style={styles.footerText}>更多</Text> }
      </View>);
    }
    else if(contact.contactList.length===0 && !this.state.firstEntered){
      return <View><Text style={styles.nonetext}>没有联系人</Text></View>
    }
    else{
      return null;
    }
  }
  _onEndReached() {
    let {contact, client, actions} = this.props;
    if(!contact.more || this.state.isLoadingMore || !contact.contactList.length) return;
    this.setState({isLoadingMore:true});
    actions.getContact({
      customerId: client.id, 
      curPage: contact.page+1,
      succCallback:(data)=>{
        this.setState({isLoadingMore:false});
      }
    });
  }
}

const styles = StyleSheet.create({
  nonetext:{textAlign:'center',marginTop:80,color:'#999'},
  loadingIcon:{marginTop:8},
  footerText:{
    color:'#666',fontSize:14,lineHeight:18,marginTop:10,marginBottom:12,textAlign:'center'
  },
});

const mapStateToProps = state => ({
  client: state.client,
  contact: state.contact
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    ...clientActions,
    ...contactActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

