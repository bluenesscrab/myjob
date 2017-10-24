import React, {Component} from 'react';

function addTlog(mapToProps){
  return (Comp) => {
    return class extends Component{
      render() {
        let {onClick, pushStr, ...rest} = this.props;
        return (
          <Comp 
            {...rest} 
            {...mapToProps(onClick, pushStr)} />
        );
      }
    }
  }
}

function A(props) {
  let {children, ...rest} = props;
  return <a {...rest}>{children}</a>
}
function Input(props) {
  let {children, ...rest} = props;
  return <input {...rest}>{children}</input>
}
/*支持tlog的高阶组件
用法：
<Atlog onClick={()=>{console.log('ddd')}} pushStr="1234">点我</Atlog>
*/
export const Atlog = addTlog(
  (onClick, pushStr) => ({ 
    onClick: () => {
      if(pushStr){
        window.tlog = window.tlog || [];
        tlog.push(pushStr);
      }
      onClick && onClick();
    } 
  })
)(A);
export const InputTlog = addTlog(
  (onClick, pushStr) => ({ 
    onClick: () => {
      if(pushStr){
        window.tlog = window.tlog || [];
        tlog.push(pushStr);
      }
      onClick && onClick();
    } 
  })
)(Input);