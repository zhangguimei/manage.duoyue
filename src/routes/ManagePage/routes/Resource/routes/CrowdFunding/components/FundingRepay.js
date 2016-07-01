/*
 *  Date    : 2016.07.01
 *  Author  : CC
 */
"use strict";
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

const datePickerStart = {
  format: 'yyyy-mm-dd hh:ii:ss ',
  placeHolder: '请选择日期',
  showTimePanel: true
};

class FundingRepay extends React.Component {
  static defaultProps = {
    data: {}
  };

  render() {
    const { deleteFunc, data } = this.props;
    datePickerStart.dateValue = data.repayTime;
    return (
      <div className="FundingRepay mb10">
        <div className="mb10">回报方式</div>
        <div className="mb10"><a onClick={deleteFunc}>删除</a></div>
        <div className="clearfix">
          <FormItem type="imageUpload" name="picUpload" title="支持金额" itemClass="inline-block" defaultValue={data.pic} />
          <div className="input-area inline-block ml20 clearfix">
            <FormItem type="text" title="支持金额" name="supportNum" itemClass="inline-block mb10" className="form-control w80 inline-block"
                        rules={{required: false}} defaultValue={data.supportNum}/> 元
            <FormItem type="text" title="运费" name="freight" itemClass="inline-block mb10 ml30" className="form-control w80 inline-block"
                        rules={{required: false}} defaultValue={data.freight}/> 元
            <FormItem type="text" title="人数限制" desc="(0为不限制)" name="limit" itemClass="people-limit inline-block mb10 ml30" className="form-control w80 inline-block"
                        rules={{required: false}} defaultValue={data.limit}/> 人
            <FormItem type="datePicker" title="回报时间" name="repayTime" data={datePickerStart} itemClass="inline-block mb10 ml45" className="form-control w100 inline-block"
                        rules={{required: false}}/>
            <FormItem type="textarea" title="回报说明" name="repayDetail" itemClass="repay-detail" className="form-control repay-textarea" desc="(100字以内)"
                      rules={{required: false}} defaultValue={data.repayDetail}/>
          </div>
        </div>
      </div>
    );
  }
}

FundingRepay.propTypes = {
  data: PropTypes.object,
  deleteFunc: PropTypes.func
};

export default FundingRepay;