import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet,Dimensions, ScrollView, NativeModules, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomButton as Button} from '../components/button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {albumActions}  from '../core/album';

const {
  width,
  height
} = Dimensions.get("window");

const ImagePickerManager = NativeModules.ImagePickerManager;

class Snapshot extends Component {
  constructor(props){
    super(props);
    this.state={
      photo:''
    };
  }
  getContent(val) {
    this.setState({content:val});
  }
  takePhoto(){
    let options = {
      title: '选择来源：', // specify null or empty string to remove the title
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '相机', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: null, // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      maxWidth: 600, // photos only
      maxHeight: 800, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.2, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    };
    ImagePickerManager.launchCamera(options, (response) => {
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      }
      else if (response.error) {
        //console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // uri (on iOS)
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        //const source = {uri: response.uri, isStatic: true};
        //console.log(source.uri);
        this.setState({photo: source.uri});
      }
    });
  }
  upload() {
    this.props.actions.uploadPhoto({customerId: this.props.client.id, photo: this.state.photo, succCallback:()=> this.setState({photo:''})});
  }
  render() {
    return (
      <ScrollView> 
        <View style={styles.imagewrap}>
          <View style={styles.iconwrap}>
            {this.state.photo ? <Image source={{uri: this.state.photo}} style={styles.image} resizeMode={'contain'}/> : <Icon name="file-image-o" style={styles.icon}/> }
          </View>
        </View>   
        <View style={styles.optwrap}>
          <Button containerStyle={styles.button} large={true} onPress={()=>this.takePhoto()}>拍照</Button>
          <Button containerStyle={styles.button} disabled={!this.state.photo} large={true} onPress={()=>this.upload()}>上传图片</Button>
        </View>   
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imagewrap:{flex:1,height:height*0.9-114,borderWidth:StyleSheet.hairlineWidth,borderColor:'#ddd',marginLeft:10,marginRight:10,marginTop:15,backgroundColor:'#fff'},
  iconwrap:{flex:1,alignItems:'center',justifyContent:'center',height:50,},
  icon:{fontSize:50,color:'#ccc'},
  optwrap:{paddingLeft:5, paddingRight:5,flexDirection:'row',marginTop:15},
  button:{marginRight:5,marginLeft:5,flex:1},
  image:{width:width-20-StyleSheet.hairlineWidth*2, height:height*0.9-114}
});

const mapStateToProps = state => ({
  client: state.client
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...albumActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Snapshot);