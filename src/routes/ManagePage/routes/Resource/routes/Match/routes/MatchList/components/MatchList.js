/*
 *  Project : MatchList Page In Match
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Built MatchList Home Page
 */
'use strict';
import React, {PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Pagination from 'UIComponentFolder/Pagination/Pagination';

import MatchListOperation from './MatchListOperation';
import BasicInfo from './BasicInfo';
import MatchListModify from './MatchListModify';

import styles from './MatchList.scss';

const tableData = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_list_data.json"),
  matchNullInfo = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_null_info.json"),
  treeData = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_tree_data.json").menu;

class MatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      tableContentData: tableData.tableContentData,
      showModifyModal: false,
      showCreateModal: false
    };
    this.tabIndex = 0;
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  selectOnChange(e) {
    let selectDOM = e.target,
      nextRowsForOnePage = selectDOM.options[selectDOM.options.selectedIndex].value,
      nextPageIndex;
    const {pageIndex, rowsForOnePage} = this.state;
    nextRowsForOnePage = parseInt(nextRowsForOnePage, 10);
    nextPageIndex = Math.ceil((rowsForOnePage * (pageIndex - 1) + 1) / nextRowsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      rowsForOnePage: nextRowsForOnePage
    });
  }

  toggleCreareLayer() {
    const {showCreateModal} = this.state;
    this.setState({
      showCreateModal: !showCreateModal
    });
  }

  toggleModifyLayer() {
    const {showModifyModal} = this.state;
    this.setState({
      showModifyModal: !showModifyModal
    });
  }

  handleOperationClick(type, id) {
    switch (type) {
      case 0:
      case 1:
        this.toggleModifyLayer();
        this.tabIndex = type;
        break;
      case 3:
        this.toggleModifyLayer();
        this.tabIndex = 2;
        break;
      case 4:
        this.toggleModifyLayer();
        this.tabIndex = 5;
        break;
      case 2:
        this.setState({
          tableContentData: this.state.tableContentData.filter(v => v.id != id)
        });
      default:
        break;
    }
  }

  render() {
    const {pageIndex, rowsForOnePage, showModifyModal, showCreateModal, tableContentData} = this.state,
      totalPages = Math.ceil(tableContentData.length / rowsForOnePage);
    tableContentData.map((item, i) => {
      item.operation = <MatchListOperation index={item.id} linkOnClick={::this.handleOperationClick}/>
    });
    return (
      <div className="MatchList">
        <header className="search-bar header clearfix">
          <span className="inline">分类</span>
          <FormItem type="tree" name="classify" className="form-control input-sm w200" treeData={treeData}/>
          <span className="inline">名称</span>
          <input className="form-control input-sm w200 ml10"/>
          <input type="button" className="btn btn-primary w80 ml10 btn-sm" value="查询"/>
          <button className="right btn btn-primary w120 btn-sm" onClick={::this.toggleCreareLayer}>新增活动报名</button>
        </header>
        <div className="matchList-table">
          <Table headData={tableData.tableHeadData} contentData={tableContentData}
                 rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange}/>
        </div>
        {
          showModifyModal &&
          <MatchListModify toggleLayer={::this.toggleModifyLayer} tabIndex={this.tabIndex}/>
        }
        {
          showCreateModal &&
          <Modal onModalClick={::this.toggleCreareLayer}>
            <ShowPage closeShowPage={::this.toggleCreareLayer} width="70%">
              <BasicInfo matchInfo={matchNullInfo} treeData={treeData}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = MatchList;
