import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, RefreshControl,InteractionManager, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clientActions}  from '../core/client';
import {recordActions}  from '../core/record';

class Record extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRefreshing: false
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.getRecordList({customerId:this.props.client.id});
    });

  } 
  _renderList(){
    let {record} = this.props;
    return (
      <View style={styles.list}>        
      {record.map((v,i)=>{
        return this._renderType(v,i)
      })}
      </View>
    );
  }
  _renderNone(){
    return (
      <View><Text style={styles.nonetext}>没有沟通记录</Text></View>
    );
  }
  _renderType(v,i){
    let {record} = this.props;
    switch(v.type){
      case 0:
        return (
          <View style={[styles.item, (i===record.length-1) && styles.lastitem]} key={i}>
            {i===record.length-1 ? <View style={styles.lineLastItem}/> : <View style={styles.line}/>}
            <Text style={styles.time}>{v.timeLabel}</Text>
            <Text style={styles.info}>
            <Text style={styles.name}>{v.creatorName} </Text>
            在销售机会：<Text style={styles.name}>{v.opportunityName}</Text> 中通过 {v.wayName} 联络了 客户联系人<Text style={styles.name}>{v.linkmanName}</Text>
            </Text>
            {v.content ? <Text style={styles.content} numberOfLines={3}>{v.content}</Text> : null}
            <View style={styles.circle}/>
          </View>  
          )
      case 1:
        return (
          <View style={[styles.item, (i===record.length-1) && styles.lastitem]} key={i}>
            {i===record.length-1 ? <View style={styles.lineLastItem}/> : <View style={styles.line}/>}
            <Text style={styles.time}>{v.timeLabel}</Text>
            <Text style={styles.info}>
            <Text style={styles.name}>{v.creatorName} </Text>
            通过 {v.wayName} 联络了 客户联系人 <Text style={styles.name}>{v.linkmanName}</Text>
            </Text>
            {v.content ? <Text style={styles.content} numberOfLines={3}>{v.content}</Text> : null}
            <View style={styles.circle}/>
          </View>  
          )
      case 2:
        return (
          <View style={[styles.item, (i===record.length-1) && styles.lastitem]} key={i}>
            {i===record.length-1 ? <View style={styles.lineLastItem}/> : <View style={styles.line}/>}
            <Text style={styles.time}>{v.timeLabel}</Text>
            <Text style={styles.info}>
            <Text style={styles.name}>{v.creatorName} </Text>
            将销售机会：<Text style={styles.name}>{v.opportunityName}</Text> 由 {v.fromStatusName} 变为 {v.toStatusName}
            </Text>
            {v.content ? <Text style={styles.content} numberOfLines={3}>{v.content}</Text> : null}
            <View style={styles.circle}/>
          </View>  
          )
    }
  }
  _onRefresh() {
    this.props.actions.getRecordList({customerId:this.props.client.id});
  }
  render() {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          style={{
            backgroundColor:'transparent',
          }}
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
          tintColor="#ddd"
          title="刷新中"
          titleColor="#999"
          colors={['#999']}
          progressBackgroundColor="#f1f1f1"
        />}
      > 
        {this.props.record && this.props.record.length>0 ? this._renderList() : this._renderNone()} 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {marginRight:15},
  item: {paddingLeft:50, paddingTop:7.5,paddingBottom:7.5, overflow: 'visible'},
  lastitem: {borderLeftWidth:0},
  name: {color:'#ef8200'},
  time: {fontSize:12, color:'#999',lineHeight:18},
  info: {fontSize:13, color:'#333',lineHeight:18},
  content:{fontSize:12, color:'#bbb',backgroundColor:'#fff', lineHeight:18,padding:10,paddingTop:6, marginTop:5, borderColor:'#ddd',borderWidth:1,
    ...Platform.select({
      ios: {
        paddingBottom:10,
      },
      android:{
        paddingBottom:4
      }
    })
  },
  circle: {position:'absolute', left:30.5, top:15, width:10,height:10,borderRadius:5,backgroundColor:'#ef8200'},
  lineLastItem: {position:'absolute', left:35, top:0, height:18,borderLeftWidth:1, borderColor:'#ef8200'},
  line: {position:'absolute', left:35, top:0, bottom:0,borderLeftWidth:1, borderColor:'#ef8200'},
  nonetext:{textAlign:'center',marginTop:80,color:'#999'}
});

const mapStateToProps = state => ({
  client: state.client,
  record: state.record.recordList[state.client.id]
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...clientActions,
    ...recordActions
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);