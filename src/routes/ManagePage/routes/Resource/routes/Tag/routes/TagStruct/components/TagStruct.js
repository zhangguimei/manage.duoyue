"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import styles from './TagStruct.scss';

const tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json").tagTreeData;

class TagStruct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormArea: false
    };
    this.showTagData = {
      name: '',
      parentName: '',
      showDeleteArea: false,
      submitValue: ''
    };
  }


  clickItem(data) {
    const parentData = tagData.filter(v => v.id == data.parentId),
      pName = data.parentId == 0 ? '' : parentData[0].name;
    this.showTagData = {
      name: data.name,
      parentName: pName,
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
          this.showTagData = {
            name: '',
            parentName: '',
            showDeleteArea: false,
            submitValue: '确定新增'
          };
          this.setState({
            showFormArea: true
          });
        },//新增函数在这写
        content: "新增标签"
      };
    const { showTagData } = this;

    return (
      <div className="TagStruct clearfix">
        <div className="select-tag-left left">
          <Tree data={tagData}  clickItem={::this.clickItem} addContent={addContent}/>
        </div>
        {
          showFormArea &&
          <form className="form-inline select-tag-right left">
            <FormItem type="tree" title="父标签" name="parentName"  treeData={tagData} itemClass="ml50" className="form-control w300"
                      rules={{required: false}} defaultValue={showTagData.parentName} value={showTagData.parentName} />
            <FormItem type="text" title="标签名称" name="name" itemClass="ml50 mt20" className="form-control w300 ml40"
                      rules={{required: false}} defaultValue={showTagData.name} value={showTagData.name}/>
            <div className="tag-submit">
              <input type="submit" className="btn btn-primary btn-sm w120" value={showTagData.submitValue}/>
            </div>
          </form>
        }
        {
          showTagData.showDeleteArea &&
            <div className="delete-area" onClick="">删除标签</div>
        }
      </div>
    )
  }
}

module.exports = TagStruct;
