import React from 'react';

export default class Btn extends React.Component{
  constructor(props) {
    super(props);
  }
  // componentDidMount (){
  //   //只出现一次，在第一次render之后。很常用，在这里第一次进行ajax。事件也在这里绑定
  //   console.log('react index ready');
  // }
  // componentWillReceiveProps (nextProps){
  //   console.log('app,componentWillReceiveProps',nextProps);
  // }


  render () {
    return (
      <button type="button" style={{padding:"5px 20px", background:"#f90", color:"#fff", fontSize:"16px"}} className="btn">
        {this.props.children}
      </button>
    );
  }
}
