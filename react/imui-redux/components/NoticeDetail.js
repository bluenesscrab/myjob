import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {UserType} from '@liepin/imcore/constants';
import getConfig from '../config';
import {getBrief,dateFormat} from '../utils';
import {Atlog} from '../common/addTlog';
import {noticeActions} from '../actions';
import '../css/NoticeDetail.css';
import NoticeDetailList from './NoticeDetailList';
class NoticeDetail extends Component{
  constructor(props) {
    super(props);
    this.current = 0;
    this.Dom = null;
    
  }
  componentDidMount() {
    let that = this;
    let {index,sysMsgList,totalCnt,loading,actions,imcore,curPage,noticeDetail} = this.props;
    new ScrollDialog({
      dom: that.refs.detailMain,
      width: 600,
      modal: true,
      current: index,
      totalPage :totalCnt,
      callback(data){
        let noticeData = {};
        sysMsgList.forEach((v,i)=>{
          if(i===data.current){
            noticeData = v;
          }
        })
        actions.hasReadNotice(imcore,noticeData,index);
        if(data.current >= data.length-2 && data.current < data.totalPage-1){
          ++curPage;
          actions.getNoticeList(imcore,curPage);
        }
      }
    });
  }
  render(){
    let {imcore, actions,sysMsgList,totalCnt,index,closeDetail} = this.props;
    return (
      <div className="notice-detail">
        <div className="scroll-dialog-main" ref="detailMain">
          <a className="sd-close webim-icons32 icons32-detail-close" href="javascript:;" onClick={()=>closeDetail(imcore)}></a>
          <NoticeDetailList imcore={imcore} sysMsgList={sysMsgList}/>
          <article>
            <p className="change-page">
              <a data-selector="prev-btn" className="prev-btn webim-icons32 icons32-prev-btn" href="javascript:;"></a>
            </p>
            <span><i data-selector="current-page">{index+1}</i>/<i data-selector="total-page">{totalCnt}</i></span>
            <p className="change-page">
              <a data-selector="next-btn" className="next-btn webim-icons32 icons32-next-btn" href="javascript:;"></a>
            </p>
          </article>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {
  return {
    sysMsgList: state.notice.sysMsgList,
    totalCnt: state.notice.totalCnt,
    curPage: state.notice.curPage,
    loading: state.contacts.loading,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...noticeActions,
  }, dispatch)
});

class ScrollDialog{
  constructor(options){
    this.options = $.extend({
      current: 0,
      content: '',
      dom: null,
      init: null,
      modal: true, //是否需要蒙层
      close: null,
      width: 800,  //弹层宽度
      canScroll: true,
      speed: 1500,  //尽量不要动，太小会连续滚动
      totalPage: 0, //总共页数（必须要传）
      callback: null
    }, ScrollDialog._options, options);
    this._init();
  }
  static _options = {
    zIndex: 1000,
    cache:[]
  }


  /**
 * 初始化对话框
 * @method _init
 * @return {this}
 */
  _init() {
    let that = this,
      html = $(that.options.dom);
    // 缓存 DOM
    that.DOM = {
      wrap: html,
      close: html.find('.sd-close'),
      content: html.find('.scroll-box'),
      prevBtn: html.find('[data-selector="prev-btn"]'),
      nextBtn: html.find('[data-selector="next-btn"]'),
      totalPage: html.find('[data-selector="total-page"]'),
      currentPage: html.find('[data-selector="current-page"]'),
      article: html.find('article'),
      modal: null
    };
    // 创建 DOM
    that._build();
    // 尺寸
    that.width(that.options.width);
    // init
    that.init(that.options.init);
    // 模态窗口
    if (that.options.modal) {
      that.showModal();
    }
    $(window).on('resize', function() {
      that.refresh();
    }).trigger('resize');
    return that;
  };

  init(fn) {
    let that =this,
      length = $('.scroll-item',this.DOM.wrap).length;
    that.length = length;
    that.DOM.totalPage.html(that.options.totalPage);
    that.DOM.currentPage.html(that.options.current + 1);
    that.options.init = fn;

    if (typeof fn === 'function') {
      that.options.init.call(that);
    }
    that.event();
    return that;
  };

  event(){
    var that = this;
    that.DOM.wrap.on('mousewheel DOMMouseScroll', function(event, delta) {
      let itemWrapH = $(event.target).closest('.content-box') ? $(event.target).closest('.content-box').height() : 0,
        itemContentH = $(event.target).closest('.content-main') ? $(event.target).closest('.content-main').height() : 0;
      //event.stopPropagation();
      if(itemWrapH < itemContentH && $(event.target).closest('.content-box')){
        return;
      }
      if(!that.options.canScroll) return;
      let deltaY = -event.originalEvent.detail / 3 || event.originalEvent.wheelDelta / 120,
        deltaNum = Math.round(Math.abs(deltaY)/2),
        diff = that.length-1-that.options.current;

        if(deltaY < 0){ //往下滚
          if(that.options.current >= that.options.totalPage-1) return;

          if(deltaNum >= diff){
            that.options.current = that.length-1;
            that.options.canScroll = true;
          } else if(deltaNum <=2) {
            that.options.current ++;
          }
          that._move();
        } else { 
          if(that.options.current <= 0) return;
          if(deltaNum >= that.options.current){
            that.options.current = 0;
            that.options.canScroll = true;
          } else {
            that.options.current --;
          }
          that._move();
        }
    });
    that.DOM.prevBtn.on('click', function(event) {
      if(that.options.current <= 0) return;
      that.options.current --;
      that._move();
    });
    that.DOM.nextBtn.on('click', function(event) {
      if(that.options.current >= that.options.totalPage-1) return;
      that.options.current ++;
      that._move();
    });
  }

  _move(){
    let that=this;
    that.options.canScroll = false;
    that.DOM.content.stop().animate({
      top: -that.itemH * that.options.current+'px'
    }, that.options.speed, function(){
      that.options.canScroll = true;
      that.options.canAjax = true;

      that.DOM.currentPage.html(that.options.current+1);
      that.refresh();
      that._callback();
    });
  }

  //回调
  _callback(){
    var that = this;
    that.options.callback && that.options.callback.call(that,{
      current: that.options.current,
      totalPage: that.options.totalPage,
      length: that.length
    });
  }
  /**
   * 将对话框添加到当前页面 DOM 中
   * @method _build
   * @return {this}
   */
  _build() {
    let that = this,
      wrap = this.DOM.wrap;
    // 外层
    wrap.css({
      zIndex: ++ScrollDialog._options.zIndex
    });
    wrap.appendTo(wrap.closest('.notice-detail'));
    ScrollDialog._options.cache.push({
      dialog: this
    });
    return this;
  };

  /**
   * 设置对话框的宽度
   * @method width
   * @param  {Number|String} width 宽度值
   * @return {this}
   */
  width(width) {
    if (width === undefined) {
      return this.options.width;
    } else {
      this.options.width = width;
      this.DOM.content.width(this.options.width);
      this.refresh();
      return this;
    }
  };

  /**
   * 重新设置对话框高度
   * @method refresh
   * @return {this}
   */
  refresh() {
    let itemH;
    let winH = $(window).height(),
      height = winH-140,
      item = $('.scroll-item', this.DOM.content);
    item.css({
      height: height+'px'
    });
    itemH = item.outerHeight(true);
    this.itemH =itemH ;
    this.DOM.content.css({
      top: -itemH*this.options.current+'px'
    });

    if(this.options.width){
      this.DOM.content.css({'margin-left': -(this.options.width + 68)/2 +'px'});
      this.DOM.article.css({'margin-left': (this.options.width + 68)/2 -48 +'px'});
      this.DOM.close.css({'margin-left': (this.options.width + 68)/2 -48 +'px'});
    }
    this.length = $('.scroll-item',this.DOM.wrap).length;
    this.options.current == 0 ? this.DOM.prevBtn.addClass('icons32-prev-btn-disabled').removeClass('icons32-prev-btn'):this.DOM.prevBtn.addClass('icons32-prev-btn').removeClass('icons32-prev-btn-disabled');
    this.options.current == this.options.totalPage-1 ? this.DOM.nextBtn.addClass('icons32-next-btn-disabled').removeClass('icons32-next-btn'):this.DOM.nextBtn.addClass('icons32-next-btn').removeClass('icons32-next-btn-disabled');

  };

  /**
   * 显示蒙层
   * @method showModal
   * @param  {HTMLElement}  
   * @return {this}
   */
  showModal() {
    this.DOM.modal = this.DOM.modal || $('<div />').addClass('scroll-dialog-modal').css({
      zIndex: ScrollDialog._options.zIndex
    }).insertBefore(this.DOM.wrap);
    this.DOM.wrap.show();
    this.refresh();

    return this;
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetail);