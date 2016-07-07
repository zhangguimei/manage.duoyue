/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码点击修改
 */

'use strict';
import React,{PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class WeiXinQRcodeModify extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <form className="WeiXinQRcodeModify form-default">
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="场景名称" name="QRcodeTitle"
                    defaultValue={data.QRcodeTitle} rules={{required: true}} requireError/>
        </div>
        <div className="form-group">
          <FormItem type="textarea" className="form-control w300" title="场景说明" name="QRcodeExplain"
                    defaultValue={data.QRcodeExplain} rules={{required: true}} requireError/>
        </div>
      </form>
    )
  }
}

WeiXinQRcodeModify.propsType = {
  data: PropTypes.object
};

export default WeiXinQRcodeModify;