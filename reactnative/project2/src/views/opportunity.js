import React, {Component} from 'react';
import {Alert, Text, TextInput, View, ScrollView, StyleSheet, Dimensions, RefreshControl,InteractionManager} from 'react-native';
import {Cell} from '../components/cell';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalBox from '../components/modalbox';
import {SERVICE_TYPE, OPPORTUNITY_TYPE, OPPORTUNITY_STAGE, SUCCESS_RATE} from '../config';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clientActions}  from '../core/client';
import {tipActions}  from '../core/tip';
import {opportunityActions}  from '../core/opportunity';
import {CustomButton as Button} from '../components/button';
import dismissKeyboard from 'dismissKeyboard';

class Opportunity extends Component {
  constructor(props){
    super(props);
    this.activeId = 0;
    this.state={
      isRefreshing: false,
      reason: '',
      firstEntered:true
    }
  }
  componentDidMount(){
    //历史商机目前为空，去读
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.getOpportunityList({
        customerId: this.props.client.id,
        succCallback:()=>{
          this.setState({firstEntered:false});
        }
      });
    });
  } 
  _onRefresh() {
    this.props.actions.getOpportunityList({customerId:this.props.client.id});
  }
  _renderNone(){
    if(this.state.firstEntered){
      return null;
    }
    return (
      <View><Text style={styles.nonetext}>没有历史商机</Text></View>
    );
  }
  _renderList(){
    let {opportunity} = this.props;
    return opportunity.map((v,i)=>{
      return (
        <View style={[styles.item, i===0 && styles.firstitem]} key={i}>
          <View style={styles.namewrap}>
            <Text style={styles.nametext} numberOfLines={1}>{v.name}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.labelwrap}>
                  <Text style={styles.label}>商机类型</Text>
                </View>
                <View style={styles.contentwrap}>
                  <Text style={styles.content} numberOfLines={1}>{v.isNewName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.labelwrap}>
                  <Text style={styles.label}>商机类型</Text>
                </View>
                <View style={styles.contentwrap}>
                  <Text style={styles.content} numberOfLines={1}>{v.bizCategoryName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.labelwrap}>
                  <Text style={styles.label}>预测金额</Text>
                </View>
                <View style={styles.contentwrap}>
                  <Text style={styles.content}>{v.money}元</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={[styles.labelwrap,styles.labelwrap2]}>
                  <Text style={styles.label}>阶段</Text>
                </View>
                <View style={styles.contentwrap}>
                  <Text style={styles.content}>{v.processStatusName}</Text>
                </View>
              </View>
            </View>
          </View>
          {v.isFinish===0 && 
          <View style={styles.cell}>
            <View style={styles.labelwrap}>
              <Text style={styles.label}>更改阶段</Text>
            </View>
            <View style={styles.optwrap}>
              <Button  containerStyle={styles.button} style={styles.giveupButton} light={true} onPress={()=>this.onChangeStatusGiveup(v.id)}>丢单</Button>
              <Button  containerStyle={styles.button} onPress={()=>this.onChangeStatusCancel(v.id)}>取消</Button>
            </View>
          </View>
          }
        </View>
      )
    });
  }
  onChangeStatusCancel(id){
    Alert.alert(
      '提示',
      '确定要取消这个商机吗？确定后不能撤销！',
      [
        {text: '确定', onPress: () => this.props.actions.updateOpportunity(
          {
            opportunityId: id, 
            status: 9, 
            reason: '',
            customerId:this.props.client.id
          }
        )},
        {text: '取消', style: 'cancel'},
      ]
    );
  }
  onChangeStatusGiveup(id){
    this.activeId = id;
    this.refs.reasonModal.open();
  }
  onConfirmGiveup(){
    if(this.state.reason.trim()===''){
      this.props.actions.openTip('请填写丢单原因！');
      return;
    }
    dismissKeyboard()
    Alert.alert(
      '提示',
      '确定要操作丢单吗？确定后不能撤销！',
      [
        {text: '确定', onPress: () => this.props.actions.updateOpportunity(
          {
            opportunityId: this.activeId, 
            status: 8, 
            reason: this.state.reason, 
            customerId:this.props.client.id,
            succCallback:()=>{
              this.setState({reason:''});
              this.refs.reasonModal.close();
            }
          })
        },
        {text: '取消', style: 'cancel'},
      ]
    );
  }
  getReason(text) {
    this.setState({reason:text});
  }
  render() {
    let {opportunity, client, actions} = this.props;
    return (
      <View style={{flex:1}}>
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
          {opportunity && opportunity.length>0 ? this._renderList() : this._renderNone()} 
        </ScrollView>
        <ModalBox style={stylesReason.modal} position={"0"} swipeToClose={false} backdropPressToClose={false} ref={"reasonModal"}>
          <View style={stylesReason.form}>
            <View style={stylesReason.labelwrap}>
              <Text style={stylesReason.formlabel} ref="textinputReason">丢单原因</Text>
            </View>
            <View style={stylesReason.textinputwrap}>
              <TextInput 
                style={stylesReason.textinput}
                placeholder='请填写丢单原因'
                multiline={true}
                underlineColorAndroid={'transparent'} 
                onChangeText={(text)=>this.getReason(text)}
                value={this.state.reason}
              />
            </View>
          </View> 
          <View style={stylesReason.optWrap}>
            <Button containerStyle={stylesReason.button} light={true} onPress={()=>this.refs.reasonModal.close()}>取消</Button> 
            <Button containerStyle={stylesReason.button} onPress={()=>this.onConfirmGiveup()}>确认丢单</Button>
          </View>       
        </ModalBox>  
      </View>
    );
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const styles = StyleSheet.create({
  item: {marginLeft:10,marginRight:10,marginBottom:10},
  firstitem:{marginTop:15},
  namewrap: {backgroundColor:'#ef8200',paddingLeft:15, paddingRight:15},
  nametext: {color:'#fff',fontSize:14,lineHeight:18,marginTop:8,marginBottom:12},
  table: {borderWidth:StyleSheet.hairlineWidth,borderColor:'#ddd',paddingLeft:13,paddingRight:13,paddingBottom:8,backgroundColor:'#fff'},
  row: {flex:1, flexDirection: 'row'},
  column: {flex:1, flexDirection: 'row'},
  labelwrap: {width:54},
  labelwrap2: {width:54},
  label:{color:'#999', fontSize:12,lineHeight:18,marginTop:4,marginBottom:2},
  contentwrap:{flex:1},
  content:{color:'#333', fontSize:13,lineHeight:18,marginTop:4,marginBottom:2},
  cell:{flexDirection: 'row',borderWidth:StyleSheet.hairlineWidth,borderTopWidth:0,borderColor:'#ddd',backgroundColor:'#fff',paddingLeft:15},
  righticon:{fontSize:24,color:'#ccc',textAlign:'center'},
  righticonwrap:{width:40,justifyContent:'center'},
  celllabel:{color:'#333',fontSize:14,lineHeight:18,marginTop:6,marginBottom:10},
  optwrap:{
    flex:1,
    flexDirection: 'row',
    marginTop:6,
    marginBottom:6,
    marginRight:15,
    justifyContent:'flex-end',
  },
  nonetext:{textAlign:'center',marginTop:80,color:'#999'},
  giveupButton:{color:'#ef8200'},
  button:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderColor:'#ddd',
    borderStyle:'solid',
    borderWidth:StyleSheet.hairlineWidth,
    borderRadius:4,
    height:26,
    marginLeft:8,
    width:60
  }
});

const stylesReason = StyleSheet.create({
  modal:{
    width,
    height:180,
  },
  labelwrap:{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:'#ddd',marginLeft:15,marginRight:15},
  textinputwrap:{marginTop:2,paddingLeft:15,paddingRight:15,paddingBottom:10},
  textinput:{  
    backgroundColor:'#fff',
    height:80,
    fontSize:14,
    color:'#666',
    textAlignVertical:'top'
  },
  optwrap:{paddingLeft:15, paddingRight:15,marginTop:15},
  form:{
    borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:'#ddd',
  },
  formlabel:{
    color:'#333',fontSize:14,lineHeight:18,marginTop:6,marginBottom:10
  },
  optWrap:{
    flexDirection: 'row',
    marginTop:10,
    marginLeft:10,
    marginRight:10
  },
  button:{
    flex:1,
    marginLeft:5,
    marginRight:5
  }
});
const mapStateToProps = state => ({
  client: state.client,
  opportunity: state.opportunity.opportunityList[state.client.id]
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...clientActions,
    ...tipActions,
    ...opportunityActions
  }, dispatch),
  dispatch,
});

// const getValueById = (arr,id) => {
//   for(let i=0; i<arr.length; i++){
//     if(arr[i].id===id) return arr[i];
//   };
//   return {id:"", name:""};
// }
export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
