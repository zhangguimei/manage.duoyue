'use strict'
/*
 *  Project : website Area
 *  Date    : 2016.06.29
 *  Author  : jinguolong
 *  Declare : advertisingArea page
 */

import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import AdvertiseAreaEditor from './AdvertiseAreaEditor';

import styles from './AdvertisingArea.scss';

const advertisingAreaData = require('AssetsFolder/MockData/website/advertise_area_table_data.json');

class AdvertisingArea extends React.Component {
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
    this.modifyData = item
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
    advertisingAreaData.contentData.forEach((item, i)=> {
      item.operation = <div className="AdvertiseOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>;
      item.areaScale = <div><span>宽：</span>{item.width}{" "}<span>高：</span>{item.height}</div>
    });
  }

  componentWillMount() {
    this.setState({
      contentData: advertisingAreaData.contentData
    });
    this.pluginData();
  }

  render() {
    const {modifyData} = this,
      {showLayer, contentData} = this.state;
    let pagedata = {
      width: "50%",
      height: "90%",
      closeShowPage: ::this.modifyContent
    };
    let title = this.title + "广告图片";
    return (
      <div className="AdvertisingArea">
        <header className="search-bar">
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>关键字</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary ml10">查询</button>
            <button className="btn btn-primary right" onClick={::this.modifyContent}>新增广告区</button>
          </div>
        </header>
        <TablePage headData={advertisingAreaData.headData} contentData={contentData}/>
        {
          showLayer &&
          <Modal>
            <ShowPage  {...pagedata} submitForm={::this.submitChange} title={title}>
              <AdvertiseAreaEditor ref="AdvertiseEditor" modifyData={modifyData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

module.exports = AdvertisingArea;