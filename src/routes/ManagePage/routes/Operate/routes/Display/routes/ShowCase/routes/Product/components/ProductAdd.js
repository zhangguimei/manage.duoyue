/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-橱窗管理-商品橱窗-新增橱窗
 */
'use strict';
import React, {PropTypes}  from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class ProductAdd extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <form className="ProductAdd form-default">
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="橱窗名称" name="displayName"
                    defaultValue={data.displayName} rules={{required: true}} requireError/>
        </div>
        <div className="form-group">
          <FormItem type="text" className="form-control w300" title="橱窗编码 ( A-Z,a-z)" name="displayCode"
                    defaultValue={data.displayCode} rules={{required: true}} requireError/>
        </div>
        <div className="form-group">
          <FormItem type="textarea" className="form-control w300 describe" title="橱窗描述" name="describe"/>
        </div>
      </form>
    )
  }
}

ProductAdd.propsType = {
  data: PropTypes.object
};

export default ProductAdd;