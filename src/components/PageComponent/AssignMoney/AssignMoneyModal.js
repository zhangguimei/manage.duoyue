'use strict';
import React, {PropTypes} from 'react';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';

class AssignMoneyModal extends React.Component {
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
    const {optionsData=[], modifyData, handleSubmit} = this.props;
    let showData = modifyData[0] || {}, defaultvalue = null;
    let selectCode = optionsData.map((item)=>{
      if (item.content == showData.merchantName) defaultvalue = item.value;
      return (
        <option key={item.value} value={item.value}>{item.content}</option>
      )
    });
    let datePickerStartData = {
      format: 'yyyy-mm-dd hh:ii:ss',
      dateValue: showData.startDate || '',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    let datePickerEndData = {
      format: 'yyyy-mm-dd hh:ii:ss',
      dateValue: showData.endDate || '',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <form className="AssignMoneyModal" onSubmit={handleSubmit}>
        <span className="subtitle">请选择商户</span>
        <select defaultValue={defaultvalue} className="form-control w200">
          {selectCode}
        </select>
        <div className="form-title">
          <span className="subtitle">有效期</span>
          <DatePicker data={datePickerStartData} getPickDate={::this.getPickDate}/>
          <span className="validity-center-text">至</span>
          <DatePicker data={datePickerEndData} getPickDate={::this.getPickDateEnd}/>
        </div>
        <div className="input-model">
          <span className="subtitle">分账单价</span>
          <input type="text" className="form-control w200" defaultValue={showData.unitPrice}/>
        </div>
      </form>
    )
  }
}

AssignMoneyModal.propTypes = {
  optionsData: PropTypes.array,
  modifyData: PropTypes.array,
  handleSubmit: PropTypes.func
};

export default AssignMoneyModal;