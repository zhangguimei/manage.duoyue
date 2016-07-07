/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 圈子管理-圈子查询
 */
'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import styles from "./GroupSearch.scss";

let data = require("AssetsFolder/MockData/user/groupmanage/group_search.json");

class GroupSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showDetailLayer: false,
      showCreateLayer: false,
      showConfirm: false
    };
    this.detailData = {};
    this.deleteId = -1;
  }

  toggleDetailLayer(content={}) {
    this.setState({
      showDetailLayer: !this.state.showDetailLayer
    });
    this.detailData = content;
  }

  toggleCreateLayer(content) {
    this.detailData = {};
    this.detailData.title = "创建圈子";
    if (content) {
      this.detailData = content;
      this.detailData.title = "编辑圈子";
    }
    this.setState({
      showCreateLayer: !this.state.showCreateLayer
    });
  }

  toggleConfirm(id) {
    this.setState({
      showConfirm: !this.state.showConfirm
    });
    this.deleteId = id;
  }

  confirmResult(result) {
    const {deleteId} = this;
    if (result) {
      console.log('删除', deleteId, '成功！');
    }
    this.toggleConfirm();
  }

  submitAddOrEditContent() {
    //提交接口
  }

  render() {
    const {showDetailLayer, showCreateLayer, showConfirm} = this.state,
      {detailData} = this;
    return (
      <div className="GroupSearch">
        <header className="header clearfix">
          <input type="text" className="form-control w120 left input-sm"/>
          <button className="btn btn-primary input-sm w60 ml10 left search-btn">查询</button>
          <button className="btn btn-primary input-sm right add-btn" onClick={::this.toggleCreateLayer}>创建圈子</button>
        </header>
        <section className="content-wrap clearfix">
          {
            data.map((item, i)=> {
              return (
                <div className="item left" key={i}>
                  <div className="item-content">
                    <h3 className="title" onClick={()=>::this.toggleDetailLayer(item)}>{item.name}</h3>
                    <a className="img-wrap" href={item.pic} target="_black">
                      <img className="group-img" src={item.pic} alt="圈子封面" width="100%"/>
                    </a>
                    <p className="desc">{item.desc}</p>
                    <div className="btn-wrap">
                      <button className="edit-btn" onClick={()=>::this.toggleCreateLayer(item)}>编辑</button>
                      <button className="delete-btn" onClick={()=>::this.toggleConfirm(item.id)}>删除</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
        {
          showDetailLayer &&
            <Modal onModalClick={::this.toggleDetailLayer}>
              <ShowPage width="40%" closeShowPage={::this.toggleDetailLayer} title={detailData.name} showFooter={false}>
                <div className="detail-wrap clearfix">
                  <div className="left-content left">
                    <span className="title">{detailData.name}</span>
                    <img className="img" src={detailData.pic} alt="圈子详情图"/>
                    <p className="desc">{detailData.desc}</p>
                  </div>
                  <aside className="right-content right">
                    <h3 className="title"><span className="font600">名称：</span>{detailData.name}</h3>
                    <p className="desc"><span className="font600">简介：</span>{detailData.desc}</p>
                  </aside>
                </div>
              </ShowPage>
            </Modal>
        }
        {
          showCreateLayer &&
          <Modal onModalClick={::this.toggleCreateLayer}>
            <ShowPage width="40%" closeShowPage={::this.toggleCreateLayer} title={detailData.title} submitForm={::this.submitAddOrEditContent}>
              <div className="create-wrap">
                <span className="required subtitle">圈子图片</span>
                <ImageUpload defaultSrc={detailData.pic}/>
                <FormItem name="name" type="text" defaultValue={detailData.name} className="form-control" title="名称" rules={{required: true}}/>
                <FormItem name="topSize" defaultValue={detailData.topSize} type="text" className="form-control" title="排序值（值越小越靠前" rules={{required: true}}/>
                <FormItem name="desc" defaultValue={detailData.desc} type="textarea" className="form-control desc-input" title="简介" rules={{required: true}}/>
              </div>
            </ShowPage>
          </Modal>
        }
        {
          showConfirm &&
          <Modal onModalClick={::this.toggleConfirm}>
            <Confirm confirmResult={::this.confirmResult} content="确定删除么？"/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = GroupSearch;