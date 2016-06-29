'use strict';
import React from 'react';
import {reduxForm} from 'redux-form';
import AccountValidate from './Validate/AccountValidate';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import styles from './ArticleSearch.scss';

const fields = ['name', 'price', 'startDate', 'endDate', "handleSubmit", "submitting"];
class AccountAdd extends React.Component {
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
    const {fields: {startDate, endDate}} = this.props;
    const datePickerData = {
      format: 'yyyy-mm-dd',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <form className="AccountAdd">
        <div className="form-group">
          <label className="show">请选择用户</label>
          <input className="form-control w180"/>
        </div>
        <div className="form-group">
          <label className="show">有效期</label>
          <DatePicker field={startDate} data={datePickerData} getPickDate={() =>this.getPickDate(startDate.value)}
                      className={startDate.touched && startDate.error ? "error-input" : ""}/>
          <span className="to">至</span>
          <DatePicker field={endDate} data={datePickerData} getPickDate={() =>this.getPickDateEnd(endDate.value)}
                      className={endDate.touched && endDate.error ? "error-input" : ""}/>
        </div>
        <div className="form-group">
          <label className="show">分账单价</label>
          <input className="form-control w180"/>&nbsp;元
        </div>
      </form>
    )
  }
}

export default reduxForm({
    form: 'accountform',
    fields,
    validate: AccountValidate
  },
  state => ({
    initialValues: state.article.toJS().accountData
  })
)(AccountAdd);
