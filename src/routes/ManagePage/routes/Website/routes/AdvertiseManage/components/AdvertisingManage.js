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
      contentData: []
    };
    this.title = "新增";
    this.modifyData = {};
  }

  modifyContent(item, i) {
    if (i == true)
      this.title = "修改";
    else
      this.title = "新增";
    this.setState({
      showModel: !this.state.showModel
    });
    this.modifyData = item
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showModel: false
    })
  }

  deleteOperation(id) {
    const {contentData} = this.state;
    this.setState({
      contentData: contentData.filter(v => v.id != id)
    });
  }

  pluginData() {
    advertisingManageData.contentData.forEach((item)=> {
      item.operation = <div className="AdvertiseOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>
    });
  }

  picConsult() {

  }

  areaChange(e) {
    const contentData = advertisingManageData.contentData;
    let select = e.target,
      value = select.options[select.options.selectedIndex].value;
    if (select.options.selectedIndex)
      this.setState({
        contentData: contentData.filter((v)=>v.areaName == value)
      });
    else
      this.setState({
        contentData: contentData
      })
  }

  componentWillMount() {
    this.setState({
      contentData: advertisingManageData.contentData
    });
    this.pluginData();
  }

  render() {
    const {areaOption} = advertisingManageData,
      {modifyData} = this,
      {showModel, contentData} = this.state;
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
        <header className="search-bar">
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>区域</label>
              <select onChange={::this.areaChange}>{selectCodes}</select>
            </div>
            <div className="form-group form-group-sm ml10">
              <label>图片名称</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10" onClick={::this.picConsult}>查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增图片</button>
          </div>
        </header>
        <TablePage headData={advertisingManageData.headData} contentData={contentData}/>
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