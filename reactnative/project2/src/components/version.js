import React,{Component} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native';
import {connect} from 'react-redux';
import ModalBox from '../components/modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomButton as Button} from '../components/button';

class Version extends Component {
  constructor(props) {
    super(props); 
  }
  download(url){
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  render () {
    let {version} = this.props;
    if (typeof version.update==='undefined' ||  version.update===-1) return null;
    return (
      <ModalBox style={styles.modal} entry={"top"} swipeToClose={false} position={"center"} backdropPressToClose={false} ref={"versionModal"} isOpen={version.update!==-1}>
        <View>
          <Icon name={"cloud-download"} style={styles.icon}/>
        </View>
        <View>
          <Text style={styles.title}>{version.versionName}版本更新</Text>
        </View>
        <ScrollView>
          <Text style={styles.log}>{version.changeLog}</Text>
        </ScrollView>
        <View style={styles.optWrap}>
          {version.update===0? <Button containerStyle={styles.button} light={true} onPress={()=>this.refs.versionModal.close()}>取消</Button> : null}
          <Button containerStyle={styles.button} onPress={()=>this.download(version.url)}>下载更新</Button>
        </View>       
      </ModalBox>  
    );
  }
}
const styles=StyleSheet.create({
  modal:{
    width:260,
    height:320,
    padding:15,
    borderRadius:4
  },
  icon:{
    fontSize:30,
    color:'#f9be00',
    textAlign:'center',
  },
  title:{
    fontSize:15,
    textAlign:'center',
    marginTop:8,
    marginBottom:10
  },
  log:{
    fontSize:12,
    color:'#aaa',
    lineHeight:16
  },
  optWrap:{
    flexDirection: 'row',
    marginTop:10
  },
  button:{
    flex:1,
    marginLeft:5,
    marginRight:5
  }
});


export default Version;