import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated,
  StyleSheet
} from 'react-native';
import Moment from 'moment';

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.mode = this.props.mode || 'date';

    this.format = this.props.format || FORMATS[this.mode];
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    this.height = 259;
    // slide animation duration time, default to 300ms, IOS only
    this.duration = this.props.duration || 300;

    this.confirmBtnText = this.props.confirmBtnText || '确定';
    this.cancelBtnText = this.props.cancelBtnText || '取消';

    this.iconSource = this.props.iconSource || require('../../images/date_icon.png');
    this.customStyles = this.props.customStyles || {};

    // whether or not show the icon
    if (typeof this.props.showIcon === 'boolean') {
      this.showIcon = this.props.showIcon;
    } else {
      this.showIcon = true;
    }

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      disabled: this.props.disabled,
      animatedHeight: new Animated.Value(0)
    };

    this.datePicked = this.datePicked.bind(this);
    this.open = this.open.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onTimePicked = this.onTimePicked.bind(this);
    this.onDatetimePicked = this.onDatetimePicked.bind(this);
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillMount() {
    // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
    console.ignoredYellowBox = [
      'Warning: Failed propType'
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ];
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});

    // slide animation
    if (visible) {
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.height,
          duration: this.duration
        }
      ).start();
    } else {
      this.setState({
        animatedHeight: new Animated.Value(0)
      });
    }
  }

  onPressCancel() {
    this.setModalVisible(false);
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);
  }

  getDate(date = this.props.date) {
    if (date instanceof Date) {
      return date;
    } else {
      return Moment(date, this.format).toDate();
    }
  }

  getDateStr(date = this.props.date) {
    if (date instanceof Date) {
      return Moment(date).format(this.format);
    } else {
      return Moment(this.getDate(date)).format(this.format);
    }
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date));
    }
  }

  onDatePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
      this.datePicked();
    }
  }

  onTimePicked({action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      });
      this.datePicked();
    }
  }

  onDatetimePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date);

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: !this.format.match(/h|a/)
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    }
  }

  onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      });
      this.datePicked();
    }
  }

  open() {
    if (this.state.disabled) {
      return true;
    }

    // reset state
    this.setState({
      date: this.getDate()
    });

    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {

      // 选日期
      if (this.mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this.onDatePicked);
      } else if (this.mode === 'time') {
        // 选时间

        let timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: !this.format.match(/h|a/)
        }).then(this.onTimePicked);
      } else if (this.mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this.onDatetimePicked);
      } else {
        throw new Error('The specified mode is not supported');
      }
    }
  }

  render() {

    return (
      <TouchableHighlight
        style={[Style.dateTouch, this.props.style, this.props.hide && {width:0, height:0}]}
        underlayColor={'transparent'}
        onPress={this.open}
      >
        <View style={[Style.dateTouchBody, this.customStyles.dateTouchBody]}>
          {this.showIcon && <Image
            style={[Style.dateIcon, this.customStyles.dateIcon]}
            source={this.iconSource}
          />}
          {Platform.OS === 'ios' && <Modal
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false);}}
          >
            <TouchableHighlight
              style={Style.datePickerMask}
              activeOpacity={1}
              underlayColor={'#00000077'}
              onPress={this.onPressCancel}
            >
              <TouchableHighlight
                underlayColor={'#fff'}
                style={{flex: 1}}
              >
                <Animated.View style={[Style.datePickerCon, {height: this.state.animatedHeight}, this.customStyles.datePickerCon]}>
                  <DatePickerIOS date={this.state.date}
                    mode={this.mode}
                    minimumDate={this.props.minDate && this.getDate(this.props.minDate)}
                    maximumDate={this.props.maxDate && this.getDate(this.props.maxDate)}
                    onDateChange={(date) => this.setState({date: date})}
                    style={[Style.datePicker, this.customStyles.datePicker]}
                  />
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.onPressCancel}
                    style={[Style.btnText, Style.btnCancel, this.customStyles.btnCancel]}
                  >
                    <Text
                      style={[Style.btnTextText, Style.btnTextCancel, this.customStyles.btnTextCancel]}
                    >
                      {this.cancelBtnText}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.onPressConfirm}
                    style={[Style.btnText, Style.btnConfirm, this.customStyles.btnConfirm]}
                  >
                    <Text style={[Style.btnTextText, this.customStyles.btnTextConfirm]}>{this.confirmBtnText}</Text>
                  </TouchableHighlight>
                </Animated.View>
              </TouchableHighlight>
            </TouchableHighlight>
          </Modal>}
        </View>
      </TouchableHighlight>
    );
  }
}
let Style = StyleSheet.create({
  dateTouch: {
    width: 142
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateText: {
    color: '#333'
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98'
  },
  btnTextCancel: {
    color: '#666'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    alignItems: 'center',
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee'
  }
});
export default DatePicker;