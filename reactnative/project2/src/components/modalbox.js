import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Easing,
  Text,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';

let screen = Dimensions.get('window');

let styles = StyleSheet.create({

  wrapper: {
    backgroundColor: "white"
  },

  transparent: {
    backgroundColor: 'rgba(0,0,0,0)'
  },

  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});

class ModalBox extends Component{

  static propTypes = {
    isOpen: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    backdropPressToClose: React.PropTypes.bool,
    swipeToClose: React.PropTypes.bool,
    swipeThreshold: React.PropTypes.number,
    swipeArea: React.PropTypes.number,
    position: React.PropTypes.string,
    backdrop: React.PropTypes.bool,
    backdropOpacity: React.PropTypes.number,
    backdropColor: React.PropTypes.string,
    backdropContent: React.PropTypes.element,
    animationDuration: React.PropTypes.number,

    onClosed: React.PropTypes.func,
    onOpened: React.PropTypes.func,
    onClosingState: React.PropTypes.func,
  };

  static defaultProps = {
    backdropPressToClose: true,
    swipeToClose: true,
    swipeThreshold: 50,
    position: "center",
    backdrop: true,
    backdropOpacity: 0.5,
    backdropColor: "black",
    backdropContent: null,
    animationDuration: 400
  };

  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(screen.height),
      backdropOpacity: new Animated.Value(0),
      isOpen: false,
      isAnimateClose: false,
      isAnimateOpen: false,
      swipeToClose: false,
      height: screen.height,
      width: screen.width,
      containerHeight: screen.height,
      containerWidth: screen.width,
      isInitialized: false
    };
  }

  componentWillMount() {
    this.createPanResponder();
    this.handleOpenning(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleOpenning(props);
  }

  handleOpenning(props) {
    if (typeof props.isOpen == "undefined") return;
    if (props.isOpen)
      this.open();
    else
      this.close.bind(this);
  }

  /****************** ANIMATIONS **********************/

  /*
   * Open animation for the backdrop, will fade in
   */
  animateBackdropOpen() {
    if (this.state.isAnimateBackdrop) {
      this.state.animBackdrop.stop();
      this.state.isAnimateBackdrop = false;
    }

    this.state.isAnimateBackdrop = true;
    this.state.animBackdrop = Animated.timing(
      this.state.backdropOpacity,
      {
        toValue: 1,
        duration: this.props.animationDuration
      }
    );
    this.state.animBackdrop.start(() => {
      this.state.isAnimateBackdrop = false;
    });
  }

  /*
   * Close animation for the backdrop, will fade out
   */
  animateBackdropClose() {
    if (this.state.isAnimateBackdrop) {
      this.state.animBackdrop.stop();
      this.state.isAnimateBackdrop = false;
    }

    this.state.isAnimateBackdrop = true;
    this.state.animBackdrop = Animated.timing(
      this.state.backdropOpacity,
      {
        toValue: 0,
        duration: this.props.animationDuration
      }
    );
    this.state.animBackdrop.start(() => {
      this.state.isAnimateBackdrop = false;
    });
  }

  /*
   * Stop opening animation
   */
  stopAnimateOpen() {
    if (this.state.isAnimateOpen) {
      if (this.state.animOpen) this.state.animOpen.stop();
      this.state.isAnimateOpen = false;
    }
  }

  /*
   * Open animation for the modal, will move up
   */
  animateOpen() {
    this.stopAnimateClose();

    // Backdrop fadeIn
    if (this.props.backdrop)
      this.animateBackdropOpen();

    // Detecting modal position
    requestAnimationFrame(() => {
      this.state.positionDest = this.calculateModalPosition(this.state.containerHeight, this.state.containerWidth);

      this.state.isAnimateOpen = true;
      this.state.animOpen = Animated.timing(
        this.state.position,
        {
          toValue: this.state.positionDest,
          duration: this.props.animationDuration,
          easing: Easing.elastic(0.8)
        }
      );
      this.state.animOpen.start(() => {
        this.state.isAnimateOpen = false;
        this.state.isOpen = true;
        if (this.props.onOpened) this.props.onOpened();
      });
    });

  }

  /*
   * Stop closing animation
   */
  stopAnimateClose() {
    if (this.state.isAnimateClose) {
      if (this.state.animClose) this.state.animClose.stop();
      this.state.isAnimateClose = false;
    }
  }

  /*
   * Close animation for the modal, will move down
   */
  animateClose() {
    this.stopAnimateOpen();

    // Backdrop fadeout
    if (this.props.backdrop)
      this.animateBackdropClose();

    this.state.isAnimateClose = true;
    this.state.animClose = Animated.timing(
      this.state.position,
      {
        toValue: this.state.containerHeight,
        duration: this.props.animationDuration
      }
    );
    this.state.animClose.start(() => {
      this.state.isAnimateClose = false;
      this.state.isOpen = false;
      this.setState({});
      if (this.props.onClosed) this.props.onClosed();
    });
  }

  /*
   * Calculate when should be placed the modal
   */
  calculateModalPosition(containerHeight, containerWidth) {
    let position = 0;

    if (this.props.position == "bottom") {
      position = containerHeight - this.state.height;
    }
    else if (this.props.position == "center") {
      position = containerHeight / 2 - this.state.height / 2;
    }
    else {
      position = parseInt(this.props.position);
    }
    // Checking if the position >= 0
    if (position < 0) position = 0;
    return position;
  }

  /*
   * Create the pan responder to detect gesture
   * Only used if swipeToClose is enabled
   */
  createPanResponder() {
    let closingState = false;
    let inSwipeArea  = false;

    let onPanRelease = (evt, state) => {
      if (!inSwipeArea) return;
      inSwipeArea = false;
      if (state.dy > this.props.swipeThreshold)
        this.animateClose();
      else
        this.animateOpen();
    };

    let animEvt = Animated.event([null, {customY: this.state.position}]);

    let onPanMove = (evt, state) => {
      let newClosingState = (state.dy > this.props.swipeThreshold) ? true : false;
      if (state.dy < 0) return;
      if (newClosingState != closingState && this.props.onClosingState)
        this.props.onClosingState(newClosingState);
      closingState = newClosingState;
      state.customY = state.dy + this.state.positionDest;

      animEvt(evt, state);
    };

    let onPanStart = (evt, state) => {
      if (!this.props.swipeToClose || this.props.isDisabled || (this.props.swipeArea && (evt.nativeEvent.pageY - this.state.positionDest) > this.props.swipeArea)) {
        inSwipeArea = false;
        return false;
      }
      inSwipeArea = true;
      return true;
    };

    this.state.pan = PanResponder.create({
      onStartShouldSetPanResponder: onPanStart,
      onPanResponderMove: onPanMove,
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    });
  }

  /*
   * Event called when the modal view layout is calculated
   */
  onViewLayout(evt) {
    this.state.height = evt.nativeEvent.layout.height;
    this.state.width = evt.nativeEvent.layout.width;

    if (this.onViewLayoutCalculated) this.onViewLayoutCalculated();
  }

  /*
   * Event called when the container view layout is calculated
   */
  onContainerLayout (evt) {
    let height = evt.nativeEvent.layout.height;
    let width = evt.nativeEvent.layout.width;

    // If the container size is still the same we're done
    if (height == this.state.containerHeight && width == this.state.containerWidth) {
      this.state.isInitialized = true;
      return;
    }

    let modalPosition = this.calculateModalPosition(height, width);
    let coords = {};

    // Fixing the position if the modal was already open or an animation was in progress
    if (this.state.isInitialized && (this.state.isOpen || this.state.isAnimateOpen || this.state.isAnimateClose)) {
      let position = this.state.isOpen ? modalPosition : this.state.containerHeight;

      // Checking if a animation was in progress
      if (this.state.isAnimateOpen) {
        position = modalPosition;
        this.stopAnimateOpen();
      } else if (this.state.isAnimateClose) {
        position = this.state.containerHeight;
        this.stopAnimateClose();
      }
      this.state.position.setValue(position);
      coords = {positionDest: position};
    }

    this.setState({
      isInitialized: true,
      containerHeight: height,
      containerWidth: width,
      ...coords
    });
  }

  /*
   * Render the backdrop element
   */
  renderBackdrop(size) {
    let backdrop  = [];

    if (this.props.backdrop) {
      backdrop = (
        <TouchableWithoutFeedback onPress={this.props.backdropPressToClose ? this.close.bind(this) : null}>
          <Animated.View style={[styles.absolute, size, {opacity: this.state.backdropOpacity}]}>
            <View style={[styles.absolute, {backgroundColor:this.props.backdropColor, opacity: this.props.backdropOpacity}]}/>
            {this.props.backdropContent || []}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }

    return backdrop;
  }

  /*
   * Render the component
   */
  render () {
    let visible     = this.state.isOpen || this.state.isAnimateOpen || this.state.isAnimateClose;
    let size        = {height: this.state.containerHeight, width: this.state.containerWidth};
    let offsetX     = (this.state.containerWidth - this.state.width) / 2;
    let backdrop    = this.renderBackdrop(size);

    if (!visible) return <View/>

    return (
      <View style={[styles.transparent, styles.absolute]} pointerEvents={'box-none'} onLayout={this.onContainerLayout.bind(this)}>
        {backdrop}
        <Animated.View
         onLayout={this.onViewLayout.bind(this)}
         style={[styles.wrapper, size, this.props.style, {transform: [{translateY: this.state.position}, {translateX: offsetX}]} ]}
         {...this.state.pan.panHandlers}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }

  /****************** PUBLIC METHODS **********************/

  open() {
    if (this.props.isDisabled) return;
    if (!this.state.isAnimateOpen && (!this.state.isOpen || this.state.isAnimateClose)) {
      this.onViewLayoutCalculated = () => {
        this.setState({});
        this.animateOpen();
      };
      this.setState({isAnimateOpen : true});
    }
  }

  close() {
    if (this.props.isDisabled) return;
    if (!this.state.isAnimateClose && (this.state.isOpen || this.state.isAnimateOpen)) {
      delete this.onViewLayoutCalculated;
      this.animateClose();
    }
  }


}

class ModalBoxSelect extends Component{
  renderSelect() {
    let {options, selectedId, optionHeight=44, onSelect, defaultSelected=true} = this.props;
    typeof selectedId === 'undefined' && (selectedId=options[0].code);
    return options.map((v,i)=>{
      return (
        <TouchableOpacity  key={i} style={[stylesSelect.option,{height: optionHeight}]} onPress={()=>{
          this.close();
          InteractionManager.runAfterInteractions(() => onSelect(v));
        }}>
          <Text style={[stylesSelect.optionText,defaultSelected && v.code===selectedId &&stylesSelect.optionTextSelected]}>{v.name}</Text>
        </TouchableOpacity>
      );
    });
  }
  render(){
    let {modalHeight, options, optionHeight=44} = this.props;
    if(options.length===0) return null;
    return(
      <ModalBox style={[stylesSelect.modal, {height: modalHeight || optionHeight*options.length}]} swipeToClose={false} position={"bottom"} ref="modalSelect">
        <ScrollView>
          <View style={stylesSelect.select}>
            {this.renderSelect()}
          </View>
        </ScrollView>        
      </ModalBox>
    );
  }
  open() {
    this.refs.modalSelect && this.refs.modalSelect.open();
  }
  close() {
    this.refs.modalSelect && this.refs.modalSelect.close();
  }
}
ModalBoxSelect.propTypes = {
  selectedId: React.PropTypes.number,
  modalHeight: React.PropTypes.number,
  optionHeight: React.PropTypes.number,
  options: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

const {
  width,
  height
} = Dimensions.get("window");


const stylesSelect = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    width,
  },
  option: {
    borderTopWidth:StyleSheet.hairlineWidth,
    borderTopColor:'#ddd',
  },
  optionText: {
    color:'#666',fontSize:14,lineHeight:18,textAlign:'center',marginTop:10,marginBottom:12
  },
  optionTextSelected: {
    color:'#ef8200'
  },
});



ModalBox.Select = ModalBoxSelect;
module.exports = ModalBox;
