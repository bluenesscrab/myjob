import React, {Component} from 'react';
import '../css/ImgPreview.css';

class ImgContent extends Component{
  constructor(props){
    super(props);
    // this.state={
    //   maxHeight: $(window).height()-90, maxWidth: $(window).width()-22
    // }
  }
  componentDidMount(){
    // $(window).on('resize.imgpreview', ()=>{
    //   this.setState({
    //     maxHeight: $(window).height()-90, maxWidth: $(window).width()-22
    //   });
    // });
  }
  componentWillUnMount(){
    //$(window).off('resize.imgpreview');
  }
  render(){
    //let style={maxHeight: this.state.maxHeight, maxWidth: this.state.maxWidth};
    let {src, onClose} = this.props;
    return (
      <div className="im-image-preview-container">
        <a className="close-preview" href="javascript:;" onClick={()=>{onClose()}}>×</a>
        <div className="im-image-preview-wrap"><img src={src}/></div>
      </div>
    )
  }
}
export default function imgPreview(props) {
  let {parent ='panel', } = props;
  let $dialog = $('#im-image-preview-dialog');
  if(!$dialog.length){
    $dialog = $('<div id="im-image-preview-dialog"></div>');
    $dialog.appendTo('body');
  }
  const onClose = ()=>{
    if($dialog.length){
      ReactDOM.unmountComponentAtNode($dialog[0]);
    }
  }
  ReactDOM.render(
    <ImgContent onClose={()=>onClose()} {...props}/>
  , $dialog[0]);
}

