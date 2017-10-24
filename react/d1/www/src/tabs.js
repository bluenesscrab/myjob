import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Tabs extends Component{
  constructor(props){
    super(props);
    console.log(this.props)
    this.state = { 
      activeIndex: this.props.activeIndex ? this.props.activeIndex : 0
    };
  }


  handelTab(i){
    this.setState({
      activeIndex: i
    });
  }
  renderTabNav(){
    let { navValue } = this.props;
    let that = this;
    return (<div>
      {
        navValue && navValue.map((v,i)=>{
          return <input type="button"
          key={i}
          data-index={i}
          onClick={ ()=>{ this.handelTab(i) } } 
          className={i === this.state.activeIndex ? 'active' : '' }
          value={v}/>
        })
      }
    </div>);
  }

  renderTabContent(){
    let { contents } = this.props;

    return <div>
      { contents && contents[this.state.activeIndex] }
    </div>;
  }

  render(){
    return (
      <div>
        { this.renderTabNav() }
        { this.renderTabContent() }
      </div>
    )
  }
}