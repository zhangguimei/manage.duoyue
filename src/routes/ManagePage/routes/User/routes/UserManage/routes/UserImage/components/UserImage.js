/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 用户管理-用户图片
 */
'use strict';
import React from 'react';
import DatePicker from 'UIComponentFolder/DatePicker/DatePicker';
import Modal from 'UIComponentFolder/Modals/Modal';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import styles from "./UserImage.scss";

let data = require("AssetsFolder/MockData/user/usermanage/user_image.json");

class UserImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false
    };
    this.deleteId = -1;
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

  searchUserImage() {
    //搜索函数接口
  }

  render() {
    const {showConfirm} = this.state;
    return (
      <div className="UserImage">
        <header className="search-bar header">
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
                      <img className="img" src={item.pic} alt="图片"/>
                    </div>
                    <div className="info-wrap clearfix">
                      <img className="head-pic left" src={item.headPic} alt="用户头像"/>
                      <div className="info left">
                        <h5 className="user-name">{item.nickName}</h5>
                        <time className="time">{item.dateTime}</time>
                      </div>
                    </div>
                    <button className="delete-btn" onClick={()=>::this.toggleConfirm(item.id)}>删除</button>
                  </div>
                </div>
              );
            })
          }
        </section>
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

module.exports = UserImage;