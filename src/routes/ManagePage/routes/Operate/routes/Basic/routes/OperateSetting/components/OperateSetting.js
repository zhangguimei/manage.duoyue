/*
 *  Project : Basic
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : OperateSetting
 */

'use strict';
import React from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import Radio from 'UIComponentFolder/Radio/Radio';
import FixBottom from 'UIComponentFolder/FixBottom/FixBottom';
import styles from './OperateSetting.scss';

const operateData = require("AssetsFolder/MockData/operate/basic/operate_data.json");

class OperateSetting extends React.Component {
  render() {
    const {name, pic, releaseDuration, billingCycle, minAmount, tel, address, postage, freePostage, introduce, isVerify, isShowInput, signInfo} = operateData;
    return (
      <div className="OperateSetting">
        <form className="form-default">
          <FormItem title="公众号名称" className="form-control w750" defaultValue={name} rules={{required: true}}
                    requireError/>
          <div className="operate-cont">
            <div className="left left1">
              <div className="form-group">
                <label>公众号签名/二维码/LOGO</label>
                <ImageUpload name="image" defaultSrc={pic}/>
              </div>
              <FormItem title="未支付订单库存释放时长（分钟）" className="form-control w120" defaultValue={releaseDuration}/>
              <FormItem title="分销提结算周期（天）" className="form-control w120" defaultValue={billingCycle}/>
              <FormItem title="分销提成提现最小金额（元）" className="form-control w120" defaultValue={minAmount}/>
              <div className="form-group">
                <label>分销提现是否需要审核</label>
                <div>
                  <Radio title="需要" name="isVerify" defaultChecked={isVerify}/>
                  <Radio title="不需要" name="isVerify" defaultChecked={!isVerify}/>
                </div>
              </div>
              <div className="form-group">
                <label>订单确认展示手机输入框</label>
                <div>
                  <Radio title="需要" name="isShowInput" defaultChecked={isShowInput}/>
                  <Radio title="不需要" name="isShowInput" defaultChecked={!isShowInput}/>
                </div>
              </div>
            </div>
            <div className="left left2">
              <FormItem title="联系电话" className="form-control w300" defaultValue={tel}/>
              <FormItem title="联系地址" className="form-control w100per" defaultValue={address}/>
              <FormItem title="邮费（商城购物时，需要支付的邮费）" className="form-control w100per" defaultValue={postage}/>
              <FormItem title="包邮（商城购物消费超过此金额则免去邮费）" className="form-control w100per" defaultValue={freePostage}/>
              <FormItem title="公众号简介" type="textarea" className="form-control w100per" defaultValue={introduce}/>
            </div>
          </div>
          <div className="form-group">
            <label>签名信息（高级群发时，每篇文章内容底部附加的信息）</label>
            <textarea className="form-control w750" rows="8" defaultValue={signInfo}/>
          </div>
        </form>
        <FixBottom>
          <input type="button" className="btn btn-primary w100" value="确定"/>
        </FixBottom>
      </div>
    );
  }
}

module.exports = OperateSetting;