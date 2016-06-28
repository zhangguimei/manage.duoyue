'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fromJS } from 'immutable';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';

import FundingRepay from './FundingRepay';

class FundingDetail extends React.Component {

  static defaultProps = {
    data: {repayList: []}
  };

  constructor(props) {
    super(props);
    let repayList = this.props.data.repayList.map((item) => {
      return item.id;
    });
    this.state = {
      startDate: '',
      endDate: '',
      check: true,
      repayArray: repayList.length > 0 ? repayList : [1]
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

  addRepay() {
    let { repayArray } = this.state;
    this.setState({
      repayArray: repayArray.length > 0 ? repayArray.concat(repayArray[repayArray.length - 1] + 1) : [1]
    });
  }

  deleteRepay(index) {
    const { repayArray } = this.state;
    let IrepayArray = fromJS(repayArray);
    IrepayArray = IrepayArray.delete(repayArray.indexOf(index));
    this.setState({
      repayArray: IrepayArray.toJS()
    });
  }

  render() {
    let {data} = this.props;
    const { repayArray } = this.state;
    let RepayArea = [];
    for (let index of repayArray) {
      let repayData = data.repayList.filter((item) => {
        return item.id == index;
      })[0];
      RepayArea = RepayArea.concat(<FundingRepay data={repayData} deleteFunc={() => this.deleteRepay(index)}
                                                 key={index}/>);
    }
    let datePickerStart = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: data.startTime,
        placeHolder: '请选择日期',
        showTimePanel: true
      },
      datePickerEnd = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: data.endTime,
        placeHolder: '请选择日期',
        showTimePanel: true
      };
    return (
      <div className="FundingDetail">
        <form className="form-inline" id="myform" name="myform" method="get" action="">
          <div className="group-title">项目基本信息</div>
          <div className="clearfix">
            <div className="info-left left">
              <label className="control-label"><span className="red">*</span>项目标题</label>
              <div className="input-container">
                <input type="text" className="form-control w500" defaultValue={data.title}/>
              </div>
              <div className="clearfix">
                <div className="dw170 left">
                  <label className="control-label"><span className="red">*</span>需要的筹集额</label>
                  <div className="input-container">
                    <input type="text" className="form-control w100" defaultValue={data.wantedNum}/><span> 元</span>
                  </div>
                </div>
                <div className="dw170 left">
                  <label className="control-label">开始日期</label>
                  <div className="input-container">
                    <DatePicker data={datePickerStart} getPickDate={::this.getPickDate} className="w100"/>
                  </div>
                </div>
                <div className="dw170 left">
                  <label className="control-label">结束日期</label>
                  <div className="input-container">
                    <DatePicker data={datePickerEnd} getPickDate={::this.getPickDateEnd} className="w100"/>
                  </div>
                </div>
              </div>
              <label className="control-label">项目简介（200字以内）</label>
              <div className="input-container">
                <textarea className="form-control w500" defaultValue={data.desc}/>
              </div>
            </div>
            <div className="info-right left">
              <label className="control-label">发起人姓名</label>
              <div className="input-container">
                <input type="text" className="form-control w100" defaultValue={data.userName}/>
              </div>
              <label className="control-label">身份证号</label>
              <div className="input-container">
                <input type="text" className="form-control w200" defaultValue={data.userID}/>
              </div>
              <label className="control-label">联系手机</label>
              <div className="input-container">
                <input type="text" className="form-control w200" defaultValue={data.cellPhone}/>
              </div>
            </div>
          </div>
          <div className="padding-vertical">项目图片</div>
          <img className="pic-upload" alt="请上传图片" src={data.pic}/>

          <div className="group-title">项目回报</div>
          {RepayArea}
          <div className="add-container"><span className="add-btn" onClick={::this.addRepay}>+增加回报项</span></div>

          <div className="group-title">*详细信息</div>
          <div className="input-container">
            <textarea className="editor" defaultValue={data.detail}/>
          </div>
        </form>
      </div>
    );
  };
}

FundingDetail.propTypes = {
  data: PropTypes.object
};

export default FundingDetail;