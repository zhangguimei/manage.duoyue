/*
 *  Date    : 2016.07.01
 *  Author  : CC
 */
'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fromJS } from 'immutable';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import FundingRepay from './FundingRepay';

const datePickerStart = {
    format: 'yyyy-mm-dd hh:ii:ss ',
    placeHolder: '请选择日期',
    showTimePanel: true
  },
  datePickerEnd = {
    format: 'yyyy-mm-dd hh:ii:ss ',
    placeHolder: '请选择日期',
    showTimePanel: true
  };

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
    const { repayArray } = this.state;
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
    const { data } = this.props,
      { repayArray } = this.state;
    let RepayArea = [];
    for (let index of repayArray) {
      let repayData = data.repayList.filter((item) => {
        return item.id == index;
      })[0];
      RepayArea = RepayArea.concat(<FundingRepay data={repayData} deleteFunc={() => this.deleteRepay(index)}
                                                 key={index}/>);
    }
    datePickerStart.dateValue = data.startTime;
    datePickerEnd.dateValue = data.endTime;
    return (
      <div className="FundingDetail">
        <form id="myform" name="myform" method="get" action="">
          <div className="group-title">项目基本信息</div>
          <div className="clearfix">
            <div className="info-left left">
              <FormItem type="text" title="项目标题" name="detail" itemClass="mb10" className="form-control w500"
                        rules={{required: true}} tips={{required:"请输入标题"}} defaultValue={data.title}/>
              <FormItem type="text" title="需要的筹集额" name="detail" itemClass="w100 mb10 inline-block"
                        className="form-control w100"
                        rules={{required: true}} tips={{required:"请输入需要的筹集额"}} defaultValue={data.wantedNum}/> 元
              <FormItem type="datePicker" title="开始日期" name="startTime" itemClass="inline-block w170 ml60"
                        rules={{required: false}} data={datePickerStart} getPickDate={::this.getPickDate}/>
              <FormItem type="datePicker" title="结束日期" name="endTime" itemClass="w170 inline-block"
                        rules={{required: false}} data={datePickerEnd} getPickDate={::this.getPickDate}/>
              <FormItem type="textarea" title="项目简介（200字以内）" name="detail" className="form-control w500 mb5"
                        rules={{required: false}} defaultValue={data.desc}/>
            </div>
            <div className="info-right left">
              <FormItem type="text" title="发起人姓名" name="name" itemClass="mb10" className="form-control w100"
                        rules={{required: false}} defaultValue={data.userName}/>
              <FormItem type="text" title="身份证号" name="name" itemClass="mb10" className="form-control w200"
                        rules={{required: false}} defaultValue={data.userID}/>
              <FormItem type="text" title="联系手机" name="name" itemClass="mb10" className="form-control w200"
                        rules={{required: false}} defaultValue={data.cellPhone}/>
            </div>
          </div>
          <FormItem type="imageUpload" name="pic1" title="项目图片" itemClass="inline-block" defaultValue={data.pic1}/>
          <FormItem type="imageUpload" name="pic2" itemClass="inline-block ml20" defaultValue={data.pic2}/>
          <FormItem type="imageUpload" name="pic3" itemClass="inline-block ml20" defaultValue={data.pic3}/>

          <div className="group-title">项目回报</div>
          {RepayArea}
          <div className="add-container"><span className="add-btn" onClick={::this.addRepay}>+增加回报项</span></div>

          <div className="group-title">*详细信息</div>
          <FormItem type="textarea" name="editor" className="editor" rules={{required: false}}
                    defaultValue={data.detail}/>
        </form>
      </div>
    );
  };
}

FundingDetail.propTypes = {
  data: PropTypes.object
};

export default FundingDetail;