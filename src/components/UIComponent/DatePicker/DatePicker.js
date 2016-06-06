import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Map, is, fromJS} from 'immutable';
import classNames from 'classnames';
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';
import styles from './DatePicker.scss';

const dateData = {
  zh: {
    daysMockData: ['一', '二', '三', '四', '五', '六', '日'],
    monthsMockData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    todayMockData: ['今天', '此刻']
  },
  en: {
    daysMockData: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    monthsMockData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    todayMockData: 'Today'
  }
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDate: {
        year: 0,
        month: 0,
        day: 0,
        daysPanelData: [],
        yearsPanelDate: []
      },
      showCalendar: false,
      showMonthPanel: false,
      showYearPanel: false
    };
    this.pickedDate = {};
    this.todayDate = {};
    this.hoursPanelData = [];
    this.minsPanelData = [];
    this.isShowTimePanel = Map(this.props.data).get('showTimePanel') || false;
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  getDate() {
    let d = new Date();
    const year = d.getFullYear(),
      month = d.getMonth(),
      day = d.getDate(),
      week = d.getDay(),
      hours = d.getHours(),
      minutes = d.getMinutes(),
      seconds = d.getSeconds(),
      ms = d.getMilliseconds();
    return {
      Y: year,
      M: month,
      W: week,
      D: day,
      h: hours,
      min: minutes,
      s: seconds,
      ms: ms
    }
  }

  //获取月份信息,5月份month就传入5
  getMonthInfo(year, month) {
    month = parseInt(month, 10);
    const d = new Date(year, month, 0);
    return {
      firstDay: new Date(year, month - 1, 1).getDay(),//第一天周几
      lastDay: d.getDay(),//最后一天周几
      thisMonthLength: d.getDate(),
      prevMonthLength: new Date(year, month - 1, 0).getDate(),
      nextMonthLength: new Date(year, month + 1, 0).getDate()
    }
  }

  //解析日期字符串返回对象
  parseFormatDate(strDate) {
    const getIndex = (arr, str) => {
      let pattern = new RegExp(str, 'g'),
        index = -1;
      arr.forEach(function (item, i) {
        if (item.search(pattern) > -1) {
          index = i;
          return;
        }
      });
      return index;
    };

    const format = fromJS(this.props).getIn(['data', 'format']),
      isShowTimePanel = this.isShowTimePanel,
      formatDate = strDate.split(/\D/g);

    let formatString = format || (isShowTimePanel ? 'yyyy-mm-dd hh:ii:ss' : 'yyyy-mm-dd'),
      formatArr = formatString.split(/\W/g);

    let resultDate = {
      year: Number(formatDate[getIndex(formatArr, 'y')], 10),
      month: Number(formatDate[getIndex(formatArr, 'm')], 10),
      day: Number(formatDate[getIndex(formatArr, 'd')], 10)
    };
    if (isShowTimePanel) {
      resultDate.hour = Number(formatDate[getIndex(formatArr, 'h')], 10);
      resultDate.minutes = Number(formatDate[getIndex(formatArr, 'i')], 10);
      resultDate.seconds = Number(formatDate[getIndex(formatArr, 's')], 10);
    }
    return resultDate;
  }

  //序列化日期对象为字符串
  stringFormatDate(date = {}) {
    const padZero = (info)=> {
      info = parseInt(info, 10);
      return info < 10 ? ('0' + info) : info;
    };
    const format = fromJS(this.props).getIn(['data', 'format']),
      isShowTimePanel = this.isShowTimePanel;

    let {year, month, day, hour, minutes, seconds} = date;
    hour = padZero(hour);
    minutes = padZero(minutes);
    seconds = padZero(seconds);

    let formatString = format || (isShowTimePanel ? 'yyyy-mm-dd hh:ii:ss' : 'yyyy-mm-dd');
    formatString = formatString.replace(/(yyyy|yy)/g, year).replace('mm', month + 1).replace('dd', day);
    if (isShowTimePanel) {
      formatString = formatString.replace('hh', hour).replace('ii', minutes).replace('ss', seconds);
    }
    return formatString;
  }

  createDaysPanelData(year, month) {
    let startPlaceHolder,
      endPlaceHolder,
      prevMonthString = '',
      thisMonthString = 'live1',
      nextMonthString = 'new1',
      resultMonthString = '',
      tempData = [],
      {
        firstDay,
        thisMonthLength,
        prevMonthLength,
      } = this.getMonthInfo(year, month + 1);

    firstDay = firstDay ? firstDay : firstDay + 7;
    startPlaceHolder = firstDay - 1 ? firstDay - 1 : 7;
    endPlaceHolder = 43 - startPlaceHolder - thisMonthLength;

    if (startPlaceHolder) {
      prevMonthString = `old${prevMonthLength - startPlaceHolder + 1}`;
      for (let i = (prevMonthLength - startPlaceHolder + 2); i < (prevMonthLength + 1); i++) {
        prevMonthString += ',old';
        prevMonthString += i;
      }
    }

    for (let i = 2; i < thisMonthLength + 1; i++) {
      thisMonthString += ',live';
      thisMonthString += i;
    }

    if (endPlaceHolder) {
      for (let i = 2; i < endPlaceHolder; i++) {
        nextMonthString += ',new';
        nextMonthString += i;
      }
    }

    resultMonthString = prevMonthString + ',' + thisMonthString + ',' + nextMonthString;
    resultMonthString = resultMonthString.split(',');
    for (let i = 0; i < resultMonthString.length / 7; i++) {
      tempData[i] = resultMonthString.slice(i * 7, (i + 1) * 7);
    }
    return tempData;
  }

  createYearsPanelData(year) {
    year = parseInt(year, 10);
    let units = year % 10, resultYears = '';
    for (let i = year - (units + 1); i <= year + (10 - units); i++) {
      resultYears += i;
      resultYears += ',';
    }
    resultYears = resultYears.split(',');
    resultYears.pop();
    return resultYears;
  }

  createHourAndMinData() {
    let hoursPanelData = [], minsPanelData = [];
    for (let i = 0; i < 24; i++) {
      hoursPanelData[i] = i < 10 ? ('0' + i) : i;
    }
    for (let i = 0; i < 60; i++) {
      minsPanelData[i] = i < 10 ? ('0' + i) : i;
    }
    this.hoursPanelData = hoursPanelData;
    this.minsPanelData = minsPanelData;
  }

  initTodayDate() {
    const {Y, M, D, h, min, s} = this.getDate();
    let todayInfo = {
        year: Y,
        month: M,
        day: D,
        hour: h,
        minutes: min,
        seconds: s
      },
      temp = {
        daysPanelData: this.createDaysPanelData(Y, M)
      };
    this.setState({
      activeDate: Map(todayInfo).merge(temp).toJS()
    });
    this.todayDate = todayInfo
  }

  onClickToday() {
    this.initTodayDate();
    let result = this.stringFormatDate(this.todayDate);
    this.pickedDate = Map(this.todayDate).toJS();
    this.setInputValue(result);
    this.setState({
      showCalendar: false,
      showMonthPanel: false,
      showYearPanel: false
    });
    this.exportPickedDate(result);
  }

  onClickMonthOrYearTab(type) {
    type = parseInt(type, 10);
    const {activeDate, showYearPanel, showMonthPanel} = this.state,
      tempBool = !!(type > 12);
    let temp = {
      yearsPanelDate: this.createYearsPanelData(type)
    };
    this.setState({
      showMonthPanel: tempBool ? false : !showMonthPanel,
      showYearPanel: tempBool ? !showYearPanel : false
    });
    tempBool && (this.setState({
      activeDate: Map(activeDate).merge(temp).toJS()
    }))
  }

  onClickMonthOrYearItem(monthOrYear) {
    monthOrYear = parseInt(monthOrYear, 10);
    const {activeDate} = this.state,
      tempBool = !!(monthOrYear < 12),
      changeType = tempBool ? 'month' : 'year',
      changeState = tempBool ? 'showMonthPanel' : 'showYearPanel';

    let year = tempBool ? this.pickedDate.year : monthOrYear,
      month = tempBool ? monthOrYear : this.pickedDate.month;
    this.updateThisPickedData({
      year: year,
      month: month
    });
    let tempData = {
      [changeType]: monthOrYear,
      daysPanelData: this.createDaysPanelData(year, month)
    };
    this.setState({
      activeDate: Map(activeDate).merge(tempData).toJS(),
      [changeState]: false
    });
  }

  switchPrevOrNext(type, double) {
    const {
      activeDate: {year, month},
      showMonthPanel,
      showYearPanel
    } = this.state;

    let tempY = year, tempM = month;

    if (showMonthPanel) {
      if (type === 'prev') {
        tempY--;
      } else {
        tempY++;
      }
    } else if (showYearPanel) {
      let interval = double ? 80 : 10;//双击百年穿越
      if (type === 'prev') {
        tempY -= interval;
      } else {
        tempY += interval;
      }
    } else {
      if (type === 'prev') {
        tempM--;
        if (tempM < 0) {
          tempM = 11;
          tempY--;
        }
      } else {
        tempM++;
        if (tempM > 11) {
          tempM = 0;
          tempY++;
        }
      }
    }
    this.updateThisPickedData({
      year: tempY,
      month: tempM
    });
    this.setState({
      activeDate: Map(this.state.activeDate).merge({
        year: tempY,
        month: tempM,
        daysPanelData: this.createDaysPanelData(tempY, tempM),
        yearsPanelDate: this.createYearsPanelData(tempY)
      }).toJS()
    });
  }

  toggleCalendar(type) {
    //debugger;
    type = typeof type === 'boolean' ? type : !this.state.showCalendar;
    this.setState({
      showCalendar: type
    });
  }

  updateThisPickedData(data = {}) {
    for (let type in data) {
      this.pickedDate[type] = data[type];
    }
  }

  onTimeChange(type, e) {
    this.pickedDate[type] = parseInt(e.target.value, 10) || 0;
  }

  onSelectDay(metaInfo) {
    const has = (parent, child) => {
      let pattern = new RegExp(child, 'g');
      return (parent.search(pattern) > -1);
    };

    const {
      state:{activeDate:{year, month}}
    } = this;
    const metaValue = +metaInfo.replace(/(old|live|new)/g, '');
    let yearvalue = year, monthValue = month, dayValue = metaValue;
    let resultDateInfo = {};


    if (has(metaInfo, 'old')) {
      monthValue--;
      if (monthValue < 0) {
        monthValue = 11;
        yearvalue--;
      }
    } else if (has(metaInfo, 'new')) {
      monthValue++;
      if (monthValue > 11) {
        monthValue = 0;
        yearvalue++;
      }
    }
    resultDateInfo = {
      year: yearvalue,
      month: monthValue,
      day: dayValue
    };
    this.pickedDate = Map(this.pickedDate).merge(resultDateInfo).toJS();
    this.setState({
      activeDate: Map(resultDateInfo).set('daysPanelData', this.createDaysPanelData(yearvalue, monthValue)).toJS()
    });
  }

  onClickDone() {
    const isShowTimePanel = this.isShowTimePanel;
    if (isShowTimePanel) {
      if (this.refs.hour) {
        let tempInfo = {
          hour: this.refs.hour.value,
          minutes: this.refs.minutes.value,
          seconds: this.refs.seconds.value
        };
        this.updateThisPickedData(tempInfo);
      }
    }
    let result = this.stringFormatDate(this.pickedDate);
    this.setInputValue(result);
    this.setState({
      showCalendar: false,
      showMonthPanel: false,
      showYearPanel: false
    });
    this.exportPickedDate(result);
  }

  clearInputValue() {
    this.setInputValue('');
    //this.toggleCalendar(false);
    this.initTodayDate();
    this.pickedDate = Map(this.todayDate).toJS();
    this.pickedDate.hour = 0;
    this.pickedDate.minutes = 0;
    this.pickedDate.seconds = 0;
    this.exportPickedDate('');
  }

  setInputValue(info = '') {
    this.refs.input.value = info;
    this.props.field && this.props.field.onUpdate(info);
  }

  exportPickedDate(date) {
    const {getPickDate} = this.props;
    getPickDate(date);
  }

  componentWillMount() {
    this.createHourAndMinData();
  }

  componentDidMount() {
    this.initTodayDate();
    const {data} = this.props,
      dateValue = Map(data).get('dateValue'),
      isShowTimePanel = this.isShowTimePanel;

    if (dateValue) {
      const {year, month, day} = this.parseFormatDate(dateValue);
      let tempMonth = month;
      tempMonth--;
      let selectInfo = {
        year: year,
        month: tempMonth,
        day: day,
        daysPanelData: this.createDaysPanelData(year, tempMonth)
      };
      this.setState({
        activeDate: selectInfo
      });
      this.setInputValue(dateValue);
      this.pickedDate = selectInfo;
      if (isShowTimePanel) {
        const {hour, minutes, seconds} = this.parseFormatDate(dateValue);
        this.updateThisPickedData({
          hour: hour,
          minutes: minutes,
          seconds: seconds
        });
      }
    } else {
      //this.initTodayDate();
      this.pickedDate = Map(this.todayDate).toJS();
      if (isShowTimePanel) {
        this.updateThisPickedData({
          hour: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }
  }

  render() {
    const {
      props: {data, field = {}, className = ""},
      state: {
        activeDate:{year, month, day, daysPanelData=[], yearsPanelDate=[]},
        showCalendar,
        showMonthPanel,
        showYearPanel
      },
      todayDate,
      pickedDate,
      hoursPanelData,
      minsPanelData
    } = this;
    const lang = Map(data).get('lang') || 'zh',
      isShowTimePanel = this.isShowTimePanel;
    const {[lang]: {daysMockData=[], monthsMockData, todayMockData}} = dateData;
    return (
      <div className="DatePicker">
        <div className={`date-input-wrap ${Map(data).get('calendarWrapClassName') || ''}`}>
          <input ref="input" className={`date-input ${className}`} type="text" readOnly="readonly"
                 placeholder={Map(data).get('placeHolder')} {...field}
                 onClick={()=>{::this.toggleCalendar(true)}}/>
          <i className="ic ic-close" title="清空" onClick={()=>{::this.clearInputValue()}}></i>
          <i className="ic ic-calendar" onClick={()=>{::this.toggleCalendar(true)}}></i>
          {
            showCalendar &&
            <div className="DatePicker-days date-menu datePicker-dropdown-left">
              <table className="table-condensed">
                <thead>
                <tr>
                  <th className="prev ic ic-back" onClick={()=>{::this.switchPrevOrNext('prev')}}></th>
                  <th colSpan="2" className="month-wrap" onClick={()=>{::this.onClickMonthOrYearTab()}}>
                    <span className="month">{monthsMockData[month]}</span>
                  </th>
                  <th colSpan="3" className="year-wrap" onClick={()=>{::this.onClickMonthOrYearTab(year)}}>
                <span className="year">
                  {
                    showYearPanel ? (`${yearsPanelDate[1]}~${yearsPanelDate[10]}`) : year
                  }
                </span>
                  </th>
                  <th className="next ic ic-right" onClick={()=>{::this.switchPrevOrNext()}}></th>
                </tr>
                <tr>
                  {
                    (!showMonthPanel && !showYearPanel) &&
                    daysMockData.map((item, i)=> {
                      return (
                        <th className="week" key={i}>{item}</th>
                      )
                    })
                  }
                </tr>
                </thead>
                <tbody>
                <tr>
                  {
                    showMonthPanel &&
                    <td className="month-panel" colSpan="7">
                      {
                        monthsMockData.map((item, i)=> {
                          let isActive = (i === month);
                          return (
                            <span key={i} className={classNames('month-item',{'active': isActive})}
                                  onClick={()=>{::this.onClickMonthOrYearItem(i)}}>{item.slice(0, item.length - 1)}</span>
                          );
                        })
                      }
                    </td>
                  }
                </tr>
                <tr>
                  {
                    showYearPanel &&
                    <td className="year-panel" colSpan="7">
                      {
                        yearsPanelDate.map((item, i)=> {
                          let isActive = (item == pickedDate.year);

                          return (
                            <span key={i} className={classNames('year-item',{'active': isActive})}
                                  onClick={()=>{::this.onClickMonthOrYearItem(item)}}>{item}</span>
                          );
                        })
                      }
                    </td>
                  }
                </tr>
                {
                  (!showMonthPanel && !showYearPanel) &&
                  daysPanelData.map((item, i)=> {
                    return (
                      <tr key={i}>
                        {
                          item.map((item, i)=> {
                            const itemValue = +item.replace(/(old|live|new)/g, '');
                            let isLive = (item.search('live') > -1),
                              isToday = ((year === todayDate.year && month === todayDate.month && itemValue === todayDate.day) && isLive),
                              isActive = ((year === pickedDate.year && month === pickedDate.month && itemValue === pickedDate.day) && isLive);
                            return (
                              <td
                                className={classNames('day', {'live': isLive},{'active': isActive},{'today': isToday})}
                                key={i} onClick={()=>{::this.onSelectDay(item)}}
                                title={isToday ? '今天' : ''}>{itemValue}</td>
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
                </tbody>
                <tfoot>
                {
                  (!showMonthPanel && !showYearPanel && isShowTimePanel) &&
                  <tr>
                    <td colSpan="7">
                      <div className="time-wrap">
                        <select defaultValue={Map(pickedDate).get('hour')} ref="hour" className="time-select"
                                onChange={(e)=>{::this.onTimeChange('hour', e)}}>
                          {
                            hoursPanelData.map((item, i)=> {
                              return (
                                <option value={item} key={i}>{item}</option>
                              )
                            })
                          }
                        </select>
                        <span>时</span>
                      </div>
                      <div className="time-wrap">
                        <select defaultValue={Map(pickedDate).get('minutes')} ref="minutes" className="time-select"
                                onChange={(e)=>{::this.onTimeChange('minutes', e)}}>
                          {
                            minsPanelData.map((item, i)=> {
                              return (
                                <option value={item} key={i}>{item}</option>
                              )
                            })
                          }
                        </select>
                        <span>分</span>
                      </div>
                      <div className="time-wrap">
                        <select defaultValue={Map(pickedDate).get('seconds')} ref="seconds" className="time-select"
                                onChange={(e)=>{::this.onTimeChange('seconds', e)}}>
                          {
                            minsPanelData.map((item, i)=> {
                              return (
                                <option value={item} key={i}>{item}</option>
                              )
                            })
                          }
                        </select>
                        <span>秒</span>
                      </div>
                    </td>
                  </tr>
                }

                <tr>
                  <td colSpan="5" className="today"
                      onClick={::this.onClickToday}>{todayMockData[Number(isShowTimePanel)]}</td>
                  <td colSpan="2" className="switch-wrap done" onClick={::this.onClickDone}>
                    <span className="done">确定</span>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          }
        </div>
      </div>
    );
  }
}

DatePicker.PropTypes = {
  getPickDate: PropTypes.func.isRequired,
  data: PropTypes.shape({
    format: PropTypes.string,  //显示日期的格式eg'yyyy-mm-dd hh:ii:ss'
    dateValue: PropTypes.string,  //已有日期，从后台读取到的
    placeHolder: PropTypes.string,
    showTimePanel: PropTypes.bool, //时候显示时分秒
    calendarWrapClassName: PropTypes.string
  })
};

export default DatePicker;