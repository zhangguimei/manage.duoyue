'use strict';
import React, {PropTypes} from 'react';
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
  classifyInfo = require("../../assets/MockData/book/book_classify_data.json");

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
      showModal: false,
      showClassify: false
    };
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
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

  onShowClassify() {
    this.setState({
      showClassify: !this.state.showClassify
    });
  }

  render() {
    const { rowsForOnePage, pageIndex, showModal, showClassify } = this.state,
      totalPages = Math.ceil(tableData.tableContentData.length / rowsForOnePage);
    let pagedata = {
      title: "修改书籍",
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    let content = tableData.tableContentData.map((item, i) => {
      item.operation = <Modify index={i} linkContent="修改" linkOnClick={::this.toggleModal}/>;
    });
    return (
      <div className="BookSearch" style={{ marginTop: 100 }}>
        <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex} editable={true}/>
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange}/>
        {
          showModal &&
          <Modal onModalClick={::this.toggleModal}>
            <ShowPage {...pagedata}>
              <BookInfo bookInfo={bookInfo}/>
              <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
              <BookForm bookInfo={bookInfo} classifyInfo={classifyInfo} onShowClassify={::this.onShowClassify}
                        showClassify={showClassify}/>
            </ShowPage>
          </Modal>
        }
      </div>
    );
  }
}
export default BookSearch;
