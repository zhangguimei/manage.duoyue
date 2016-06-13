import React, {PropTypes} from 'react';
import styles from './DatePickerTestPage.scss';

import DatePicker from '../../UIComponent/DatePicker/DatePicker'
import CascadeSelect from '../../UIComponent/CascadeSelect/CascadeSelect'
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';

class DatePickerTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      check: true,
      selectAddress: {}
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
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

  getSelectData(info) {
    this.setState({
      selectAddress: info
    });
  }

  drawHeart(ele) {
    if (ele.getContext) {
      let ctx = ele.getContext('2d');
      ctx.fillStyle = '#ff2233';
      ctx.beginPath();
      ctx.moveTo(75, 40);
      ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.fill();
    }
  }

  componentDidMount() {
    this.drawHeart(this.refs.heartCvs);
    this.drawHeart(this.refs.heartCvs2);
  }

  render() {
    const {startDate, endDate, check, selectAddress} = this.state;
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
    let locationData = {
      showGenre: ['省/市', '市/县', ''],
      defaultItemVaule: '---------无--------',
      addressValue: ['湖北', '武汉', '新洲', 2003]
    };
    return (
      <div className="DatePickerTestPage clearfix animated rubberBand">
        <span>shake-heart</span>
        <canvas ref="heartCvs" width="130" height="130" className="hvr-shake-heart"></canvas>
        <span>shake-crazy</span>
        <canvas ref="heartCvs2" width="130" height="130" className="hvr-shake-crazy"></canvas>
        <div className="datePicker-test-wrap">
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
        <p>name:{selectAddress.name}</p>
        <p>id:{selectAddress.id}</p>
        <CascadeSelect data={locationData} getSelectInfo={::this.getSelectData}/>
      </div>
    );
  }
}

DatePickerTestPage.PropTypes = {};

export default DatePickerTestPage;