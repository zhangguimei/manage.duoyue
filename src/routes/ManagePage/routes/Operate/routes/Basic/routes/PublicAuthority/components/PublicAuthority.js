/*
 *  Project : Basic
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : Public Authority
 */

'use strict';
import React from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Radio from 'UIComponentFolder/Radio/Radio';
import FixBottom from 'UIComponentFolder/FixBottom/FixBottom';
import styles from './PublicAuthority.scss';

const authData = require("AssetsFolder/MockData/operate/basic/auth_data.json");

class PublicAuthority extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCrossPay: authData.isCrossPay
    }
  }

  radioOnClick(type) {
    this.setState({
      isCrossPay: type
    });
  }

  render() {
    const {name, originID, appID, appSecret, url, token, mchID, partnerKey, options} = authData,
      {isCrossPay} = this.state;
    return (
      <div className="PublicAuthority">
        <form className="form-default">
          <FormItem title="公众号名称" className="form-control w400" defaultValue={name} rules={{required: true}}
                    requireError/>
          <FormItem title="原始ID" className="form-control w400" defaultValue={originID}/>
          <div className="auth-column">
            <div className="cont">
              <h4>开发者ID</h4>
              <p>请将微信开发者中心开发者ID信息填写到以下的输入框</p>
              <FormItem title="AppId" className="form-control w400" defaultValue={appID} rules={{required: true}}
                        requireError/>
              <FormItem title="AppSecret" className="form-control w400" defaultValue={appSecret}
                        rules={{required: true}} requireError/>
            </div>
            <div className="info">
              <h6>1. 请登录微信公众号管理平台 <a href="http://mp.weixin.qq.com/" target="_blank">http://mp.weixin.qq.com/</a>
                开发者中心，复制信息到左侧的输入框</h6>
              <img src="http://manage.duoyue.me/manage/images/auth01.jpg" width="415" height="110"/>
            </div>
          </div>
          <div className="auth-column">
            <div className="cont">
              <h4>服务器配置</h4>
              <p>请修改微信开发者中心服务器配置，将URL与Token值填写到对应的输入框</p>
              <FormItem title="URL" className="form-control w400" defaultValue={url}/>
              <FormItem title="Token" className="form-control w400" defaultValue={token}/>
            </div>
            <div className="info">
              <h6>2. 请登录微信公众号管理平台 <a href="http://mp.weixin.qq.com/" target="_blank">http://mp.weixin.qq.com/</a>
                开发者中心，将左侧的信息复制到微信服务器配置信息中</h6>
              <img src="http://manage.duoyue.me/manage/images/auth02.jpg" width="415" height="199"/>
            </div>
          </div>
          <div className="auth-column">
            <div className="cont">
              <h4>微信支付配置</h4>
              <p>请修改微信开发者中心服务器配置</p>
              <div className="mb10">跨号支付（是否需要使用别的公号进行支付）</div>
              <div className="radio-box">
                <Radio name="isCrossPay" index="0" title="否" defaultChecked={!isCrossPay}
                       radioOnClick={() => this.radioOnClick(false)}/>
                <Radio name="isCrossPay" index="1" title="是" defaultChecked={isCrossPay}
                       radioOnClick={() => this.radioOnClick(true)}/>
                {
                  isCrossPay && <FormItem type="select" options={options} className="form-control"/>
                }
              </div>
              {
                !isCrossPay &&
                <div>
                  <FormItem title="AppID" className="form-control w400" defaultValue={appID}/>
                  <FormItem title="Secret （与AppSecret相同）" className="form-control w400" defaultValue={appSecret}/>
                  <FormItem title="mchID" className="form-control w400" defaultValue={mchID}/>
                  <FormItem title="PartnerKey" className="form-control w400" defaultValue={partnerKey}/>
                </div>
              }
            </div>
            <div className="info">
              <h6>3. 请登录微信公众号管理平台 <a href="http://mp.weixin.qq.com/" target="_blank">http://mp.weixin.qq.com/</a>
                开发者中心，将左侧的信息复制到微信服务器配置信息中</h6>
            </div>
          </div>
        </form>
        <FixBottom>
          <input type="button" className="btn btn-primary w100" value="确定" onClick={::this.radioOnClick}/>
        </FixBottom>
      </div>
    );
  }
}

module.exports = PublicAuthority;