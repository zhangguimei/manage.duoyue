'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchBookData} from '../../../actions/BookActions';

import Table from '../../UIComponent/Table/Table';
import Pagination from '../../UIComponent/Pagination/Pagination';
import Modal from '../../UIComponent/Modals/Modal'
import ShowPage from '../../UIComponent/Modals/ShowPage'
import Tab from '../../UIComponent/Tab/Tab'
import BookSearchOperation from './BookSearchOperation';
import BookInfo from './BookInfo';
import BookForm from './BookForm';
import BookMenu from './BookMenu';
import BookArticle from './BookArticle';
import BookSource from './BookSource';
import BookTag from './BookTag';
import BookCode from './BookCode';
import BookAuthor from './BookAuthor';
import BookBrowseHistory from './BookBrowseHistory';
import BookSetFashion from './BookSetFashion';
import BookSalesHistory from './BookSalesHistory';
import BookRelatedRecommend from './BookRelatedRecommend';
import styles from './BookSearch.scss';

const tableData = require("../../../assets/MockData/book/book_list_data.json"),
  keyMaps = require("../../../assets/MockData/book/book_search_tab_data.json"),
  bookInfo = require("../../../assets/MockData/book/book_info.json"),
  classifyInfo = require("../../../assets/MockData/tree_data.json").menu,
  menuTableData = require("../../../assets/MockData/book/book_article_table_data.json"),
  menuTreeData = require("../../../assets/MockData/book/book_menu_tree_data.json"),
  sourceTableData = require("../../../assets/MockData/book/book_source_table_data.json"),
  tagData = require("../../../assets/MockData/book/book_tag_data.json"),
  codeData = require("../../../assets/MockData/book/book_code_list_data.json"),
  authorListData = require("../../../assets/MockData/book/book_author_list.json"),
  browseHistoryTableData = require("../../../assets/MockData/book/book_browse_table_data.json"),
  fashionTableData = require("../../../assets/MockData/book/book_fashion_table_data.json"),
  salesHistoryTableData = require("../../../assets/MockData/book/book_sales_history_book.json"),
  relatedTableData = require("../../../assets/MockData/book/book_related_table_data.json");

const tabContent = keyMaps.map((item) => {
    return Object.values(item)[0]
  }),
  routeKeys = keyMaps.map((item) => {
    return Object.keys(item)[0]
  });

let TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "book-tab-box clearfix",
    tabItemOn: "book-item over left",
    tabItemDefault: "book-item left"
  }
};

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      showModal: false,
      tabIndex: 0
    };
    this.showPageData = {};
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  toggleModal(id) {
    const {showModal} = this.state,
      {fetchBookData} = this.props;
    if (!showModal && id != undefined) {
      fetchBookData && fetchBookData(id);
    }
    this.setState({
      showModal: !showModal
    });
  }

  componentDidMount() {
    const {fetchBookData} = this.props;
    fetchBookData && fetchBookData();
    this.createShowPageData(0)
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

  onTypeChange(index) {
    this.createShowPageData(index);
    this.setState({
      tabIndex: index
    })
  }

  submitChange() {
    const {tabIndex} = this.state;
    if (tabIndex == 0) {
      this.refs.BookForm.submit();
    } else {
      ::this.toggleModal();
    }
  }

  onShowClassify() {
    this.setState({
      showClassify: !this.state.showClassify
    });
  }

  submitForm(values) {
    return new Promise((resolve) => {
      resolve(values);
      ::this.toggleModal();
    });
  }

  createShowPageData(idx) {
    let data = {
      title: "修改书籍",
      newPageHref: '',
      closeShowPage: ::this.toggleModal,
      submitForm: ::this.submitChange
    };
    if (idx === 0) {
      data.ftChildren = <div><span className="submit-btn btn">确定新增</span>
        <span className="cancel-btn btn" onClick={::this.toggleModal}>返回关闭</span></div>;
    } else if (idx === 10 || idx === 8) {
      data.ftChildren = <div><span className="cancel-btn btn" onClick={::this.toggleModal}>返回关闭</span></div>;
    }
    else {
      data.showFooter = false;
    }
    this.showPageData = data;
  }

  render() {
    const {rowsForOnePage, pageIndex, showModal, tabIndex} = this.state,
      {showPageData} = this,
      totalPages = Math.ceil(tableData.tableContentData.length / rowsForOnePage);

    tableData.tableContentData.map((item, i) => {
      item.operation = <BookSearchOperation index={i} linkOnClick={() => this.toggleModal(item.id)}/>
    });
    return (
      <div className="BookSearch">
        <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange}/>
        {
          showModal &&
          <Modal onModalClick={::this.toggleModal}>
            <ShowPage {...showPageData}>
              <BookInfo bookInfo={bookInfo}/>
              <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
              { tabIndex == 0 &&
              <BookForm ref="BookForm" bookInfo={bookInfo} classifyInfo={classifyInfo} onSubmit={::this.submitForm}/>}
              { tabIndex == 1 &&
              <BookMenu menuTreeData={menuTreeData} classifyInfo={classifyInfo} menuTableData={menuTableData}/>}
              { tabIndex == 2 && <BookArticle menuTreeData={menuTreeData} menuTableData={menuTableData}/>}
              { tabIndex == 3 && <BookSource sourceTableData={sourceTableData}/>}
              { tabIndex == 4 && <BookTag tagData={tagData}/>}
              { tabIndex == 5 && <BookCode codeData={codeData}/>}
              { tabIndex == 6 && <BookAuthor authorListData={authorListData}/>}
              { tabIndex == 7 && <BookBrowseHistory browseTableData={browseHistoryTableData}/>}
              { tabIndex == 8 && <BookSetFashion fashionTableData={fashionTableData}/>}
              { tabIndex == 9 && <BookSalesHistory salesHistoryTableData={salesHistoryTableData}/> }
              { tabIndex == 10 &&
              <BookRelatedRecommend relatedTableData={relatedTableData} classifyInfo={classifyInfo}/>}
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookData: bindActionCreators(fetchBookData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookSearch);
