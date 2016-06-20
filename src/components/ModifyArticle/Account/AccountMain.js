import React from 'react';
import { reduxForm } from 'redux-form';
import {InputF, SelectF, InputNumber, InputTree} from '../../PageTest/ValidationForm/ValidationComponents';
import AccountValidate from '../../ModifyArticle/Validate/AccountValidate';
import DatePicker from '../../UIComponent/DatePicker/DatePicker';

const submit = (values, dispatch) => {
  return new Promise((resolve) => {
    resolve(values.name)
  })
  this.props.submitChange(values.name)
}
const fields = [ 'name', 'price', 'startDate', 'endDate', "handleSubmit", "submitting"];
class AccountMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      check: true
    }
  }

  checkDate(start, end) {
    if(!start || !end) {
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
    const {data, fields: { name, price, startDate, endDate}} = this.props;
    const {id } = this.props;
    let current_date = new Date();
    let datePickerData = {
      format: 'yyyy-mm-dd',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <form className="AccountMain">
        <div className="title">
          <InputF field={name} className="name-input" label="请选择用户" defaultPrompt="必填" required={true} showError={true}/>
        </div>
        <div className="InputF">
          <div className="label-span">
         有效期
        </div>
        <DatePicker field={startDate} data={datePickerData} getPickDate={() =>this.getPickDate(startDate.value)} className={startDate.touched && startDate.error ? "error-input" : ""}/>
        <span className="to">至</span>
        <DatePicker field={endDate} data={datePickerData} getPickDate={() =>this.getPickDateEnd(endDate.value)} className={endDate.touched && endDate.error ? "error-input" : ""}/>
        </div>
        <div className="title">
          <div className="price">
            <InputF field={price} className="name-input" label="分账单价"/><span className="unit">元</span>
          </div>
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
)(AccountMain);
