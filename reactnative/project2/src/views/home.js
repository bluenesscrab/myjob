import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cell,  Cells} from '../components/cell';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions}  from '../core/router';
import {clientActions}  from '../core/client';
import {othersActions}  from '../core/others';

class Home extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.actions.getServiceType({
      succCallback: (data)=>{
        LT.serviceType = data.data;
      }
    });
  }
  onPressOpportunity(){
    let {actions} = this.props;
    if (typeof LT.serviceType==='undefined') {
      actions.getServiceType({
        succCallback: (data)=>{
          LT.serviceType = data.data;
          actions.pushRouter({name:'addopportunity'});
        },
        failCallback: (data)=>{
          actions.openTip(data.msg);
        }
      });
    }
    else{
      actions.pushRouter({name:'addopportunity'});
    }
  }
  _clearSelectClient(){
    this.props.actions.clearSelectClient();
  }
  render() {    
    let {actions, client} = this.props;
    return (
      <View style={{flex:1,overflow:'hidden'}}>
        <TouchableOpacity onPress={()=>actions.replaceRouter({name:'search'})} activeOpacity={1}>
          <View style={styles.search_view}> 
            <Icon name="search" style={styles.search_icon}/> 
            <Text style={[styles.search_text, client.id==='' && styles.search_text_noclient]} numberOfLines={1}>{client.id===''? '请先选择一个客户' : ('当前客户：'+client.name)}</Text>
            {client.id!=='' && (
              <TouchableOpacity onPress={()=>this._clearSelectClient()} 
                style={styles.delete_icon_wrap}>
                <Icon name="times-circle" style={styles.delete_icon}/>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>      
        <Cells style={{marginTop:0}}>
          <Cell first={true} label="沟通记录" onPress={client.id ==='' ? false : ()=>actions.pushRouter({name:'addrecord',data:{a:1}})} labelStyle = {client.id==='' ?  styles.disabledLabelStyle : false}/>
          <Cell label="添加商机" onPress={client.id ==='' ? false : ()=>this.onPressOpportunity()} labelStyle = {client.id==='' ?  styles.disabledLabelStyle : false}/>
          <Cell label="快照" onPress={client.id ==='' ? false : ()=>actions.pushRouter({name:'snapshot'})} labelStyle = {client.id==='' ?  styles.disabledLabelStyle : false}/>
        </Cells>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search_view:{
    borderColor:'#ddd',
    borderWidth:StyleSheet.hairlineWidth,
    backgroundColor:'#fff',
    borderRadius:16,
    marginLeft:15,
    marginRight:15,
    paddingLeft:10,
    paddingRight:25,
    marginTop:8,
    marginBottom:8,
    height:32,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    flexDirection: 'row'
  }, 
  search_text:{  
    fontSize:13,
    flex:1,
  },  
  search_text_noclient:{
    textAlign:'center',
    color:'#999'
  },
  search_icon:{  
    fontSize:13,
    color:'#999', 
    width:30
  },  
  delete_icon_wrap:{
    width:30,justifyContent:'center',backgroundColor:'rgba(0,0,0,0)',height:30,
    position:'absolute',right:0
  },
  delete_icon:{  
    fontSize:15,
    color:'#999', 
  }, 
  disabledLabelStyle: {
    color: '#999'
  },
});

const mapStateToProps = state => ({
  client: state.client,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    ...clientActions,
    ...othersActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);