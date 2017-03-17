import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet, Dimensions, 
      ScrollView, InteractionManager, Keyboard, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cell,  Cells} from '../components/cell';
import {CustomButton as Button} from '../components/button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clientActions}  from '../core/client';
import {tipActions}  from '../core/tip';
import {overlayActions}  from '../core/overlay';
import {routerActions}  from '../core/router';
import {opportunityActions}  from '../core/opportunity';
import ModalBox from '../components/modalbox';
import {LTDate} from '../util';
import  DatePicker from '../components/datepicker';
import {SERVICE_TYPE} from '../config';

class AddOpportunity extends Component {
  constructor(props){
    super(props);
    this.today = new Date();
    this.todayString = LTDate.format(this.today, 'yyyy-MM-dd');
    this.maxDateString = LTDate.format(LTDate.addYears(new Date(), 1), 'yyyy-MM-dd');
    this.state = this.initState();
    this.state.opportunityType = {name:"", code:0};
    if(typeof LT.serviceType==='undefined') {
      LT.serviceType = SERVICE_TYPE;
    }
  }
  initState() {
    return {
      opportunityName:"",
      serviceType: LT.serviceType[0],
      date: this.todayString,
      value: "",
      activeOptions:[],
      process: {name:"",code:0},
    };
  }
  submit() {
    let {actions, client} = this.props;
    let state = Object.assign({},this.state);
    let keys = Object.keys(this.state);
    let title = "";
    let valid = true;
    if (client.contact.name==='') {
      valid=false;
      actions.openTip("请选择联系人");
      return;
    }
    if ((this.state.serviceType.code===3 || this.state.serviceType.code===6) && client.manager.name==='') {
      valid=false;
      actions.openTip("请选择行业经理");
      return;
    }
    for(let i = 0; i<keys.length; i++){
      if (typeof state[keys[i]] === "string" && state[keys[i]].trim()==="") {
        switch(keys[i]){
          case "opportunityName":
            title = "商机名称";
            break;
          case "value":
            title = "商机金额";
            break;
        }
        actions.openTip("请填写"+title);
        valid = false;
        break;
      }
      if (keys[i]==="value" && !/^\d+(\.\d+)?$/.test(state.value.trim())){
        title = "预测金额";
        actions.openTip(title+"应填写数字");
        valid = false;
        break;
      }
      if (keys[i]==="value" && (parseInt(state[keys[i]])<0 || parseInt(state[keys[i]])>5000000)){
        title = "预测金额";
        actions.openTip(title+"应在0元和500万之间");
        valid = false;
        break;        
      }
    }
    valid && actions.addOpportunity({
      inputdata:{
        bizCategory:this.state.serviceType.code,
        customerId: client.id,
        finishDate:this.state.date,
        isNew: this.state.opportunityType.code,
        linkmanIds: client.contact.id+'',
        name: this.state.opportunityName,
        money: this.state.value,
        process: this.state.process.code,
        rpoManagerId: client.manager.id,
      },
      succCallback:()=>{
        this.setState(this.initState());
        this.bindProcessWithServiceType();
      }
    });
  }
  openModal(name, param) {
    this.refs[name].open();
  }
  closeModal(name) {
    this.refs[name].close();
  }
  renderSelect(modalname, arr, inputname) {
    return arr.map((v,i)=>{
      return (
        <TouchableOpacity  key={i} style={styles.option} onPress={()=>{
          let newstate = {};
          newstate[inputname] = Object.assign({},v);
          this.closeModal(modalname);
          InteractionManager.runAfterInteractions(() => this.setState(newstate));
          
        }}>
          <Text style={[styles.optionText, this.state[inputname].id===v.id &&styles.optionTextSelected]}>{v.name}</Text>
        </TouchableOpacity>
      );
    });
  }
  toggleDisable() {
    this.setState({isDisabled: !this.state.isDisabled});
  }
  scrolldown(ref) {
    const self = this;
    this.refs[ref].measure((ox, oy, width, height, px, py) => {
        self.refs.scrollView.scrollTo({y: oy + 250});
    });
  }
  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide.bind(this))
    this.props.actions.ifCanAddOpportunity({
      customerId:this.props.client.id, 
      succCallback:(data)=>this.setState({opportunityType: data.data})
    });
    this.bindProcessWithServiceType();
  }
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }
  bindProcessWithServiceType() {//业务类型与商机进程联动
    this.props.actions.getOpportunityProcess({
      bizCategory: this.state.serviceType.code,
      succCallback: (data)=>{
        this.setState({
          process: data.data
        });
      }
    });
  }
  keyboardDidHide(e) {
    this.refs.scrollView.scrollTo({y: 0});
  }
  render() {
    let {client, actions} =  this.props;
    return (
      <View style={{flex:1}}>
        <ScrollView ref="scrollView"> 
          <Cells>
            <Cell first={true} label="商机名称" labelStyle={{width:80}} textInput={true} defaultValue={this.state.opportunityName} onChangeText={(text)=>this.setState({opportunityName:text})}/>
            <Cell label="客户名称" text={client.name} labelwrapStyle={{flex:0,width:80}}  textStyle={{color:'#999'}}/>
            <Cell label="联系人" text={client.contact.name} onPress={()=>{this.props.actions.pushRouter({name:'contact'})}}/>
            <Cell label="业务类型" text={this.state.serviceType.name} onPress={()=>{this.openModal('serviceTypeModal')}}/>
            <Cell label="商机类型" text={this.state.opportunityType.name}  textStyle={{color:'#999'}} />
            {(this.state.serviceType.code===3 || this.state.serviceType.code===6) && <Cell label="行业经理" text={client.manager.name} onPress={()=>{this.props.actions.pushRouter({name:'manager'})}}/>}
            <Cell label="预测回款日期" text={this.state.date} onPress={()=>this.refs.datepicker.open()}/>
            <Cell label="商机进程" text={this.state.process.name} labelwrapStyle={{flex:0,width:80}}  textStyle={{color:'#999'}} numberOfLinesText={2}/>
            <View style={styles.cell}>
              <View style={styles.celllabelwrap}>
                <Text style={styles.celllabel}>预测金额</Text>
              </View>
              <View style={styles.textinputwrap}>
                <TextInput 
                  style={styles.textinput}
                  placeholder={'请填写'}
                  underlineColorAndroid={'transparent'} 
                  onChangeText={(text)=>this.setState({value:text})}
                  defaultValue={this.state.value}
                  ref="value" 
                  onFocus={this.scrolldown.bind(this,'value')}
                />
              </View>
            </View>
            {/*<Cell label="商机金额" textInput={true} defaultValue={this.state.value} onChangeText={(text)=>this.setState({value:text})} refText="value" onFocusText={this.scrolldown.bind(this,'value')}/>   */}   
          </Cells>
          <View style={styles.optwrap}>
            <Button containerStyle={styles.button} large={true} onPress={this.submit.bind(this)}>保存</Button>
          </View>      
        </ScrollView>
        <ModalBox.Select 
          options={LT.serviceType} 
          onSelect={(selected)=>{
              this.setState({
                serviceType: selected
              });
              this.bindProcessWithServiceType();
            }
          } 
          selectedId={this.state.serviceType.code}
          ref="serviceTypeModal"
        />
        <DatePicker
          hide={true}
          ref={"datepicker"}
          style={{width: 200}}
          date={this.state.date}
          format="YYYY-MM-DD"
          minDate={this.todayString}
          showIcon={false}
          onDateChange={date=>this.setState({date})}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            },
            btnConfirm: {
              backgroundColor:'#f9be00',
              borderRadius: 4,
              top:8,
              right:8,
              padding:5,
              height:26
            },
            btnTextConfirm: {
              color:'#333'
            },
            datePicker: {
              alignItems: 'stretch'
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        {!client.canAddOpp.flag &&
          <View style={styles.mask}>
            <View style={[styles.tipTextFrame]}>
              <Text style={styles.tipText}>{client.canAddOpp.msg}</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}
const {
  width,
  height
} = Dimensions.get("window");


const styles = StyleSheet.create({
  cells:{marginTop:10},
  optwrap:{paddingLeft:15, paddingRight:15,marginTop:15, marginBottom:15},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    width,
  },
  option: {
    height: 44,
    borderTopWidth:StyleSheet.hairlineWidth,
    borderTopColor:'#ddd',
  },
  optionText: {
    color:'#666',fontSize:14,lineHeight:18,textAlign:'center',marginTop:10,marginBottom:12
  },
  optionTextSelected: {
    color:'#ef8200'
  },
  cell:{flexDirection: 'row',borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:'#ddd',backgroundColor:'#fff',marginLeft:15,paddingRight:15},
  celllabel:{color:'#333',fontSize:15,lineHeight:18,marginTop:10,marginBottom:12},
  celllabelwrap:{flex:1,paddingRight:8},
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
  textinputwrap:{flex:1},
  textinput:{  
    height:40, 
    paddingTop:5,
    paddingBottom:5,
    fontSize:14,
    color:'#666',
    textAlign:'right'
  },
  mask:{
    position:'absolute', top:0,bottom:0,left:0,right:0, backgroundColor:'rgba(0,0,0,0.2)'
  },
  tipTextFrame:{position:'absolute',top:70,left:width*0.5-75,padding:10,overflow:'hidden',width:150,height:60,borderRadius:4,backgroundColor:'rgba(0,0,0,0.75)',justifyContent:'center',alignItems:'center'},
  tipText:{color:'#fff', textAlign:'center'}
});

const mapStateToProps = state => ({
  client: state.client
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...clientActions,
    ...tipActions,
    ...overlayActions,
    ...routerActions,
    ...opportunityActions
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOpportunity);