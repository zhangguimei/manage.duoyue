'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Table from './Table/Table';
import Validate from './Validate/BookRelatedRecommendValidate';
import {InputF, InputTree} from '../../PageTest/ValidationForm/ValidationComponents';
import Pagination from '../../UIComponent/Pagination/Pagination';

const pageNumLists = [10, 20, 50];
const fields = ['classify', 'keyword'];

class BookRelatedRecommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 10,
    };
    this.articleList = [];
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

  selectArticle(id, isSelected) {
    const {articleList} = this;
    const {relatedTableData} = this.props;
    if (isSelected) {
      if (articleList.indexOf(id) < 0) {
        this.articleList = articleList.concat(id);
      }
    } else {
      if (articleList.indexOf(id) >= 0) {
        articleList.splice(articleList.indexOf(id), 1)
      } else {
        alert("该记录不存在");
      }
    }
    this.forceUpdate();
  }

  deleteRelatedArticle(id) {
    const {articleList} = this;
    articleList.splice(articleList.indexOf(id), 1)
    this.forceUpdate();
  }

  render() {
    const {relatedTableData, classifyInfo, fields: {classify, keyword}} = this.props,
      {pageIndex, rowsForOnePage} = this.state,
      {articleList} = this,
      totalPages = Math.ceil(relatedTableData.tableContentData.length / rowsForOnePage);
    let listCode = [];
    articleList.map((item, i) => {
      listCode = listCode.concat(relatedTableData.tableContentData.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = listCode.map((item, i) => {
      return (
        <li className="related-article-item" key={i}>
          <div className="related-article-title">{item.article}</div>
          <div className="related-article-delete"><span className="delete-btn"
                                                        onClick={() => this.deleteRelatedArticle(item.id)}>删除</span>
          </div>
        </li>
      )
    })
    return (
      <div className="BookRelatedRecommend clearfix">
        <div className="related-info left">
          <div className="article-info">这里是文章信息...（略   ）</div>
          <ul className="related-article-list">
            { listCode }
          </ul>
          {
            listCode.length == 0 &&
            <div className="no-related">还没有任何关联信息...</div>
          }
        </div>
        <div className="related-table-box left">
          <form className="related-search-box">
            <InputTree className="info-input w200" treeData={classifyInfo} field={classify} label="分类"/>
            <InputF field={keyword} className="info-input input w200" label="关键字"/>
            <div className="book-submit-btn inline interval-margin">搜索</div>
          </form>
          <Table headData={relatedTableData.tableHeadData} contentData={relatedTableData.tableContentData}
                 isOptional={true} rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}
                 selectArticle={::this.selectArticle}/>
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange} pageNumLists={pageNumLists}/>
        </div>
      </div>
    )
  }
}
BookRelatedRecommend.propTypes = {
  relatedTableData: PropTypes.object,
  classifyInfo: PropTypes.array
};

export default reduxForm({
    form: 'bookform',
    fields,
    validate: Validate
  },
  state => ({
    initialValues: state.book.toJS().bookData
  })
)(BookRelatedRecommend);
