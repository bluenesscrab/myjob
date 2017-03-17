import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView, 
    Image, Dimensions, RefreshControl,InteractionManager} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cell,  Cells} from '../components/cell';
import {CustomButton as Button} from '../components/button';
import ImageZoom from '../components/imagezoom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clientActions}  from '../core/client';
import {tipActions}  from '../core/tip';
import {overlayActions}  from '../core/overlay';
import {albumActions}  from '../core/album';

class Album extends Component {
  constructor(props){
    super(props);
    this.state={
      visible:false,
      isRefreshing:false,
      source:'',
      firstEntered:true,
      list:[],
      more:false,
      date:''
    };
    this.page=0;
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.getAlbum({
        customerId: this.props.client.id,
        succCallback:(data)=>{
          this.setState({list:data.data.dataList, firstEntered:false});
        }
      });
    });
  } 
  setImageZoomVisible(visible, source, date) {
    this.setState({visible, source, date});
  }
  format(list){
    let newlist = [];
    list.forEach((v,i)=>{
      v.imagelist.forEach((w)=>{
        newlist.push({uri:w,date:v.date});
      });
    })
    return newlist;
  }
  _renderList(){
    let {list} = this.state;
    let newlist = this.format(list);
    return (
     <View style={styles.imageListWrap}>           
        {newlist.map((v,i)=>{
          return (
            <TouchableOpacity style={styles.imageWrap} key={i} onPress={()=>this.setImageZoomVisible(true, v.uri, v.date)} key={i}>
              <Image style={styles.image} resizeMode="contain" source={{uri: 'http://image0.lietou-static.com/img/'+v.uri}} />
            </TouchableOpacity>   
          );
        } 
      )}
      </View>
    );
  }
  _renderNone(){
    if(this.state.firstEntered){
      return null;
    }
    return (
      <View><Text style={styles.nonetext}>没有快照</Text></View>
    );
  }
  _onRefresh() {
    this.props.actions.getAlbum({
      customerId: this.props.client.id,
      succCallback:(data)=>{
        this.setState({list:data.data.dataList});
      }
    });
  }
  render() {
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
        {this.state.list && this.state.list.length>0 ? this._renderList() : this._renderNone()}   
      </ScrollView>
      <ImageZoom visible={this.state.visible} date={this.state.date} source={{ uri: 'http://image0.lietou-static.com/img/'+this.state.source}} close={()=>this.setImageZoomVisible(false)}/>
    </View>
    );
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const imgWidth = (width-26-StyleSheet.hairlineWidth*12-5*6-2*6)/3;
const styles = StyleSheet.create({
  dateWrap:{paddingLeft:13, paddingRight:13,},
  dateText:{marginTop:13, marginBottom:13, fontSize:13, color:'#999'},
  imageListWrap:{marginTop:13,marginBottom:13,paddingLeft:13,paddingRight:13,flexDirection:'row',flexWrap:'wrap',backgroundColor:'#f0f0f0'},
  imageWrap:{borderWidth:StyleSheet.hairlineWidth,borderColor:'#ddd',backgroundColor:'#fff',padding:5,marginRight:2,marginLeft:2,marginBottom:4,height:imgWidth+10+2*StyleSheet.hairlineWidth},
  image:{borderWidth:StyleSheet.hairlineWidth,borderColor:'#ddd',width:imgWidth,height:imgWidth},
  nonetext:{textAlign:'center',marginTop:80,color:'#999'}
});


const mapStateToProps = state => ({
  client: state.client,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...clientActions,
    ...tipActions,
    ...overlayActions,
    ...albumActions
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);