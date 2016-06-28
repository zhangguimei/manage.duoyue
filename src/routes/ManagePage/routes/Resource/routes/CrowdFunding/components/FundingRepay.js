"use strict";
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';

class FundingRepay extends React.Component {
  static defaultProps = {
    data: {}
  };

  render() {
    const { deleteFunc, data } = this.props;
    return (
      <div className="FundingRepay">
        <span className="title-span">回报方式</span>
        <span className="title-span"><a onClick={deleteFunc}>删除</a></span>
        <div className="clearfix">
          <div className="upload-area left">
            <span className="title-span">支持金额</span>
            <img src={data.pic} alt="请上传图片" className="pic-upload"/>
          </div>
          <div className="input-area left clearfix">
            <span className="input-span left">
              <span className="title-span">支持金额</span>
              <div className="input-container">
                <input type="text" className="form-control w80" defaultValue={data.supportNum}/> 元
              </div>
            </span>
            <span className="input-span left">
              <span className="title-span">运费</span>
              <div className="input-container">
                <input type="text" className="form-control w80" defaultValue={data.freight}/> 元
              </div>
            </span>
            <span className="input-span left w140">
              <span className="title-span">人数限制(0为不限制)</span>
              <div className="input-container">
                <input type="text" className="form-control w80" defaultValue={data.limit}/> 人
              </div>
            </span>
            <span className="input-span left">
              <span className="title-span">回报时间</span>
              <div className="input-container">
                <input type="text" className="form-control w100" defaultValue={data.repayTime}/>
              </div>
            </span>
            <span className="title-span">回报说明<span className="gray-span">(100字以内)</span></span>
            <textarea className="form-control w500" defaultValue={data.repayDetail}/>
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