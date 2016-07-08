"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

const menuData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json").tagTreeData;

class EresoureMenu extends React.Component {
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
    const parentData = menuData.filter(v => v.id == data.parentId),
      pName = data.parentId == 0 ? '' : parentData[0].name;
    this.showTagData = {
      name: data.name,
      parentName: pName,
      showDeleteArea: true
    };
    this.setState({
      showFormArea: true
    });
  }

  render() {
    const {showFormArea} = this.state,
      {showTagData} = this,
      addContent = {
        callback: () => {
          this.showTagData = {
            name: '',
            parentName: '',
            showDeleteArea: false
          };
          this.setState({
            showFormArea: true
          });
        },//新增函数在这写
        content: "新增"
      };

    return (
      <div className="EresoureMenu clearfix">
        <aside className="aside-left left">
          <Tree data={menuData}  clickItem={::this.clickItem} addContent={addContent}/>
        </aside>
        {
          showFormArea &&
          <form className="form-inline select-tag-right main-content left">
            <FormItem type="tree" title="上级目录" name="parentName"  treeData={menuData} itemClass="ml50" className="form-control w300"
                      defaultValue={showTagData.parentName} value={showTagData.parentName} />
            <FormItem type="text" title="目录名称" name="name" itemClass="ml50 mt20" className="form-control w300 ml40"
                      rules={{required: true}} defaultValue={showTagData.name} value={showTagData.name}/>
            <button type="submit" className="btn btn-primary btn-sm w120 add-btn">确定新增</button>
          </form>
        }
      </div>
    )
  }
}

module.exports = EresoureMenu;
