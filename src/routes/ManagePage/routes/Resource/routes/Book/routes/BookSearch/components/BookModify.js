'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBookData} from '../../../../../../../../../actions/BookActions';
import ShowPage from 'UIComponentFolder/Modals/ShowPage'
import Tab from 'UIComponentFolder/Tab/Tab'
import BookBasicInfo from './BookBasicInfo';
import BookMenu from './BookMenu';
import BookArticle from './BookArticle';
import BookSource from './BookSource';
import BookAuthor from './BookAuthor';
import BookRelatedRecommend from './BookRelatedRecommend';
import Tag from 'PageComponentFolder/Tag/Tag';
import QRcode from 'PageComponentFolder/QRcode/QRcode';
import HeaderInfo from 'PageComponentFolder/HeaderInfo/HeaderInfo'
import TablePage from 'PageComponentFolder/TablePage/TablePage'
import AssignMoney from 'PageComponentFolder/AssignMoney/AssignMoney'
import styles from './BookModify.scss';

const keyMaps = require("AssetsFolder/MockData/book/book_search_tab_data.json"),
  bookInfo = require("AssetsFolder/MockData/book/book_info.json"),
  classifyInfo = require("AssetsFolder/MockData/tree_data.json").menu,
  menuTableData = require("AssetsFolder/MockData/book/book_article_table_data.json"),
  menuTreeData = require("AssetsFolder/MockData/book/book_menu_tree_data.json"),
  sourceTableData = require("AssetsFolder/MockData/book/book_source_table_data.json"),
  tagData = require("AssetsFolder/MockData/book/book_tag_data.json"),
  codeData = require("AssetsFolder/MockData/sourcecenter/code_data.json"),
  authorListData = require("AssetsFolder/MockData/book/book_author_list.json"),
  browseHistoryTableData = require("AssetsFolder/MockData/book/book_browse_table_data.json"),
  fashionTableData = require("AssetsFolder/MockData/sourcecenter/product/product_fashion_table_data.json"),
  salesHistoryTableData = require("AssetsFolder/MockData/book/book_sales_history_book.json"),
  relatedTableData = require("AssetsFolder/MockData/book/book_related_table_data.json");

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

class BookModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5,
      showModal: false,
      tabIndex: this.props.tabIndex || 0
    };
    this.showPageData = {};
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

  onTypeChange(index) {
    this.createShowPageData(index);
    this.setState({
      tabIndex: index
    })
  }

  submitChange() {
    const {tabIndex} = this.state;
    const {showBookDetail} = this.props;
    if (tabIndex == 0) {
      this.refs.BookBasicInfo.submit();
    } else {
      showBookDetail();
    }
  }

  onShowClassify() {
    this.setState({
      showClassify: !this.state.showClassify
    });
  }

  submitForm(values) {
    const {showBookDetail} = this.props;
    return new Promise((resolve) => {
      resolve(values);
      showBookDetail();
    });
  }

  createShowPageData(idx) {
    const {bookDetailData} = this.props;
    if (idx === 0) {
      bookDetailData.ftChildren = <div><span className="submit-btn btn">确定新增</span>
        <span className="cancel-btn btn" onClick={bookDetailData.closeShowPage}>返回关闭</span></div>;
    } else if (idx === 10 || idx === 8) {
      bookDetailData.ftChildren =
        <div><span className="cancel-btn btn" onClick={bookDetailData.closeShowPage}>返回关闭</span></div>;
    }
    else {
      bookDetailData.showFooter = false;
    }
    this.showPageData = bookDetailData;
    this.forceUpdate();
  }

  componentDidMount() {
    const {fetchBookData} = this.props;
    fetchBookData && fetchBookData();
    this.createShowPageData(0)
  }

  render() {
    const {tabIndex} = this.state,
      {showPageData} = this;
    return (
      <div className="BookModify">
        <ShowPage {...showPageData}>
          <HeaderInfo data={bookInfo}/>
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange} typeIndex={tabIndex}/>
          { tabIndex == 0 &&
          <BookBasicInfo ref="BookBasicInfo" bookInfo={bookInfo} classifyInfo={classifyInfo} onSubmit={::this.submitForm}/>}
          { tabIndex == 1 &&
          <BookMenu menuTreeData={menuTreeData} classifyInfo={classifyInfo} menuTableData={menuTableData}/>}
          { tabIndex == 2 && <BookArticle menuTreeData={menuTreeData} menuTableData={menuTableData}/>}
          { tabIndex == 3 && <BookSource sourceTableData={sourceTableData}/>}
          { tabIndex == 4 && <Tag tagData={tagData}/>}
          { tabIndex == 5 && <QRcode data={codeData} count={6}/>}
          { tabIndex == 6 && <BookAuthor authorListData={authorListData}/>}
          { tabIndex == 7 && <TablePage data={browseHistoryTableData}/>}
          { tabIndex == 8 && <AssignMoney data={fashionTableData}/>}
          { tabIndex == 9 && <TablePage data={salesHistoryTableData}/> }
          { tabIndex == 10 &&
          <BookRelatedRecommend relatedTableData={relatedTableData} classifyInfo={classifyInfo}/>}
        </ShowPage>
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
)(BookModify);
