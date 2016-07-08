/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 扩展属性新增属性与修改
 */
"use strict";
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

const tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json").tagTreeData;

class AttrDetail extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="AttrDetail">
        <form action="" className="form-container form-inline">
          <FormItem type="text" title="扩展属性名称" name="attrName" itemClass="group-container" className="form-control w300"
                      rules={{required: false}} defaultValue={data.attrName}/>
          <FormItem type="tree" title="适用范围" name="limit" treeData={tagData} itemClass="group-container" className="form-control w300"
                    rules={{required: false}} defaultValue={data.limit}/>
          <span className="input-tips">不选择则适用于所有标签</span>
        </form>
      </div>
    );
  }
}

AttrDetail.propTypes = {
  data: PropTypes.object
};

export default AttrDetail;