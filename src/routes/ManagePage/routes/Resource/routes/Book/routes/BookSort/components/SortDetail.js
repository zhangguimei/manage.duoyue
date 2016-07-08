/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 书籍分类新增与修改
 */
"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

import styles from './BookSort.scss';

class SortDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { treeData, data } = this.props;

    return (
      <div className="SortDetail">
        <form name="sortDetail" method="get" action="">
          <FormItem type="tree" title="上级分类" name="parentName" treeData={treeData} itemClass="ml50"
                    className="form-control w300 inline-block" rules={{required: false}}
                    defaultValue={data.parentName} value={data.parentName}/>
          <FormItem type="text" title="分类名称" name="name" itemClass="ml50" className="form-control w300"
                    rules={{required: true}} defaultValue={data.clsName} value={data.clsName}/>
          <FormItem type="text" title="自定义编码" name="sortNum" itemClass="ml50" className="form-control w300"
                    rules={{required: false}}
                    defaultValue={data.definedNum} value={data.definedNum}/>
          <FormItem type="imageUpload" title="分类图标1( icon )" name="icon1" itemClass="ml50 icon-upload" rules={{required: false}}
                    defaultValue={data.icon1}/>
          <FormItem type="imageUpload" title="分类图标2( icon )" name="icon2" itemClass="ml50 icon-upload" rules={{required: false}}
                    defaultValue={data.icon2}/>
          <FormItem type="imageUpload" title="索引图" name="pic" itemClass="ml50" rules={{required: true}}
                    defaultValue={data.pic}/>
          <FormItem type="text" title="跳转链接" name="link" itemClass="ml50" className="form-control w300"
                    rules={{required: false}} defaultValue={data.link} value={data.link}/>
          <FormItem type="textarea" title="分类简介" name="desc" itemClass="ml50" className="form-control w700"
                    rules={{required: false}}
                    defaultValue={data.desc} value={data.desc}/>
          <FormItem type="textarea" title="分类描述" name="info" itemClass="ml50" className="form-control w700 text-info"
                    rules={{required: false}}
                    defaultValue={data.info} value={data.info}/>
        </form>
      </div>
    );
  }
}

SortDetail.propTypes = {
  data: PropTypes.object,
  treeData: PropTypes.array
};

module.exports = SortDetail;