/*
 *  Project : Basic
 *  Date    : 2016/7/5
 *  Author  : Melody Yuen
 *  Declare : ResponseModify
 */

'use strict';
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Radio from 'UIComponentFolder/Radio/Radio';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';

class ResponseModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: ''
    };
  }

  checkDate(start, end) {
    if (!start || !end) {
      return;
    }
    start = new Date(start);
    end = new Date(end);
    this.setState({
      check: !(end < start)
    });
    (end < start) &&
    alert('开始时间不能大于结束时间！');
  }

  getPickDate(date) {
    const {endDate} = this.state;
    this.setState({
      startDate: date
    });
    this.checkDate(date, endDate);
  }

  getPickDateEnd(date) {
    const {startDate} = this.state;
    this.setState({
      endDate: date
    });
    this.checkDate(startDate, date);
  }

  render() {
    const {data:{title, startTime, endTime, isClickEvent, selectedID}} = this.props,
      {startDate, endDate} =this.state;
    const startPickerData = {
        format: 'yyyy-mm-dd hh:ii:ss',
        placeHolder: '请选择日期',
        showTimePanel: true,
        dateValue: startTime
      },
      endPickerData = {
        format: 'yyyy-mm-dd hh:ii:ss',
        placeHolder: '请选择日期',
        showTimePanel: true,
        dateValue: endTime
      }, options = [
        {
          "id": 1,
          "value": "前端"
        },
        {
          "id": 2,
          "value": "后端"
        }
      ];
    return (
      <div className="ResponseModify">
        <div className="form-default">
          <FormItem title="公众号名称" defaultValue={title} className="form-control w400" rules={{required: true}}
                    requireError/>
          <div className="form-group">
            <label><i className="text-danger">*</i>消息有效期</label>
            <div className="date-wrap">
              <DatePicker field={startDate} data={startPickerData} dateValue="" getPickDate={::this.getPickDate}
                          className={startDate.touched && startDate.error ? "error-input" : ""}/>
              &nbsp;至&nbsp;
              <DatePicker field={endDate} data={endPickerData} dateValue="" getPickDate={::this.getPickDateEnd}
                          className={endDate.touched && endDate.error ? "error-input" : ""}/>
            </div>
          </div>
          <div className="form-group">
            <label><i className="text-danger">*</i>事件类型</label>
            <div>
              <Radio name="isClickEvent" defaultChecked={!isClickEvent} title="订阅(关注微信)"/>
              <Radio name="isClickEvent" defaultChecked={isClickEvent} title="CLICK (自定义菜单事件)"/>
            </div>
          </div>
          <FormItem title="点击菜单" type="select" className="form-control" options={options} defaultValue={selectedID}/>
        </div>
      </div>
    );
  }
}

ResponseModify.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    isClickEvent: PropTypes.boolean,
    selectedID: PropTypes.array
  })
};

export default ResponseModify;