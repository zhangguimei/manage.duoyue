/*
 *  Date    : 2016.6.30
 *  Author  : Zhang-Guimei
 *  Declare : 书籍修改目录Tab
 */
'use strict';
import React, {PropTypes} from 'react';

import Tree from 'UIComponentFolder/Tree/Tree';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage'
import FormItem from 'UIComponentFolder/FormComponent/FormItem'

class BookMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploadMenuLayer: false,
      showModifyLayer: false
    };
  }

  showUploadMenu() {
    this.setState({
      showUploadMenuLayer: !this.state.showUploadMenuLayer
    });
  }

  clickItem() {
    this.setState({
      showModifyLayer: true
    });
  }
  
  render() {
    const {menuTreeData} = this.props,
      {showUploadMenuLayer, showModifyLayer} = this.state;
    let pagedata = {
      width: "50%",
      height: "50%",
      title: "批量上传目录 ",
      closeShowPage: ::this.showUploadMenu
    };
    return (
      <div className="BookMenu">
        <div className="add-book-data">
          <span className="upload-menu" onClick={::this.showUploadMenu}>批量上传目录</span>
          <span className="add-menu" onClick={::this.clickItem}>新增目录 </span>
        </div>
        {
          showUploadMenuLayer &&
          <Modal>
            <ShowPage {...pagedata}>
              <form className="upload-menu-content">
                <div className="upload-menu-info clearfix">
                  <FormItem type="text" className="form-control input-sm w100 inline" title="分界字符:"/>
                </div>
                <div className="upload-menu-info clearfix">
                  <span className="item-font left w100">文档上传：</span>
                  <input type="file"/>
                </div>
                <div className="preview-document-content-title">文档内容预览</div>
                <div className="preview-document-content"></div>
              </form>
            </ShowPage>
          </Modal>
        }
        <div className="menu-content clearfix">
          <div className="tree-left left">
            <Tree data={menuTreeData} clickItem={::this.clickItem}/>
          </div>
          {
            showModifyLayer ?
              <form className="add-menu-box left" onSubmit={this.handleSubmit}>
                <FormItem type="tree" className="form-control tree-input input-sm w300" treeData={menuTreeData} title="父级目录"
                          required={true}/>
                <FormItem type="text" className="form-control input-sm w300" title="目录名称" rules={{required: true}}/>
                <div className="radio-area clearfix">
                  <FormItem type="radio" name="isProbation" options={[{value:'否'},{value:'是'}]} title="允许试读"/>
                  <FormItem type="radio" name="isRecommendMenu" options={[{value:'否'},{value:'是'}]} title="推荐阅读目录"/>
                </div>
                  <FormItem name="introduction" title="简介" type="textarea" className="form-control w400 mb10"/>
                <button type="submit" className="btn btn-primary btn-sm w80">确定</button>
              </form>
              :
              <div className="maintain-catalog-text left">请点击左侧目录节点进行维护！</div>
          }
        </div>
      </div>
    )
  }
}

BookMenu.propTypes = {
  menuTreeData: PropTypes.array
};

export default BookMenu;

