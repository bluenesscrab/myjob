import React, {Component} from 'react';
import {Text, TextInput, View, ScrollView,TouchableOpacity, StyleSheet, 
        Platform, TouchableWithoutFeedback, ListView, RefreshControl,ActivityIndicator} from 'react-native';
import {Cell,  Cells} from '../components/cell';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions}  from '../core/router';
import {clientActions}  from '../core/client';
import {searchActions}  from '../core/search';

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      submit: false,
      isLoadingMore: false
    }
  }
  componentDidMount(){
    this.props.actions.initSearch();
  }
  _selectClient(id, name) {
    this.setState({keyword:'',submit:false});
    this.props.actions.selectClient({id, name});
    this.props.actions.replaceRouter({name:'home'});
  }
  _onSubmit(event){
    let keyword = event.nativeEvent.text;
    this.setState({keyword, submit:true, isLoadingMore:true});
    this.props.actions.searchByKey({
      customerName:keyword, 
      curPage:0,
      succCallback:()=>{
        this.setState({isLoadingMore:false});
      }
    });
  }
  _onChangeText(val){
    this.setState({keyword:val, submit:false});
  }
  _onPressCancel(){
    this.setState({keyword:'', submit:false});
    this.props.actions.replaceRouter({name:'home'});
  }
  _renderList(){
    let {actions, client, search} = this.props;
    if(this.state.keyword==='' && !this.state.submit){
      return (
        <ScrollView >
          <Cells style={[styles.result, client.history.length===0 && styles.noresult]}>
            {client.history.map((v,i)=>{
              return (
                <Cell key={i} first={i===0? true : false} passthrough={true} label={v.name} rightIcon={false} onPress={() => this._selectClient(v.id, v.name)}/>
              );
            })}
            {client.history.length>0 ? <Cell passthrough={true} label="清除历史记录" labelCenter={true} rightIcon={false} onPress={()=>actions.clearLocalSearchHistory()} labelStyle={{color:'#666'}}/> : null}
          </Cells>
        </ScrollView>
      );
    }
    else{
      return (
        <ListView
          keyboardShouldPersistTaps={true} 
          keyboardDismissMode="on-drag"
          style={styles.scrollview}
          enableEmptySections={true}
          dataSource={this._genSourceData(search.related)}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={100}
        />

      );
    }

  }
  _genSourceData(data){
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    return ds.cloneWithRows(data);
  }
  _renderRow(rowData){
    return <Cell passthrough={true} label={rowData.name} rightIcon={false} onPress={() => this._selectClient(rowData.id, rowData.name)}/>
  }
  _renderFooter(){
    let {search} = this.props;
    if(search.more && search.related.length){
      return (<View style={styles.more}>
        {this.state.isLoadingMore? <ActivityIndicator style={styles.loadingIcon} color="#aaa"/> : <Text style={styles.footerText}>更多</Text> }
      </View>);
    }
    else if(search.related.length===0 && this.state.submit && !this.state.isLoadingMore){
      return <View style={styles.nosearch}><Text style={styles.footerText}>没有找到相关公司</Text></View>
    }
    else{
      return null;
    }
  }
  _onEndReached() {
    let {search} = this.props;
    if(!search.more || this.state.isLoadingMore || !search.related.length) return;
    this.setState({isLoadingMore:true});
    this.props.actions.searchByKey({
      customerName:this.state.keyword, 
      curPage:this.props.search.page+1,
      succCallback:()=>{
        this.setState({isLoadingMore:false});
      }
    }); 
  }
  render() {
    let {actions, client, search} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchbar}>
          <TextInput 
            style={styles.textinput}
            numberOfLines={1}
            underlineColorAndroid={'transparent'} 
            placeholder="请填写公司名称"
            defaultValue={search.keyword}
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
        {this._renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{flex:1, ...Platform.select({
      ios: {
        paddingTop:70
      },
      android:{
        paddingTop:56
      }
    })
  },
  searchbar:{position:'absolute',top:0,left:0,right:0,backgroundColor:'rgba(255,255,255,0.9)',alignItems:'stretch',borderColor:'#ddd',
    borderStyle:'solid',borderBottomWidth:StyleSheet.hairlineWidth,flex:1,flexDirection: 'row',paddingRight: 15,paddingLeft:15,
    ...Platform.select({
      ios: {
        height:70,paddingTop:20,
      },
      android:{
        height:56,paddingTop:5,
      }
    })
  },
  scrollView:{...Platform.select({
      ios: {
        paddingTop:70
      },
      android:{
        paddingTop:56
      }
    })
  },
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
  result:{
    marginTop:8
  },
  noresult:{
    borderTopWidth:0,
    borderBottomWidth: 0
  },
  footerText:{
    color:'#666',fontSize:14,lineHeight:18,marginTop:10,marginBottom:12,textAlign:'center'
  },
  loadingIcon:{marginTop:8}
});

const mapStateToProps = state => ({
  client: state.client,
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    ...clientActions,
    ...searchActions
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);