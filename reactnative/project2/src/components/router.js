import React, { Component } from 'react';
import { Navigator, View, Text, StyleSheet, ScrollView, BackAndroid, Alert} from 'react-native';
import {ROUTER_PUSH, ROUTER_REPLACE, ROUTER_RESET,ROUTER_POP} from '../core/router/action-types';
import Container from './container';
import Navbar from './navbar';

const actionMap = {
  push: ROUTER_PUSH,
  replace: ROUTER_REPLACE,
  reset: ROUTER_RESET,
};

const schemaDefault = {
  sceneConfig: Navigator.SceneConfigs.FloatFromRight,
  container: Container
}

class Route extends Component {
  className() {
    return 'Route';
  }
  render() {
    return null;
  }
}

class Router extends Component {
  constructor(props) {
    super(props);

    const { actions = {}, dispatch } = this.props;
    actions.routes = {};
    this.routes = {};
    this.initial = { name: this.props.initial };//props里没有initial? 从this.props里取

    React.Children.forEach(props.children, (child, index) => {
      let name = child.props.name;

      if (child.type.prototype.className() === 'Route') {
        if (child.props.initial && !this.initial.name) {//如果在Router里未定义initial，可以在Route里设置initial
          this.initial.name = name;
        }

        actions.routes[name] = (data = {}) => e => {
          if (typeof(data) !== 'object') {
            data = { data }
          }
          dispatch({
            type: actionMap[data.type || child.props.type] || 'ROUTER_PUSH', //在Route的type属性里写明actionTypes对应的值，默认是push
            payload: { name:name, data },
          });
        };

        this.routes[name] = child.props;

        if (!child.props.component && !child.props.children) {
          console.error('No route component is defined for name: ' + name);
          return;
        }
      }
    });
    this.initialRoute = this.routes[this.initial.name]
      || console.error('No initial route ' + this.initial.name);

  }
  componentDidMount() {
    this.props.actions.initRouter(this.initial);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.router.currentRoute !== nextProps.router.currentRoute) {
      this.handleRouteChange(nextProps.router);
    }
  }
  handleBackButton() {
    let routes=this.nav.getCurrentRoutes();
    if (routes.length>1) {
      return this.props.actions.popRouter();
    }
    return false;
  }

  render() {
    if (!(this.props.initial || this.initial)) {
      console.error('No initial attribute!');
    }
    this.initialRoute = this.routes[this.props.initial || this.initial.name];
    if (!this.initialRoute) {
      console.error('No initial route!');
    }
    const currentRoute = this.getRoute(
      this.routes[this.props.router.currentRoute],
      this.props.router);

    return (
      <View style={{flex:1}}>
        <Navigator
          configureScene={(route) => route.sceneConfig}
          initialRoute={this.getRoute(this.initialRoute, this.props.router)}
          renderScene={this.renderScene.bind(this)}
          ref={(nav) => this.nav = nav}
        />
      </View>
    );
  }

  renderScene(route, navigator) {
    let Component = route.component;
    let props = Object.assign({}, this.props);
    let componentProps = this.routes[route.name];
    delete props.children;
    delete props.initial;

    let child = null;
    if (Component) {
      child = (
        <Component
          key={route.name}
          {...route.passProps}
          />
      );
    } else {
      child = React.Children.only(componentProps.children);
      child = React.cloneElement(child);
    }
    function _renderNavbar(){
      if(componentProps.navbar){
        return <Navbar {...componentProps}/>
      }
      else{
        return null;
      }
    }
    return (
      <Container navbar={componentProps.navbar} style={componentProps.containerStyle || {}}>
        {_renderNavbar()}
        {child}
      </Container>
    );
  }

  getRoute(routeProps, router = { data: {} }) {
    const { data = {} } = router;
    if (!routeProps) {
      return {};
    }

    let sceneConfig =  routeProps.sceneConfig || schemaDefault.sceneConfig   ;

    return {
      component: routeProps.component,
      name: routeProps.name,
      passProps: { routerData: data },
      sceneConfig: { ...sceneConfig },
    }
  }

  handleRouteChange(router) {
    const { data = {}, mode } = router;

    if (mode ===ROUTER_POP) {
      const num = data.num || 1;
      const routes = this.nav.getCurrentRoutes();
      if (num < routes.length) {
        this.nav.popToRoute(routes[routes.length - 1 - num]);
      } else {
        this.nav.popToTop();
      }
    }

    if (mode === ROUTER_PUSH) {
      this.nav.push(this.getRoute(
        this.routes[router.currentRoute], router
      ));
    }

    if (mode === ROUTER_REPLACE) {
      this.nav.replace(this.getRoute(
        this.routes[router.currentRoute], router
      ));
    }

    if (mode === ROUTER_RESET) {
      this.nav.immediatelyResetRouteStack([
        this.getRoute(this.routes[router.currentRoute], router)
      ]);
    }
  }
}

export {Router, Route};