/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用-红包活动-点击新增红包红点
 */

'use strict';
import React from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class RedPacketAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
    };
  }

  checkDate(start, end) {
    if(!start || !end) {
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
    const datePickerStartData = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: "",
        placeHolder: '请选择日期 ',
        showTimePanel: true
      },
      datePickerEndData = {
        format: 'yyyy-mm-dd hh:ii:ss ',
        dateValue: "",
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
      <form className="form-default RedPacketAdd">
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="活动名称(如：猜灯谜抢红包活动)" name="title"
                    defaultValue="" rules={{required: true}} requireError/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="红包祝福语（如：感谢您参加猜灯谜活动，祝您元宵节快乐！）"
                    name="greetings"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="提供方名称 (如：天虹百货)" name="providerName"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="红包发送者名称(如：天虹百货小王)" name="senderName"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="备注信息(如：猜越多得越多，快来抢！)" name="remarks"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="红包发放总金额（单位元）" name="totalAmount"
                    defaultValue=""/>

        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="红包发放总个数" name="totalNum"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="最大红包金额（至少100分）" name="maximumMoney"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="最小红包金额（至少100分）" name="maximumMoney"
                    defaultValue=""/>
        </div>
        <div className="form-group">
          <FormItem type="select" className="form-control" title="关联红包池" options={selectData}/>
        </div>
        <div className="basicInfo-bottom-main3">
          <div className="form-group">
            <FormItem className="form-control w250" type="datePicker" data={datePickerStartData} title="开始时间"
                      getPickDate={::this.getPickDate}/>
          </div>
          <div className="form-group">
            <FormItem className="form-control w250" type="datePicker" data={datePickerEndData} title="结束时间"
                      getPickDate={::this.getPickDateEnd}/>
          </div>
        </div>
      </form>
    )
  }
}

export default RedPacketAdd;