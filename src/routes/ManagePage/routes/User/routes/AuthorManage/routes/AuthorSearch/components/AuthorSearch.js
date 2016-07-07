/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 作者管理-作者查询
 */
'use strict';
import React from 'react';
import {fromJS} from 'immutable';

import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import Table from 'UIComponentFolder/Table/Table';
import RightAsideDetail from 'PageComponentFolder/RightAsideDetail/RightAsideDetail';

import styles from "./AuthorSearch.scss";

let data = require("AssetsFolder/MockData/user/authormanage/author_search_table.json"),
  authorClassifyData = require("AssetsFolder/MockData/user/authormanage/author_classify_table.json").contentData;
authorClassifyData.forEach((item)=> {
  item.value = item.name;
});

class AuthorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetailArea: false,
      showRelatedWechatLayer: false,
      showCreateLayer: false,
      showConfirmLayer: false
    };
    this.authorInfo = {};
    this.deleteId = -1;

  }

  toggleUserDetail(type = '', content) {
    if (content) {
      this.authorInfo = content
    }
    this.setState({
      showUserDetailArea: type + '' ? type : !this.state.showUserDetailArea
    });

  }

  toggleRelatedWetchatLayer() {
    this.setState({
      showRelatedWechatLayer: !this.state.showRelatedWechatLayer
    });
  }

  toggleCreateLayer(content) {
    this.authorInfo = {
      pageTitle: "新增作者"
    };
    if (content) {
      this.authorInfo = content;
      this.authorInfo.pageTitle = "修改作者信息";
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

  submitAddOrEdit() {
    //提交新增和修改接口
  }

  pluginData(data) {
    data.forEach((item)=> {
      let userName = item.userName;
      if (userName) {
        item.plugInUserName = <span className="user-name" onClick={()=>this.toggleUserDetail("", item)}>{userName}</span>;
      }
      item.operation = <div className="operation-btn-wrap">
        <button className="btn btn-operate" onClick={()=>this.toggleRelatedWetchatLayer(item.id)}>关联微信</button>
        <button className="btn btn-operate" onClick={()=>this.toggleCreateLayer(item)}>修改</button>
        <button className="btn btn-operate" onClick={()=>this.toggleConfirmLayer(item.id)}>删除</button>
      </div>
    });
  }

  componentWillMount() {
    this.pluginData(data.contentData);
  }

  render() {
    const {headData, contentData} = data,
      {showUserDetailArea, showRelatedWechatLayer, showCreateLayer, showConfirmLayer} = this.state,
      {authorInfo} = this;
    const details = {
        pic: authorInfo.pic,
        name: authorInfo.userName,
        desc: authorInfo.desc,
        hideFunc: ::this.toggleUserDetail
      },
      locationData = {
        showGenre: ['省/市', '市/县', ''],
        defaultItemVaule: '---------无--------',
        addressValue: ['湖北', '武汉', '新洲', 2003]
      };
    return (
      <div className="AuthorSearch">
        <header className="header clearfix">
          <input type="text" name="keyword" className="form-control w100 left"/>
          <button className="search-btn btn btn-primary input-sm ml20 left">查询</button>
          <button className="create-btn btn btn-primary input-sm right" onClick={()=>::this.toggleCreateLayer(false)}>
            新增作者
          </button>
        </header>
        <section className="content-wrap">
          <Table headData={headData} contentData={contentData}/>
        </section>
        {
          showUserDetailArea &&
          <RightAsideDetail {...details} className="animated bounceInRight"/>
        }
        {
          showRelatedWechatLayer &&
          <Modal onModalClick={::this.toggleRelatedWetchatLayer}>
            <ShowPage width="50%" title="关联微信" closeShowPage={::this.toggleRelatedWetchatLayer}>
              <div className="related-wechat-wrap">
                <header className="header clearfix">
                  <input type="text" name="keyword" className="form-control w100 left"/>
                  <button className="search-btn btn btn-primary input-sm ml10 left">查询</button>
                </header>
                <div className="content">
                  没有相关信息!
                </div>
              </div>
            </ShowPage>
          </Modal>
        }
        {
          showCreateLayer &&
          <Modal onModalClick={::this.toggleCreateLayer}>
            <ShowPage width="50%" title={authorInfo.pageTitle} closeShowPage={::this.toggleCreateLayer}
                      submitForm={::this.submitAddOrEdit}>
              <form className="create-author-wrap">
                <FormItem name="userName" type="text" defaultValue={authorInfo.userName} title="登陆名"
                          rules={{required: true}} className="form-control"/>
                <label htmlFor="password" className="subtitle">密码<span className="required red">不填写则不修改</span></label>
                <input type="password" id="password" className="form-control"/>
                <label htmlFor="password-repeat" className="subtitle">确认密码</label>
                <input type="password" id="password-repeat" className="form-control"/>
                <FormItem name="nickName" type="text" defaultValue={authorInfo.nickName} title="昵称"
                          rules={{required: true}} className="form-control"/>
                <FormItem name="topSize" type="text" defaultValue={authorInfo.topSize||0} title="排序值"
                          className="form-control"
                          className="form-control"/>
                <FormItem name="classify" type="select" title="分类" defaultValue={authorInfo.classify}
                          options={authorClassifyData}
                          className="form-control"/>
                <label className="subtitle">图像</label>
                <ImageUpload defaultSrc={authorInfo.pic}/>
                <label className="subtitle">照片墙</label>
                <ImageUpload defaultSrc={authorInfo.wallPic}/>
                <FormItem type="cascadeSelect" data={locationData} title="所属地区" rules={{required: true}}/>
                <FormItem name="desc" type="textarea" defaultValue={authorInfo.desc} title="作者描述"
                          rules={{required: true}} className="form-control"/>
              </form>
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

module.exports = AuthorSearch;