import {ROUTER_INIT, ROUTER_POP, ROUTER_PUSH, ROUTER_REPLACE, ROUTER_RESET} from './action-types';

const filter = data => {
  if(typeof(data)==='undefined'){
    return {};
  }
  if (typeof(data) !== 'object') {
    return data;
  }
  if (!data) {
    return;
  }

  let proto = (data || {}).constructor.name;

  if (proto != 'Object') {
    data = {};
  }
  if (data.data) {
    data.data = filter(data.data);
  }

  return data;
};

export function initRouter(data) {
  return {
    type: ROUTER_INIT,
    payload: filter(data),
  };
}

export function popRouter(data) {
  return {
    type: ROUTER_POP,
    payload: filter(data),
  };
}

export function pushRouter(data) {
  return {
    type: ROUTER_PUSH,
    payload: filter(data),
  };
}

export function resetRouter(data) {
  return {
    type: ROUTER_RESET,
    payload: filter(data),
  };
}

export function replaceRouter(data) {
  return {
    type: ROUTER_REPLACE,
    payload: filter(data),
  };
}
