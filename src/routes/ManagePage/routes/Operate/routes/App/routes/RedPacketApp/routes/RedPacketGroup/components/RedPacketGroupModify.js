/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-红包应用-红包池-点击修改
 */
'use strict';
import React,{PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class RedPacketGroupModify extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <form className="RedPacketGroupModify form-default">
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="红包池名称" name="title"
                    defaultValue={data.title} rules={{required: true}} requireError/>
        </div>
        <div className="form-group">
          <FormItem type="textarea" className="form-control w300" title="红包池描述" name="title"
                    defaultValue={data.greetings}/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w100" title="每人限领个数（1-10）" name="title"
                    defaultValue={data.limitNum}/>
        </div>
      </form>
    )
  }
}

RedPacketGroupModify.propsType = {
  data: PropTypes.object
};

export default RedPacketGroupModify;