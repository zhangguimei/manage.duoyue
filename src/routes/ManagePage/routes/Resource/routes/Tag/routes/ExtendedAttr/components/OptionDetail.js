/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 扩展属性维护可选值新增与修改
 */
"use strict";
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class OptionDetail extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="OptionDetail">
        <form action="" className="form-inline form-container">
          <FormItem type="text" title="扩展属性名称" name="attrName" itemClass="form-group" className="form-control w300"
                      rules={{required: false}} defaultValue={data.attrName}/>
        </form>
      </div>
    );
  }
}

OptionDetail.propTypes = {
  data: PropTypes.object
};

export default OptionDetail;