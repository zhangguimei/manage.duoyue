/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用-红包活动-点击配置-红包领取提示信息
 */

'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class MessagePrompt extends React.Component {
  render() {
    return (
      <form className="MessagePrompt form-inline clearfix">
          <div className="form-group left">
            <h5 className="messagePrompt-title">成功领取红包提示</h5>
            <FormItem type="text" className="form-control w300" title="标题" name="title"
                      defaultValue=""/>
            <FormItem type="textarea" className="form-control w300" title="说明" name="details"
                      defaultValue=""/>
          </div>
          <div className="form-group left">
            <h5 className="messagePrompt-title">未关注提示</h5>
            <FormItem type="text" className="form-control w300" title="标题" name="title"
                      defaultValue=""/>
            <FormItem type="textarea" className="form-control w300" title="说明" name="details"
                      defaultValue=""/>
          </div>
          <div className="form-group left">
            <h5 className="messagePrompt-title">超出红包池个人上限提示</h5>
            <FormItem type="text" className="form-control w300" title="标题" name="title"
                      defaultValue=""/>
            <FormItem type="textarea" className="form-control w300" title="说明" name="details"
                      defaultValue=""/>
          </div>
          <div className="form-group left">
            <h5 className="messagePrompt-title">超出红包个人上限提示</h5>
            <FormItem type="text" className="form-control w300" title="标题" name="title"
                      defaultValue=""/>
            <FormItem type="textarea" className="form-control w300" title="说明" name="details"
                      defaultValue=""/>
          </div>
          <div className="form-group left">
            <h5 className="messagePrompt-title">红包领完提示</h5>
            <FormItem type="text" className="form-control w300" title="标题" name="title"
                      defaultValue=""/>
            <FormItem type="textarea" className="form-control w300" title="说明" name="details"
                      defaultValue=""/>
          </div>
          <div className="form-group left">
            <h5 className="messagePrompt-title">未抽中红包提示</h5>
            <FormItem type="text" className="form-control w300" title="标题" name="title"
                      defaultValue=""/>
            <FormItem type="textarea" className="form-control w300" title="说明" name="details"
                      defaultValue=""/>
          </div>
      </form>
    )
  }
}

export default MessagePrompt ;