import React, { Component } from 'react';


export default class Calc extends Component{
  constructor(props){
    super(props);

    this.state = {
      btnlist:[9, 8, 7, 6, 5, 4, 3, 2, 1, '.', 0, '='],
      calc:['+', '-', '×', '÷'],
      val:0,
      calcs:'',
      left:0
    }
  }

  getVal(val){
    if( !isNaN(Number(val)) ){
      let num = Number(this.state.bl ? `${this.state.val}${val}` : val)
      this.setState({
        val:num,
        bl:true
      })
    }else{
      if(this.state.calcs){
        let num = eval(this.state.left+ this.state.calcs.replace('×','*').replace('÷','/') +this.state.val);
        val = val === '=' ?'':val;
        this.setState({
          left: num,
          val: num,
          bl:false,
          calcs:val
        })
      }else{
        val = val === '=' ?'':val;
        this.setState({
          left:this.state.val,
          bl:false,
          calcs:val,
          right:0
        })
      }
    }
  }

  render(){
    let {btnlist,calc} = this.state;
    return (
      <div>
        <input type="text" value="" className="text"/>
        <hr/>
          {JSON.stringify(this.state)}
        <hr/>
        <div className="calcs">{this.state.val}</div>
        <hr/>
        <table>
          <tbody>
            <tr>
              <td>
                {
                  btnlist.map((v,i) => <span key={i}><input onClick={()=>{ this.getVal(v) }} className="btn" type="button" value={v}/>{i!=0&&(i+1)%3==0 ? <br/>:''}</span> )
                }
              </td>
              <td>
                {
                  calc.map((v,i) => <span key={i}><input onClick={()=>{ this.getVal(v) }} className="btn" type="button" value={v}/><br/></span> )
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


