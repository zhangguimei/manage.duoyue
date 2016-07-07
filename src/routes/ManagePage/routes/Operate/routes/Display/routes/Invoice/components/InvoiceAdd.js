/*
 *  Date    : 2016.7.1
 *  Author  : Ao Zhenzhen
 *  Declare : 展示设置-发票选项点击修改和增加
 */
'use strict';
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class InvoiceAdd extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <form className="InvoiceAdd form-default">
        <div className="form-group">
          <FormItem type="text" className="form-control w100per" title="发票选项名称" name="invoiceName"
                    defaultValue={data.invoiceName} rules={{required: true}} requireError/>
        </div>
      </form>
    )
  }
}

InvoiceAdd.propTypes = {
  data: PropTypes.object
};

export default InvoiceAdd;