import React, {PropTypes} from 'react';
import styles from './DatePickerTestPage.scss';

import DatePicker from '../../UIComponent/DatePicker/DatePicker'

class DatePickerTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      check: true
    }
  }

  checkDate(start, end) {
    if (!start || !end) {
      return
    }
    start = new Date(start);
    end = new Date(end);
    this.setState({
      check: !(end < start)
    });
    (end < start) &&
    console.log('开始时间不能大于结束时间！')
  }

  getPickDate(date) {
    const {endDate} = this.state;
    this.setState({
      startDate: date
    });
    this.checkDate(date, endDate)
  }

  getPickDateEnd(date) {
    const {startDate} = this.state;
    this.setState({
      endDate: date
    });
    this.checkDate(startDate, date)
  }

  render() {
    const {startDate, endDate, check} = this.state;
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    let datePickerData2 = {
      format: 'yyyy-mm-dd',
      dateValue: '',
      calendarWrapClassName: 'newWrap'
    };
    return (
      <div className="DatePickerTestPage clearfix">
        <div className="test1 left">
          <p>开始时间:{startDate}</p>
          <DatePicker data={datePickerData} getPickDate={::this.getPickDate}/>

        </div>
        <div className="test2 left">
          <p>结束时间:{endDate}</p>
          <DatePicker data={datePickerData2} getPickDate={::this.getPickDateEnd}/>
        </div>
        <p className="checked">{check ? ')' : '('}</p>
      </div>
    );
  }
}

DatePickerTestPage.PropTypes = {};

export default DatePickerTestPage;