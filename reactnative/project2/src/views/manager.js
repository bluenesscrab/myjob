import React, {Component} from 'react';
import {Text, View, ScrollView, ListView, TouchableOpacity, StyleSheet, TextInput,
  Platform, ActivityIndicator, InteractionManager} from 'react-native';
import {Cell,  Cells} from '../components/cell';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions}  from '../core/router';
import {clientActions}  from '../core/client';
import {managerActions}  from '../core/manager';

class Manager extends Component {
  constructor(props){
    super(props);
    this.page=0;
    this.state={
      firstEntered: true,
      isLoadingMore: false,
      keyword:'',
      more:false,
      list:[],
      submit: false,
    };
  }
  initState() {
    this.page=0;
    this.setState({
      isLoadingMore: false,
      keyword:'',
      more:false,
      list:[],
      submit: false,
    });
  }
  selectManager(v) {
    let {actions} = this.props;
    actions.selectManager({manager:v, succCallback:()=>actions.popRouter()});
  }
  _onSubmit(event){
    let keyword = event.nativeEvent.text;
    this.setState({keyword, submit:true});
    this.props.actions.getManager({
      managerName: this.state.keyword,
      curPage: this.page,
      succCallback:(data)=>{
        this.setState({
          firstEntered: false,
          more:this.page<data.data.totalPage-1,
          list:data.data.dataList,
        });
      }
    });
  }
  _onChangeText(val){
    this.setState({keyword:val, submit:false});
    if(val===''){
      this.initState();
    }
  }
  _onPressCancel(){
    this.initState();
    this.props.actions.popRouter();
  }
  render() {
    let {actions, manager} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchbar}>
          <TextInput 
            style={styles.textinput}
            numberOfLines={1}
            underlineColorAndroid={'transparent'} 
            placeholder="请填写姓/名"
            defaultValue={this.state.keyword}
            blurOnSubmit={true}
            onSubmitEditing={(event)=>this._onSubmit(event)}
            autoFocus={true}
            returnKeyType="search"
            clearButtonMode="always"
            onChangeText={(val)=>this._onChangeText(val)}
          />
          <TouchableOpacity style={styles.cancel} onPress={()=>this._onPressCancel()}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableOpacity>
        </View>
        {(this.state.submit || this.state.keyword) ?
        <ListView
          keyboardShouldPersistTaps={true} 
          keyboardDismissMode="on-drag"
          enableEmptySections={true}
          dataSource={this._genSourceData(this.state.list)}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={100}
        /> : null
      }
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
    return <Cell passthrough={true} label={rowData.name} rightIcon={false} onPress={() => this.selectManager({manager:{id:rowData.id, name:rowData.name}})}/>
  }
  _renderFooter(){
    let state = this.state;
    if(state.more && state.list.length){
      return (<View style={styles.more}>
        {state.isLoadingMore? <ActivityIndicator style={styles.loadingIcon} color="#aaa"/> : <Text style={styles.footerText}>更多</Text> }
      </View>);
    }
    else if(state.list.length===0 && !state.firstEntered){
      return <View><Text style={styles.nonetext}>没有联系人</Text></View>
    }
    else{
      return null;
    }
  }
  _onEndReached() {
    let {client, actions} = this.props;
    let state = this.state;
    if(!state.more || state.isLoadingMore || !state.list.length) return;
    this.setState({isLoadingMore:true});
    this.page++;
    actions.getManager({
      managerName: this.state.keyword,
      curPage: this.page,
      succCallback:(data)=>{
        this.setState({
          firstEntered: false,
          more:this.page<data.data.totalPage-1,
          list:this.state.list.concat(data.data.dataList),
          isLoadingMore:false,
        });
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
  searchbar:{position:'absolute',top:0,left:0,right:0,backgroundColor:'rgba(255,255,255,0.9)',alignItems:'stretch',borderColor:'#ddd',
    borderStyle:'solid',borderBottomWidth:StyleSheet.hairlineWidth,flex:1,flexDirection: 'row',paddingRight: 15,paddingLeft:15,
  },
  scrollView:{marginTop:56},
  container:{flex:1, paddingTop:56},
  cancel:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderColor:'#ddd',
    borderStyle:'solid',
    borderWidth:StyleSheet.hairlineWidth,
    borderRadius:10,
    height:30,
    paddingLeft:8,
    paddingRight:8,
    marginTop:8, 
  },
  cancelText:{
    color:'#666',
  },
  textinput:{ 
    marginTop:5,
    backgroundColor:'#fff',
    height:40,
    fontSize:14,
    color:'#333',
    flex:1
  },
});

const mapStateToProps = state => ({
  client: state.client,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    ...clientActions,
    ...managerActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);

