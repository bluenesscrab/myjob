import React, {Component} from 'react';

export function drag(){
  return (Comp) => {
    return class extends Component{
      constructor(props){
        super(props);
        this.originCX = null;
        this.originCY = null;
        this.state={
          draging: false
        };
        this.onMouseUp=this.onMouseUp.bind(this);
        this.onMouseMove=this.onMouseMove.bind(this);
        this.setAgain=this.setAgain.bind(this);
      }
      componentDidMount(){
        let that = this;
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('resize', this.setAgain);
      }
      componentWillUnmount(){
        let that = this;
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('resize', this.setAgain);
      }
      setAgain(){
        this.props.actions.dragWindowResize();
      }
      onMouseMove(e){
        if(this.state.draging){
          let distanceX = e.clientX - this.originCX;
          let distanceY = e.clientY - this.originCY;
          this.props.actions.dragDistance({
            distanceX,
            distanceY,
          });
          this.originCX = e.clientX;
          this.originCY = e.clientY;
        }
      } 
      onMouseUp(e){
        if(this.state.draging){
          this.setState({draging: false});
        }
      }
      onMousedown(e){
        if (e.button === 2) {
          return;
        }
        this.originCX = e.clientX;
        this.originCY = e.clientY;
        this.setState({
          draging: true,
        });
      }
      render() {
        let {style={}, ...rest} = this.props;
        return (
          <Comp style={Object.assign({}, ...style, {cursor: this.state.draging ? 'all-scroll': 'auto'})}
            {...rest} 
            onMouseDown={(e)=>{this.onMousedown(e)}}
          />
        );
      }
    }
  }
}

export function dragMove(){
  return (Comp) => {
    return class extends Component{
      render() {
        let {style={}, top, right, ...rest} = this.props;
        let newStyle = Object.assign({}, ...style, {top, right});
        return (
          <Comp style={newStyle}
            {...rest} 
          />
        );
      }
    }
  }
}
