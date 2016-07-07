/*
 *  Date    : 2016.07.05
 *  Author  : Jin-Guolong
 *  Declare : 网站管理-模板管理
 */
'use strict';
import React, {PropTypes} from 'react'
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TablePage from 'PageComponentFolder/TablePage/TablePage';

import styles from './ModelManage.scss'

const modelManageData = require('AssetsFolder/MockData/website/model_manage_table_data.json');

class ModelManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      tableContent: []
    };
		this.title = "新增";
    this.modifyData = {};
  }

  modifyContent(id, i) {
    const {tableContent} = this.state;
    if (i == true)
      this.title = "修改";
    else
      this.title = "新增";
    this.setState({
      showLayer: !this.state.showLayer
    });
    this.modifyData = tableContent.filter(v => v.id == id)
  }

  deleteOperation(id) {
    const {tableContent} = this.state;
    this.setState({
      tableContent: tableContent.filter(v => v.id != id)
    });
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showLayer: false
    })
  }

  componentWillMount() {
    this.setState({
      tableContent: modelManageData.tableContentData
    });
  }

  render() {
    const {showLayer} = this.state,
      {tableContent} = this.state;
    let pagedata = {
      width: "50%",
      height: "90%",
      closeShowPage: ::this.modifyContent
    };
    let title = this.title + "网站模板";
    modelManageData.tableContentData.forEach((item, i)=> {
      item.operation = <div className="modelOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item.id,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>;
    });
    return (
      <div className="ModelManage">
        <header className="search-area">
          <div className="form-inline">
            <div className="form-group form-group-sm ml10">
              <label>模板名称</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10">查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增网站模板</button>
          </div>
        </header>
        <div className="TablePage">
          <TablePage data={modelManageData} contentData={tableContent}/>
        </div>
        {
          showLayer &&
          <Modal>
            <ShowPage  {...pagedata} submitForm={::this.submitChange} title={title}>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = ModelManage;