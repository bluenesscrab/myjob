import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//////////////////////// redux  start
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import Calc from './calc/';


ReactDOM.render(
  <Calc />
, document.getElementById('root'));

