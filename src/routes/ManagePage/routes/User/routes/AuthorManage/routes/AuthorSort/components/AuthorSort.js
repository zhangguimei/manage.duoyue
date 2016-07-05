/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 作者管理-作者分类
 */
'use strict';
import React from 'react';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Modal from 'UIComponentFolder/Modals/Modal';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import Table from 'UIComponentFolder/Table/Table';
import styles from "./AuthorSort.scss";

let data = require("AssetsFolder/MockData/user/authormanage/author_classify_table.json");

class AuthorSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateLayer: false,
      showConfirmLayer: false
    };
    this.classifyInfo = {};
    this.deleteId = -1;
  }

  toggleCreateLayer(contnet) {
    this.classifyInfo = {
      pageTitle: "新增分类"
    };
    if (contnet) {
      this.classifyInfo = contnet;
      this.classifyInfo.pageTitle = "修改分类"
    }
    this.setState({
      showCreateLayer: !this.state.showCreateLayer
    });
  }

  toggleConfirmLayer(id) {
    this.setState({
      showConfirmLayer: !this.state.showConfirmLayer
    });
    this.deleteId = id;
  }

  confirmResult(result) {
    const {deleteId} = this;
    if (result) {
      console.log('删除', deleteId, '成功！');
    }
    this.toggleConfirmLayer();
  }

  submitAddOrModify() {
    //新增修改接口
  }

  pluginData(data) {
    data.forEach((item)=> {
      item.operation = <div className="operation-btn-wrap">
        <button className="btn btn-operate" onClick={()=>this.toggleCreateLayer(item)}>修改</button>
        <button className="btn btn-operate" onClick={()=>this.toggleConfirmLayer(item.id)}>删除</button>
      </div>
    });
  }

  componentWillMount() {
    this.pluginData(data.contentData)
  }

  render() {
    const {headData, contentData} = data,
      {classifyInfo} = this,
      {showConfirmLayer, showCreateLayer} = this.state;
    return (
      <div className="AuthorSort">
        <header className="header clearfix">
          <input type="text" name="keyword" className="form-control w100 left"/>
          <button className="search-btn btn btn-primary input-sm ml20 left">查询</button>
          <button className="create-btn btn btn-primary input-sm right" onClick={()=>::this.toggleCreateLayer(false)}>
            新增分类
          </button>
        </header>
        <section className="content-wrap">
          <Table headData={headData} contentData={contentData}/>
        </section>
        {
          showCreateLayer &&
          <Modal onModalClick={::this.toggleCreateLayer}>
            <ShowPage width="50%" title={classifyInfo.pageTitle} closeShowPage={::this.toggleCreateLayer} submitForm={::this.submitAddOrModify}>
              <div className="create-classify-wrap">
                <FormItem type="text" name="name" defaultValue={classifyInfo.name} title="分类名称" rules={{required: true}} className="form-control"/>
                <FormItem type="textarea" name="desc" defaultValue={classifyInfo.desc} title="分类说明" className="form-control desc"/>
              </div>
            </ShowPage>
          </Modal>
        }
        {
          showConfirmLayer &&
          <Modal onModalClick={::this.toggleConfirmLayer}>
            <Confirm confirmResult={::this.confirmResult} content="确定删除么？"/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = AuthorSort;