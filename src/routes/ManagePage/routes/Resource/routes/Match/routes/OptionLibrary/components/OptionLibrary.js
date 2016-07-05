/*
 *  Project : OptionLibrary Page In Match
 *  Date    : 2016.7.1
 *  Author  : Zhou Xian
 *  Declare : Built OptionLibrary Home Page
 */

'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';

import OptionLibraryOperation from './OptionLibraryOperation';
import OptionLibraryForm from './OptionLibraryForm';

import styles from './OptionLibrary.scss';

const tableData = require("AssetsFolder/MockData/resource/match/optionLibrary/optionLibrary_table_data.json"),
  formData = {
    title:"性别",
    dtitle:"呵呵",
    type:"3",
    dataType:"text",
    desc:"哈哈"
  };

class OptionLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 20,
      tableContentData: tableData.tableContentData,
      showModifyModal: false,
      showCreateModal: false
    };
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

  toggleCreateLayer(){
    const {showCreateModal} = this.state;
    this.setState({
      showCreateModal: !showCreateModal
    });
  }

  toggleModifyLayer(){
    const {showModifyModal} = this.state;
    this.setState({
      showModifyModal: !showModifyModal
    });
  }

  submitCreatForm(){
    this.toggleCreateLayer();
  }

  submitModifyForm(){
    this.toggleModifyLayer();
  }

  handleOperationClick(type, id){
    switch(type){
      case 0:
        this.toggleModifyLayer();
        break;
      case 1:
        this.setState({
          tableContentData: this.state.tableContentData.filter(v => v.id != id)
        });
      default:
        break;
    }
  }

  render() {
    const { pageIndex, rowsForOnePage, showModifyModal, showCreateModal, tableContentData } = this.state,
    totalPages = Math.ceil(tableContentData.length / rowsForOnePage),
    modifyModalData = {
      title: "修改表单选项",
      width: "70%",
      closeShowPage: ::this.toggleModifyLayer,
      submitForm: ::this.submitModifyForm,
      ftChildren: <div className="btn-wrap"><span className="submit-btn btn" onClick={::this.submitModifyForm}>确定修改</span><span className="cancel-btn btn" onClick={::this.toggleModifyLayer}>返回关闭</span></div>
    },
    createModalData = {
      title: "新增表单选项",
      width: "70%",
      closeShowPage: ::this.toggleCreateLayer,
      submitForm: ::this.submitCreatForm
    };
    tableContentData.map((item, i) => {
      item.operation = <OptionLibraryOperation index={item.id} linkOnClick={::this.handleOperationClick}/>
    });
    return (
      <div className="OptionLibrary">
        <div className="form-inline search-area clearfix">
          <input className="form-control"/>
          <input className="btn btn-primary btn-sm w80 ml10" type="button" value="查询"/>
          <input className="btn btn-primary btn-sm w120 ml10 right" type="button" value="新增表单选项" onClick={::this.toggleCreateLayer}/>
        </div>
        <div className="list-area">
          <Table headData={tableData.tableHeadData} contentData={tableContentData} />
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} selectOnChange={::this.selectOnChange}/>
        </div>
        {
          showModifyModal &&
          <Modal onModalClick={::this.toggleModifyLayer}>
            <ShowPage closeShowPage={::this.toggleModifyLayer} {...modifyModalData}>
              <OptionLibraryForm  {...formData}/>
            </ShowPage>
          </Modal>
        }
        {
          showCreateModal &&
          <Modal onModalClick={::this.toggleCreateLayer}>
            <ShowPage closeShowPage={::this.toggleCreateLayer} {...createModalData}>
              <OptionLibraryForm />
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = OptionLibrary;