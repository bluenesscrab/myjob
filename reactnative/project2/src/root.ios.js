import React, { PropTypes, Component } from 'react';
import {View, Alert} from 'react-native';
import { Provider } from 'react-redux';
import App from './views/app';
import Tip from './components/tip';
import Overlay from './components/overlay';
import Version from './components/version';
import configureStore from './core/store';
import {othersActions}  from './core/others';
import SplashScreen from "rn-splash-screen";
import {LOCALSTORAGE_KEY as KEY} from './config';
import {initLT, MyStorage} from './util';

const actions = {
  ...othersActions
}
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state={
      gotStorage: false,
      version:{
        "versionName": "",
        "changeLog": "",
        "url": "",
        "update": -1
      }
    };
    initLT();
  }
  componentDidMount() {
    //读取本地缓存数据，作为initialState注入store
    LT.storage={};
    setTimeout(()=>SplashScreen.hide(),2000);
    //MyStorage.save(KEY,{})
    MyStorage.get(KEY).then((value)=>{
      LT.storage=value || {};
    })
    .finally(()=>{
      initApp()
    })

    const initApp = () => {
      this.store = configureStore(LT.storage);
      this.setState({gotStorage:true});
      //检查版本是否需要更新
      this.store.dispatch(
        actions.checkVersion(
          (data)=>{
            this.setState({version: data.data});
            //SplashScreen.hide();
          }
        )
      );
    }
  }
  render() {
    if(!this.state.gotStorage) return null;
    return (
      <Provider store={this.store}>
        <View style={{flex:1}}>
          <App/>
          <Version version={this.state.version}/>
          <Tip/>
          <Overlay/>
        </View>
      </Provider>
    );
  }
}
