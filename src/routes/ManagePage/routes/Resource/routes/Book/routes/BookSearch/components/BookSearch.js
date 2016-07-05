/*
 *  Date    : 2016.6.30
 *  Author  : Zhang-Guimei
 *  Declare : 书籍查询入口页
 */
'use strict';
import React, {PropTypes} from 'react';

import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import Modal from 'UIComponentFolder/Modals/Modal'

import BookModify from './BookModify';
import styles from './BookSearch.scss';

const tableData = require("AssetsFolder/MockData/book/book_list_data.json");

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      showModal: false
    };
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  showBookDetail(id) {
    const {showModal} = this.state,
      {fetchBookData} = this.props;
    if (!showModal && id != undefined) {
      fetchBookData && fetchBookData(id);
    }
    this.setState({
      showModal: !showModal
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


  submitChange() {
    const {tabIndex} = this.state;
    if (tabIndex == 0) {
      this.refs.BookForm.submit();
    } else {
      ::this.showBookDetail();
    }
  }

  pluginTableData() {
    tableData.tableContentData.forEach((item, i) => {
      item.operation = <div className="BookSearchOperation clearfix">
        <button className="operation-btn left">下架</button>
        <button className="operation-btn left" onClick={() => this.showBookDetail(item.id)}>修改</button>
        <button className="operation-btn left">删除</button>
      </div>
    });
  }

  componentWillMount() {
    this.pluginTableData();
  }

  render() {
    const {rowsForOnePage, pageIndex, showModal} = this.state,
      totalPages = Math.ceil(tableData.tableContentData.length / rowsForOnePage);

    let bookDetailData = {
      title: "修改书籍",
      closeShowPage: ::this.showBookDetail,
      submitForm: ::this.submitChange
    };
    return (
      <div className="BookSearch">
        <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange}/>
        {
          showModal &&
          <Modal onModalClick={::this.showBookDetail}>
            <BookModify showBookDetail={::this.showBookDetail} bookDetailData={bookDetailData} tabIndex={0}/>
          </Modal>
        }
      </div>
    );
  }
}

module.exports = BookSearch;
