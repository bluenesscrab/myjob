import getConfig from './config';
import {is} from 'immutable';

export const getBrief = (str ='', len = 15) => {
  if ( str ) {
    str = str.replace(/\n/mg, '');
    str = str.length === len ? `${str.slice(0, len)}` : str.length > len ? `${str.slice(0, len)}...` : str;
  }
  return str;
};
/*按今天、今年、往年分别显示*/
export function dateFormat(inputTime, type='') {
  let now = new Date();
  if(type==='notice'){//inputTime 形如 "20170301071015"的类型
    //转换成 "2017/03/01 07:10:15"
    let str = inputTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, (...matches)=>{
      return matches[1]+'/'+matches[2]+'/'+matches[3]+' '+matches[4]+':'+matches[5]+':'+matches[6];
    });
    inputTime = new Date(str);
  }
  if (type==='msg'){
    inputTime = new Date(inputTime);
    //返回数组, [day, time]
    if (LT.Date.format(inputTime, 'yyyy-MM-dd') === LT.Date.format(now, 'yyyy-MM-dd')) {//是今天的消息
      return ['', LT.Date.format(inputTime, 'HH:mm')];
    } else if (inputTime.getFullYear() === now.getFullYear()) {//今年的消息
      return [LT.Date.format(inputTime, 'MM-dd'), LT.Date.format(inputTime, 'HH:mm')];
    } else if (inputTime.getFullYear() !== now.getFullYear()) {
      return [LT.Date.format(inputTime, 'yyyy-MM-dd'), LT.Date.format(inputTime, 'HH:mm')];
    }
  }
  else if (type==='history'){
    inputTime = new Date(inputTime);
    //返回数组, [day, time]
    if (LT.Date.format(inputTime, 'yyyy-MM-dd') === LT.Date.format(now, 'yyyy-MM-dd')) {//是今天的消息
      return ['今天', LT.Date.format(inputTime, 'HH:mm:ss')];
    } else if (inputTime.getFullYear() === now.getFullYear()) {//今年的消息
      return [LT.Date.format(inputTime, 'MM-dd'), LT.Date.format(inputTime, 'HH:mm:ss')];
    } else if (inputTime.getFullYear() !== now.getFullYear()) {
      return [LT.Date.format(inputTime, 'yyyy-MM-dd'), LT.Date.format(inputTime, 'HH:mm:ss')];
    }
  }
  else{
    if (LT.Date.format(inputTime, 'yyyy-MM-dd') === LT.Date.format(now, 'yyyy-MM-dd')) {//是今天的消息
      return LT.Date.format(inputTime, 'HH:mm');
    } else if (inputTime.getFullYear() === now.getFullYear()) {//今年的消息
      return LT.Date.format(inputTime, 'MM-dd');
    } else if (inputTime.getFullYear() !== now.getFullYear()) {
      return LT.Date.format(inputTime, 'yyyy-MM');
    }
  }
}

export function timeVisibleFormat(arr){
  let timeArr = [];
  return arr.map((v)=>{
    let [day, time] = dateFormat(v.timestamp, 'msg');
    if (day === '' && timeArr.indexOf(time)===-1){
        timeArr.push(time);
        v.time = time;
    }
    else if(day !=='' && timeArr.indexOf(day+' '+time)===-1){
      timeArr.push(day+' '+time);
      v.time = day+' '+time;
    }
    return v;
  });
}

export function historyTimeVisibleFormat(arr){
  let dayArr = [];
  return arr.map((v)=>{
    let [day, time] = dateFormat(v.timestamp, 'history');
    if(dayArr.indexOf(day)===-1){
      dayArr.push(day);
      v.day = day;
    }
    v.time = time;
    return v;
  });
}
//广播消息
export function publish(imcore, dispatch, action){
  action = Object.assign({}, action, {pageId: imcore.pageId});
  dispatch(action);
  return imcore.publish(action.type, action);
}

export const comparePropsState = (thisProps = {}, thisState = {}, nextProps, nextState) => {
  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }
  for (const key in nextProps) {
    if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
      return true;
    }
  }
  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}

// h端账号被封杀之后的抛错提示
export function hKilledAccountAlert (imcore,data) {
  if(imcore.env === 'h' && data.code === '5000'){
    vdialog.error(data.msg);
  }
}