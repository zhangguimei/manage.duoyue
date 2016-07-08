/*
 *  Date    : 2016.07.07
 *  Author  : CC
 *  Declare : 专题分类
 */
"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

import styles from './TopicSort.scss';
const tagData = require("AssetsFolder/MockData/sourcecenter/topic/topic_sort_data.json");

class TopicSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormArea: false
    };
    this.showTopicData = {
      name: '',
      parentName: '',
      pageName: '',
      pic: '',
      icon: '',
      sortNum: '',
      showDeleteArea: false,
      submitValue: ''
    };
  }

  clickItem(data) {
    const parentData = tagData.filter(v => v.id == data.parentId),
      pName = data.parentId == 0 ? '' : parentData[0].name;
    this.showTopicData = {
      name: data.name,
      parentName: pName,
      pic: data.pic,
      icon: data.icon,
      sortNum: data.sortNum,
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
          this.showTopicData = {
            name: '',
            parentName: '',
            pic: '',
            icon: '',
            sortNum: '',
            showDeleteArea: false,
            submitValue: '确定新增'
          };
          this.setState({
            showFormArea: true
          });
        },//新增函数在这写
        content: "新增标签"
      },
      { showTopicData } = this;
    return (
      <div className="TopicSort">
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
                      defaultValue={showTopicData.parentName} value={showTopicData.parentName}/>
            <FormItem type="text" title="分类名称" name="name" itemClass="ml50" className="form-control w300"
                      rules={{required: true}} defaultValue={showTopicData.name} value={showTopicData.name}/>
            <FormItem type="text" title="排序值" name="sortNum" itemClass="ml50" className="form-control w300"
                      rules={{required: false}}
                      defaultValue={showTopicData.sortNum} value={showTopicData.sortNum}/>
            <FormItem type="imageUpload" title="封面图" name="pic" itemClass="ml50" rules={{required: true}}
                      defaultValue={showTopicData.pic} value={showTopicData.pic}/>
            <FormItem type="imageUpload" title="分类图标" name="icon" itemClass="ml50 icon-upload" rules={{required: false}}
                      defaultValue={showTopicData.icon} value={showTopicData.icon}/>
            <div className="tag-submit">
              <input type="submit" className="btn btn-primary btn-sm w120" value={showTopicData.submitValue}/>
              {showTopicData.showDeleteArea && <input type="button" className="btn btn-default btn-sm w80 ml20" value="删 除"/>}
            </div>
          </form>
        }
      </div>
    );
  }
}

TopicSort.propTypes = {
  tableData: PropTypes.array
};

module.exports = TopicSort;