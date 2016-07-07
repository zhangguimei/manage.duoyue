/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-关键字应用
 */

'use strict';
import React from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import BasicInfo from './BasicInfo';
import KeywordSetup from './KeywordSetup';
import styles from "./KeywordApp.scss";

const tableHeadData = {
  "id": "ID",
  "keyword": "关键字",
  "validityData": "有效期",
  "contentResponseo": "响应内容",
  "userResponseNum": "响应用户数",
  "numResponse": "响应次数",
  "operation": "操作"
};

class KeywordApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: this.getData(),
      showSetupLayer: false,
      showAddLayer: false,
      item: {}
    };
  }

  getData() {
    return require("AssetsFolder/MockData/operate/app/keywordApp_data.json");
  }

  toggleSetupLayer(item) {
    this.setState({
      showSetupLayer: !this.state.showSetupLayer,
      item: item
    });
  }

  toggleAddLayer() {
    this.setState({
      showAddLayer: !this.state.showAddLayer
    });
  }

  clickDelete(id) {
    if(confirm("您确定要删除？")) {
      this.setState({
        tableContent: this.state.tableContent.filter(v => v.id != id)
      })
    }
    this.forceUpdate();
  }

  render() {
    const {tableContent,showSetupLayer,showAddLayer,item} = this.state;
    let pageSetupData = {
        title: '设置关键字响应消息 ',
        width: '90%',
        height: '90%',
        closeShowPage: ::this.toggleSetupLayer
      },
      pageAddData = {
        title: '新增关键字 ',
        width: '50%',
        height: '40%',
        closeShowPage: ::this.toggleAddLayer
      };
    tableContent.map((item) => {
      item.validityData =
        <div><span>{item.validityStartData}</span><span>&nbsp;至&nbsp;</span><span>{item.validityEndData}</span></div>;
      item.contentResponseo =
        <a href="javascript:;" onClick={() =>this.toggleSetupLayer(item)}>设置&nbsp;({item.contentResponse})</a>;
      item.operation = <a href="javascript:;" onClick={() =>{this.clickDelete(item.id)}}>删除</a>
    });
    return (
      <div className="KeywordApp">
        <div className="search-bar">
          <form className="form-inline left">
            <div className="form-group form-group-sm">
              <label>关键字：</label>
              <input type="text" className="form-control"/>
            </div>
            <input type="button" className="btn btn-primary btn-sm w80" value="搜索"/>
          </form>
          <div className="right">
            <input type="button" className="btn btn-primary btn-sm w120 ml20" onClick={::this.toggleAddLayer}
                   value="新增关键字"/>
          </div>
        </div>
        <div className="KeywordApp-table">
          <Table contentData={tableContent} headData={tableHeadData}/>
        </div>
        {
          showSetupLayer &&
          <Modal>
            <ShowPage {...pageSetupData}>
              <KeywordSetup data={item}/>
            </ShowPage>
          </Modal>
        }
        {
          showAddLayer &&
          <Modal>
            <ShowPage {...pageAddData}>
              <BasicInfo data/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = KeywordApp;