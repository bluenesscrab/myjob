import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import Panel from './components/Panel';
import getConfig from './config';


export default function Root(props){
  return(
    <Provider store={configureStore({})}>
      <Panel {...props} />
    </Provider>
  )
};
