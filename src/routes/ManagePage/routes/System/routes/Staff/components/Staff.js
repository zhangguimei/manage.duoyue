'use strict'
/*
 *  Project : system Area
 *  Date    : 2016.06.29
 *  Author  : jinguolong
 *  Declare : Staff page
 */

import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import StaffEditor from './StaffEditor';

import styles from './Staff.scss';

const staffData = require('AssetsFolder/MockData/system/staff_table_data.json');

class Staff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      contentData: []
    }
    this.title = "新增";
    this.modifyData = {};
  }

  modifyContent(item, i) {
    if (i == true)
      this.title = "修改";
    else
      this.title = "新增";
    this.setState({
      showLayer: !this.state.showLayer
    })
    this.modifyData = item;
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showLayer: false
    })
  }

  deleteOperation(id) {
    const {contentData} = this.state;
    this.setState({
      contentData: contentData.filter(v => v.id != id)
    });
  }

  pluginData() {
    staffData.contentData.forEach((item)=> {
      item.operation = <div className="StaffOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item,true)}>登录</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>;
    });
  }

  componentWillMount() {
    this.setState({
      contentData: staffData.contentData
    });
    this.pluginData();
  }

  render() {
    const {wechatOption} = staffData,
      {modifyData} = this,
      {showLayer, contentData} = this.state;
    let pagedata = {
      width: "50%",
      height: "90%",
      closeShowPage: ::this.modifyContent
    };
    let title = this.title + "用户",
      pageChange = this.title == "新增" ? false : true;
    return (
      <div className="Staff">
        <header className="search-bar">
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10">查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增用户</button>
          </div>
        </header>
        <TablePage headData={staffData.headData} contentData={contentData}/>
        {
          showLayer &&
          <Modal>
            <ShowPage  {...pagedata} submitForm={::this.submitChange} title={title}>
              <StaffEditor wechatOption={wechatOption} modifyData={modifyData} page={pageChange}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = Staff;