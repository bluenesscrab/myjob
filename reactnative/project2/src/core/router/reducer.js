import {ROUTER_INIT, ROUTER_POP, ROUTER_PUSH, ROUTER_REPLACE, ROUTER_RESET} from './action-types';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const initialState = {
  currentRoute: null,
  mode: null,
  routeStacks: {},
  routes: [],
};

const defaultUpdates = (payload, routes) => ({
  currentRoute: routes[routes.length - 1],
  data: payload.data,
  routes,
});

export function routerReducer(state = initialState, action){
  let payload = action.payload; 
  let routes = state.routes.slice();
  let updates;
  switch (action.type){
    case ROUTER_INIT:
      updates = defaultUpdates(payload, [payload.name]);
      return Object.assign({}, state, updates);

    case ROUTER_POP: 
      let data = { num: 1 };
      if (isNumeric(payload)) {
        data = { num: payload };
      } else {
        data = Object.assign({}, data, payload.data);
      }
      data.name = state.currentRoute;
      for (let i = 0; i < data.num && routes.length > 1; i++) {
        routes.pop();
      }
      updates = defaultUpdates(payload, routes);
      return Object.assign({}, state, updates, {
        data: data,
        mode: ROUTER_POP
      });      

    case ROUTER_PUSH: 
      routes.push(payload.name);
      updates = defaultUpdates(payload, routes);
      return Object.assign({}, state, updates, {
        mode: ROUTER_PUSH,
      });

    case ROUTER_REPLACE: 
      routes.pop();
      routes.push(payload.name);
      return Object.assign({}, state, defaultUpdates(payload, routes), {
        mode: ROUTER_REPLACE,
      });
    case ROUTER_RESET:
      routes = [payload.name];
      return Object.assign({}, state, defaultUpdates(payload, routes), {
        mode: ROUTER_RESET,
      });    
    default:
      return state;
  }
}


