"use strict";
import React, {PropTypes} from 'react';
import Tree from 'UIComponentFolder/Tree/Tree';
import Upload from 'UIComponentFolder/Upload/Upload';

const menuData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json").tagTreeData;

class EresourceFile extends React.Component {
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
      showDeleteArea: true,
      submitValue: '确定修改'
    };
    this.setState({
      showFormArea: true
    });
  }

  render() {
    const {showFormArea} = this.state,
      {showTagData} = this;

    return (
      <div className="EresourceFile clearfix">
        <header className="uploader-wrap">
          <Upload/>
        </header>
        <aside className="aside-left left">
          <Tree data={menuData}  clickItem={::this.clickItem} />
        </aside>
        <section className="main-content">

        </section>
      </div>
    )
  }
}

export default EresourceFile;
