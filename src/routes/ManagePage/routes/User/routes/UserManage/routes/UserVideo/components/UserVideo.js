/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 用户管理-用户视频
 */
'use strict';
import React from 'react';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import styles from "./UserVideo.scss";

let data = require("AssetsFolder/MockData/user/usermanage/user_video.json");

class UserVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerIndex: -1
    };
    this.showData = {};
    this.deleteId = -1;
  }

  toggleLayer(index) {
    const {layerIndex} = this.state;
    this.setState({
      layerIndex: index == layerIndex ? -1 : index
    });
  }

  deleteItemFunc(id) {
    this.toggleLayer(2);
    this.deleteId = id;
  }

  saveToMaterialFunc(content) {
    if (content) {
      this.showData = content;
    }
    this.toggleLayer(1);
  }

  confirmResult(result) {
    const {deleteId} = this;
    if (result) {
      console.log('删除', deleteId, '成功！');
    }
    this.toggleLayer(2);
  }

  searchUserImage() {
    //搜索函数接口
  }

  submitModifyVideoForm() {
    //修改视频素材接口
  }

  render() {
    const {layerIndex} = this.state,
      {showData} = this;
    return (
      <div className="UserVideo">
        <header className="header search-bar">
          <label htmlFor="keyword">图片作者</label>
          <input name="keyword" id="keyword" type="text" className="form-control inline-block input-sm w80 ml10"/>
          <label className="ml20">开始时间</label>
          <DatePicker className="startTime"/>
          <label className="ml20">结束时间</label>
          <DatePicker className="endTime"/>
          <button className="btn btn-primary w80 ml10 btn-sm search-btn" onClick={::this.searchUserImage}>搜索</button>
        </header>
        <section className="content-wrap clearfix">
          {
            data.map((item, i)=> {
              return (
                <div className="item left" key={i}>
                  <div className="item-content">
                    <div className="img-wrap">
                      <img className="poster" src={item.pic} alt="视频封面图" width="100%"/>
                    </div>
                    <div className="info-wrap clearfix">
                      <div className="head-pic-wrap left">
                        <img className="head-pic" src={item.headPic} alt="用户头像"/>
                      </div>
                      <div className="info-box left">
                        <h4 className="nick-name">{item.nickName}</h4>
                        <time className="time">{item.dateTime}</time>
                      </div>
                    </div>
                    <footer className="btn-wrap">
                      <button className="save-btn" onClick={()=>this.saveToMaterialFunc(item)}>存为素材</button>
                      <button className="delete-btn" onClick={()=>this.deleteItemFunc(item.id)}>删除</button>
                    </footer>
                  </div>
                </div>
              )
            })
          }
        </section>
        {
          layerIndex == 1 &&
          <Modal onModalClick={()=>::this.toggleLayer(1)}>
            <ShowPage width="40%" title="存为素材" closeShowPage={()=>::this.toggleLayer(1)} submitForm={::this.submitModifyVideoForm}>
              <div className="video-layer-wrap">
                <video className="video" controls poster={showData.pic}>
                  <source src={showData.fileUrl}/>
                </video>
                <form className="video-form">
                  <FormItem name="videoName" type="text" className="form-control w400" title="标题"/>
                  <FormItem name="videoDesc" type="textarea" className="form-control w400" title="描述"/>
                </form>
              </div>
            </ShowPage>
          </Modal>
        }
        {
          layerIndex == 2 &&
          <Modal onModalClick={()=>::this.toggleLayer(2)}>
            <Confirm confirmResult={::this.confirmResult} content="确定删除么？"/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = UserVideo;