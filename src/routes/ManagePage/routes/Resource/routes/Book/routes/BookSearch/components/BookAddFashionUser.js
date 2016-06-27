'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import DatePicker from '../../UIComponent/DatePicker/DatePicker';
import Validate from './Validate/BookSetFashionValidate';
import {InputF, SelectF} from '../../PageTest/ValidationForm/ValidationComponents';

const fields = ['merchantName', 'startDate', 'endDate', 'inventory', 'unitPrice'];

class BookAddFashionUser extends React.Component {
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
    console.log('开始时间不能大于结束时间！');
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
    const {fashionTableData, handleSubmit, fields: {merchantName, startDate, endDate, unitPrice}} = this.props;
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <form className="BookAddFashionUser" onSubmit={handleSubmit}>
        <div className="tag-info-title w150"><span className="red interval-margin">*</span>请选择商户</div>
        <SelectF field={merchantName} options={fashionTableData.userOption}/>
        <div className="form-title">
          <div>有效期</div>
          <DatePicker field={startDate} data={datePickerData} getPickDate={::this.getPickDate}
                      className={startDate.touched && startDate.error ? "error-input" : ""}/>
          <span className="validity-center-text">至</span>
          <DatePicker field={endDate} data={datePickerData} getPickDate={::this.getPickDateEnd}
                      className={endDate.touched && endDate.error ? "error-input" : ""}/>
        </div>
        <InputF field={unitPrice} className="info-input input w300" label="分账单价"/>
      </form>
    )
  }
}

BookAddFashionUser.propTypes = {
  fashionTableData: PropTypes.object,
  handleSubmit: PropTypes.func,
  fields: PropTypes.shape({
    merchantName: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    unitPrice: PropTypes.string
  })
};

export default reduxForm({
    form: 'bookfashionform',
    fields,
    validate: Validate
  },
  state => ({
    initialValues: state.book.toJS().fashionInfoData
  })
)(BookAddFashionUser);