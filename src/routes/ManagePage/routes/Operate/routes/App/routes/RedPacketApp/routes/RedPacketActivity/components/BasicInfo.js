/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用-红包活动-点击配置-基本信息
 */

'use strict';
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import PhotoMaterial from 'PageComponentFolder/PhotoMaterial/PhotoMaterial';
import RedPacketActivity from './RedPacketActivity.scss'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      start: this.props.data.startData,
      end: this.props.data.endData
    };
  }

  checkDate(start, end) {
    if (!start || !end) {
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
    const {start, end} = this.state, {data} = this.props;
    const datePickerStartData = {
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
      },
      selectData = [
        {
          "id": 1,
          "value": "6.18狂欢"
        }
      ];
    return (
      <form className="BasicInfos form-default">
        <div className="basicInfo-top clearfix">
          <div className="basicInfo-top-left left">
            <div className="form-group">
              <FormItem type="text" className="form-control w300" title="活动名称(如：猜灯谜抢红包活动)" name="title"
                        defaultValue={data.title} rules={{required: true}} requireError/>
            </div>
            <br/>
            <br/>
            <div className="form-group">
              <FormItem type="imageUpload" className="w300" name="image" title="封面（大图片建议尺寸：900像素 * 500像素）"
                        defaultValue=""/>
            </div>
          </div>
          <div className="basicInfo-top-right">
            <div className="form-group">
              <FormItem type="textarea" className="form-control w300" title="红包祝福语（如：感谢您参加猜灯谜活动，祝您元宵节快乐！）"
                        name="greetings"
                        defaultValue={data.greetings}/>
            </div>
            <div className="form-group">
              <FormItem type="text" className="form-control w300" title="提供方名称 (如：天虹百货)" name="providerName"
                        defaultValue={data.providerName}/>
            </div>
            <div className="form-group">
              <FormItem type="text" className="form-control w300" title="红包发送者名称(如：天虹百货小王)" name="senderName"
                        defaultValue={data.greetings}/>
            </div>
            <div className="form-group">
              <FormItem type="text" className="form-control w300" title="备注信息(如：猜越多得越多，快来抢！)" name="remarks"
                        defaultValue={data.remarks}/>
            </div>
            <div className="form-group">
              <FormItem type="text" className="form-control w300" title="未领取到红包说明(如：很抱歉您没有中奖！)" name="explain"
                        defaultValue={data.explain}/>
            </div>
          </div>
        </div>
        <div className="basicInfo-bottom">
          <h4 className="basicInfo-bottom-title">红包规则</h4>
          <div className="basicInfo-bottom-main">
            <div className="form-group w300">
              <FormItem type="text" className="form-control w100" title="红包发放总金额（单位元）" name="totalAmount"
                        defaultValue={data.totalAmount}/><span className="unit">元</span>

            </div>
            <div className="form-group w300">
              <FormItem type="text" className="form-control w100" title="红包发放总个数" name="totalNum"
                        defaultValue={data.totalNum}/><span className="unit">个</span>
              <div className="f12 mt5">（小于等于 总金额 ÷ 最小红包金额）</div>
            </div>
            <div className="form-group w300">
              <FormItem type="select" className="form-control" title="关联红包池" options={selectData}/>
            </div>
          </div>
          <div className="basicInfo-bottom-main">
            <div className="form-group w300">
              <FormItem type="text" className="form-control w100" title="每人限领个数（1-10）" name="limitNum"
                        defaultValue={data.limitNum}/><span className="unit">个</span>
            </div>
            <div className="form-group w300">
              <FormItem type="text" className="form-control w100" title="最大红包金额（100-20000分）" name="maximumMoney"
                        defaultValue={data.maximumMoney}/><span className="unit">分</span>
            </div>
            <div className="form-group w300">
              <FormItem type="text" className="form-control w100" title="最小红包金额（100-20000分）" name="maximumMoney"
                        defaultValue={data.maximumMoney}/><span className="unit">分</span>
            </div>
          </div>
          <div className="basicInfo-bottom-main3">
            <div className="form-group w300">
              <FormItem className="form-control w250" type="datePicker" data={datePickerStartData} title="开始时间"
                        getPickDate={::this.getPickDate}/>
            </div>
            <div className="form-group w300">
              <FormItem className="form-control w250" type="datePicker" data={datePickerEndData} title="结束时间"
                        getPickDate={::this.getPickDateEnd}/>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

BasicInfo.propsType = {
  data: PropTypes.object
};

export default BasicInfo;