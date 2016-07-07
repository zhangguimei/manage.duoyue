/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-关键字应用-点击配置-基本信息
 */

'use strict';
import React from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      start: this.props.data.validityStartData,
      end: this.props.data.validityEndData
    };
  }

  checkDate(start, end) {
    if(!start || !end) {
      return
    }
    start = new Date(start);
    end = new Date(end);
    this.setState({
      check: !(end < start)
    });
    (end < start) &&
    console.log('开始时间不能大于结束时间')
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
    const {start,end} = this.state, {data} = this.props;
    let datePickerStartData = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: start,
        placeHolder: '请选择日期 ',
        showTimePanel: true
      },
      datePickerEndData = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: end,
        placeHolder: '请选择日期 ',
        showTimePanel: true
      };
    return (
      <form className="BasicInfo form-default">
        <div className="form-group">
          <FormItem className="form-control" type="datePicker" data={datePickerStartData} title=" 有效日期"
                    getPickDate={::this.getPickDate}/>
          <span>&nbsp;-&nbsp;</span>
          <FormItem className="form-control" type="datePicker" data={datePickerEndData}
                    getPickDate={::this.getPickDateEnd}/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="关键字" name="keyword"
                    defaultValue={data.keyword} rules={{required: true}} requireError/>
        </div>
      </form>
    )
  }
}

export default BasicInfo;