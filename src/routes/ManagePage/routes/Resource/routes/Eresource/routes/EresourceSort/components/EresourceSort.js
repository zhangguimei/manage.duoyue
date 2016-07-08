/*
 *  Date    : 2016.07.08
 *  Author  : CC
 *  Declare : 资源分类
 */
"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import styles from './EresourceSort.scss';

const tagData = require("AssetsFolder/MockData/sourcecenter/product/product_sort_data.json");

class EresourceSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormArea: false
    };
    this.showProductData = {
      name: '',
      parentName: '',
      pageName: '',
      pic: '',
      icon: '',
      sortNum: '',
      desc: '',
      link: '',
      showDeleteArea: false,
      submitValue: ''
    };
  }

  clickItem(data) {
    const parentData = tagData.filter(v => v.id == data.parentId),
      pName = data.parentId == 0 ? '' : parentData[0].name;
    this.showProductData = {
      name: data.name,
      parentName: pName,
      pic: data.pic,
      icon: data.icon,
      sortNum: data.sortNum,
      desc: data.desc,
      link: data.link,
      showDeleteArea: true,
      submitValue: '确定修改'
    };
    this.setState({
      showFormArea: true
    });
  }

  render() {
    const { showFormArea } = this.state,
      addContent = {
        callback: () => {
          this.showProductData = {
            name: '',
            parentName: '',
            pic: '',
            icon: '',
            sortNum: '',
            desc: '',
            link: '',
            showDeleteArea: false,
            submitValue: '确定新增'
          };
          this.setState({
            showFormArea: true
          });
        },//新增函数在这写
        content: "新增标签"
      },
      { showProductData } = this;
    console.log(showProductData);
    return (
      <div className="EresourceSort">
        <div className="select-tag-left left">
          <Tree data={tagData} clickItem={::this.clickItem} addContent={addContent}/>
        </div>
        {
          !showFormArea &&
          <div className="click-info">单击左侧目录节点修改信息。</div>
        }
        {
          showFormArea &&
          <form className="select-tag-right left">
            <FormItem type="tree" title="上级分类" name="parentName" treeData={tagData} itemClass="ml50"
                      className="form-control w300 inline-block" rules={{required: false}}
                      defaultValue={showProductData.parentName} value={showProductData.parentName}/>
            <FormItem type="text" title="分类名称" name="name" itemClass="ml50" className="form-control w300"
                      rules={{required: true}} defaultValue={showProductData.name} value={showProductData.name}/>
            <FormItem type="text" title="排序值" name="sortNum" itemClass="ml50" className="form-control w300"
                      rules={{required: false}}
                      defaultValue={showProductData.sortNum} value={showProductData.sortNum}/>
            <FormItem type="imageUpload" title="封面图" name="pic" itemClass="ml50" rules={{required: true}}
                      defaultValue={showProductData.pic} value={showProductData.pic}/>
            <FormItem type="imageUpload" title="分类图标" name="icon" itemClass="ml50 icon-upload" rules={{required: false}}
                      defaultValue={showProductData.icon} value={showProductData.icon}/>
            <FormItem type="textarea" title="分类简介" name="desc" itemClass="ml50" className="form-control w500"
                      rules={{required: false}}
                      defaultValue={showProductData.desc} value={showProductData.desc}/>
            <FormItem type="text" title="跳转链接" name="link" itemClass="ml50" className="form-control w300"
                      rules={{required: false}} defaultValue={showProductData.link} value={showProductData.link}/>
            <div className="tag-submit">
              <input type="submit" className="btn btn-primary btn-sm w120" value={showProductData.submitValue}/>
              {showProductData.showDeleteArea &&
              <input type="button" className="btn btn-default btn-sm w80 ml20" value="删 除"/>}
            </div>
          </form>
        }
      </div>
    );
  }
}

EresourceSort.propTypes = {
  tagData: PropTypes.array
};

module.exports = EresourceSort;