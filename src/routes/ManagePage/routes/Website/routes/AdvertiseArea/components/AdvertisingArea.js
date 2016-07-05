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
		this.state= {
			showLayer: false,
			tableContent: []
		}
		this.title = "新增";
		this.modifyData = {};
	}

	modifyContent(id,i) {
     const {tableContent} = this.state;
    if (i==true) 
      this.title = "修改";
    else 
      this.title = "新增";
    this.setState({
      showLayer: !this.state.showLayer
    })
    this.modifyData = tableContent.filter(v => v.id==id)
  }

  submitChange() {
    //this.refs.AdvertiseEditor.submit();
    this.setState({
      showLayer: false
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
      tableContent: advertisingAreaData.tableContentData
    });
  }

	render() {
		const {modifyData} = this,
					{showLayer} = this.state,
					{tableContent} = this.state;
		advertisingAreaData.tableContentData.forEach((item,i)=>{
			item.operation = <div className="AdvertiseOperation clearfix">
        <button className="btn btn-operate left" onClick={() => this.modifyContent(item.id,true)}>修改</button>
        <span className="order-font left">|</span>
        <button className="btn btn-operate left" onClick={() => this.deleteOperation(item.id)}>删除</button>
      </div>;
      item.areaScale = <div><span>宽：</span>{item.width}{" "}<span>高：</span>{item.height}</div>
		});
		let pagedata = {
      width: "50%",
      height: "90%",
      closeShowPage: ::this.modifyContent
    };
    let title = this.title+"广告图片";
		return (
			<div className="AdvertisingArea">
				<header className="search-area">
					<div className="form-inline">
						<div className="form-group form-group-sm ml10">
					    <label>关键字</label>
					    <input className="form-control"/>
					  </div>
						<button className="btn btn-primary ml10">查询</button>
						<button className="btn btn-primary right" onClick={::this.modifyContent}>新增广告区</button>
					</div>
				</header>
				<div className="TablePage">
					<TablePage data={advertisingAreaData} contentData={tableContent}/>
				</div>
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