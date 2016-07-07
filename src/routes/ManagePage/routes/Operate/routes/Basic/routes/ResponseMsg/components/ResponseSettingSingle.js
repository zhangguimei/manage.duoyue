/*
 *  Project : Basic
 *  Date    : 2016/7/5
 *  Author  : Melody Yuen
 *  Declare : ResponseSettingSingle
 */

'use strict';
import React from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import PhotoMaterial from 'PageComponentFolder/PhotoMaterial/PhotoMaterial';
import styles from './ResponseMsg.scss';

class ResponseSettingSingle extends PhotoMaterial {
  render() {
    const {pageIndex, tableData:{tableHeadData, tableContentData}, selectedID} = this.state,
      {itemsForOnePage, data, navData} = this.props;
    const totalPages = Math.ceil(tableContentData.length / itemsForOnePage),
      tabContent = navData.map((item) => {
        return Object.values(item)[0]
      }),
      TabItemsData = {
        content: tabContent,
        tabClass: {
          tabBox: "tab-nav",
          tabItemOn: "active"
        }
      };
    let allMultiData = [];//所有类型数据
    for (let i in data) {
      allMultiData = allMultiData.concat(data[i].tableContentData);
    }
    let selectedList = [];
    selectedID.forEach((id) => {
      selectedList = selectedList.concat(allMultiData.filter((item) => item.id == id));
    });
    return (
      <div className="ResponseSettingSingle PhotoMaterial">
        <div className="multi-left">
          <dl className="SingleList weixin-list">
            {
              selectedList.length > 0 ? selectedList.map((item, i) => {
                return (
                  <dd key={i}>
                    <div className="inner">
                      {item.title}
                    </div>
                    <div className="delete"><a href="javascript:;" onClick={() => this.onDeleteClick(item.id)}>删除</a>
                    </div>
                  </dd>
                )
              }) :
                <dt className="no-result">没有响应内容</dt>
            }
          </dl>
        </div>
        <div className="multi-main">
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>分类&nbsp;&nbsp;</label>
              <input className="form-control"/>
            </div>
            <input className="btn btn-primary btn-sm w80 ml10" type="button" value="搜索"/>
          </div>
          <div className="table-wrap">
            <Table className="table-left" contentData={tableContentData} headData={tableHeadData} isOptional={true}
                   rowsForOnePage={itemsForOnePage} pageIndex={pageIndex}
                   checkBoxClick={::this.onCheckClick} initState={selectedID}/>
            <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ResponseSettingSingle;