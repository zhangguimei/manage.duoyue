'use strict'
/*
 *  Project : website manage
 *  Date    : 2016.06.29
 *  Author  : jinguolong
 *  Declare : advertisingManage page
 */

import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import AdvertiseEditor from './AdvertiseEditor';

import styles from './AdvertisingManage.scss';

const advertisingManageData = require('AssetsFolder/MockData/website/advertise_manage_table_data.json');

class AdvertisingManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
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
      showModel: !this.state.showModel
    });
    this.modifyData = tableContent.filter(v => v.id == id)
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showModel: false
    })
  }

  deleteOperation(id) {
    const {tableContent} = this.state;
    this.setState({
      tableContent: tableContent.filter(v => v.id != id)
    });
  }

  componentWillMount() {
    this.setState({
      tableContent: advertisingManageData.tableContentData
    });
  }

  render() {
    const {areaOption} = advertisingManageData,
      {modifyData} = this,
      {showModel} = this.state,
      {tableContent} = this.state;
    advertisingManageData.tableContentData.forEach((item, i)=> {
      item.operation = <div className="AdvertiseOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item.id,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>
    });
    let selectCodes = areaOption.map((item)=> {
      return <option key={item.id} value={item.value}>{item.content}</option>
    });
    let pagedata = {
      width: "50%",
      height: "90%",
      closeShowPage: ::this.modifyContent
    };
    let title = this.title + "广告图片";
    return (
      <div className="AdvertisingManage">
        <header className="search-area">
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>区域</label>
              <select>{selectCodes}</select>
            </div>
            <div className="form-group form-group-sm ml10">
              <label>图片名称</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10">查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增图片</button>
          </div>
        </header>
        <div className="TablePage">
          <TablePage data={advertisingManageData} contentData={tableContent}/>
        </div>
        {
          showModel &&
          <Modal>
            <ShowPage  {...pagedata} submitForm={::this.submitChange} title={title}>
              <AdvertiseEditor ref="AdvertiseEditor" advertisingManageData={advertisingManageData}
                               modifyData={modifyData}/>
            </ShowPage>
          </Modal>
        }
      </div>


    )
  }
}

module.exports = AdvertisingManage;