'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { fetchBookData } from '../../actions/BookActions';

import Table from '../UIComponent/Table/Table';
import Pagination from '../UIComponent/Pagination/Pagination';
import Modal from '../UIComponent/Modals/Modal'
import ShowPage from '../UIComponent/Modals/ShowPage'
import Tab from '../UIComponent/Tab/Tab'
import Modify from './Modify';
import BookInfo from './BookInfo';
import BookForm from './BookForm';
import styles from './BookSearch.scss';

const tableData = require("../../assets/MockData/book/book_list_data.json"),
  bookInfo = require("../../assets/MockData/book/book_info.json"),
  classifyInfo = require("../../assets/MockData/tree_data.json").menu;

const keyMaps = [{"basicType": "基本信息"}, {"menu": "目录"}, {"article": "文章"}, {"source": "资源"}, {"tag": "标签"}, {"code": "二维码"}, {"author": "作者"}, {"browse": "浏览记录"}, {"subAccount": "分账设置"}, {"salesRecord": "销售记录"}, {"relatedRecommend": "相关推荐"}];
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
      showModal: false
    };
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  toggleModal(id) {
    const { showModal } = this.state,
          { fetchBookData } = this.props;
    if(!showModal && id != undefined) {
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
    const { pageIndex, rowsForOnePage } = this.state;
    nextRowsForOnePage = parseInt(nextRowsForOnePage, 10);
    nextPageIndex = Math.ceil((rowsForOnePage * (pageIndex - 1) + 1) / nextRowsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      rowsForOnePage: nextRowsForOnePage
    });
  }

  onTypeChange(index) {
    let trueIndex = index ? index + 1 : index;
    if(this.type == trueIndex) {
      this.changed = false;
      return;
    } else {
      this.type = trueIndex;
      this.changed = true;
    }
  }

  submitChange() {
    this.refs.BookForm.submit();
  }

  onSubmit(values) {
    return new Promise((resolve) => {
      resolve(values);
      ::this.toggleModal();
    })
  }

  render() {
    const { rowsForOnePage, pageIndex, showModal } = this.state,
      totalPages = Math.ceil(tableData.tableContentData.length / rowsForOnePage);
    let pagedata = {
      title: "修改书籍",
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    tableData.tableContentData.map((item, i) => {
      item.operation = <Modify index={i} linkContent="修改" linkOnClick={() => this.toggleModal(item.id)}/>;
    });
    return (
      <div className="BookSearch" style={{ marginTop: 100 }}>
        <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex} />
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange}/>
        {
          showModal &&
          <Modal onModalClick={::this.toggleModal}>
            <ShowPage {...pagedata} submitChange={::this.submitChange} className="animated fadeInDown">
              <BookInfo bookInfo={bookInfo}/>
              <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
              <BookForm ref="BookForm" bookInfo={bookInfo} classifyInfo={classifyInfo} onSubmit={::this.onSubmit} />
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
