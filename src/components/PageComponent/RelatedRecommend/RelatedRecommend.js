/*
 *  Date    : 2016.6.30
 *  Author  : Han-Shuangli
 *  Declare : 相关推荐页
 */
'use strict';
import React, {PropTypes} from 'react';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import FormItem from 'UIComponentFolder/FormComponent/FormItem'
import Table from 'UIComponentFolder/Table/Table';
import styles from './RelatedRecommend.scss';

class RelatedRecommend extends React.Component {
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
    articleList.splice(articleList.indexOf(id), 1);
    this.forceUpdate();
  }

  render() {
    const {relatedTableData, classifyData} = this.props,
      {pageIndex, rowsForOnePage} = this.state,
      {articleList} = this,
      totalPages = Math.ceil(relatedTableData.tableContentData.length / rowsForOnePage);
    let listCode, tempArr = [];
    articleList.map((item) => {
      tempArr = tempArr.concat(relatedTableData.tableContentData.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = tempArr.map((item, i) => {
      return (
        <li className="related-item" key={i}>
          <div className="related-title">{item.article}</div>
          <div className="related-delete">
            <span className="delete-btn" onClick={() => this.deleteRelatedArticle(item.id)}>删除</span>
          </div>
        </li>
      )
    });
    return (
      <div className="RelatedRecommend clearfix">
        <aside className="related-info left">
          <header className="title">这里是文章信息...（略   ）</header>
          <ul className="related-list">
            { listCode }
          </ul>
          {
            listCode.length == 0 &&
            <p className="no-related">还没有任何关联信息...</p>
          }
        </aside>
        <div className="related-table-box left">
          <form className="related-search-box form-inline">
            <div className="input-wrap">
              <span className="tip-text">分类</span>
              <FormItem type="tree" treeData={classifyData} className="form-control w200 input-sm"/>
              <span className="tip-text">关键字</span>
              <FormItem type="text" className="keyword-input form-control w160 input-sm"/>
              <button className="btn btn-primary w80 btn-sm">搜索</button>
            </div>
          </form>
          <Table headData={relatedTableData.tableHeadData} contentData={relatedTableData.tableContentData}
                 isOptional={true} rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}
                 checkBoxClick={::this.selectArticle}/>
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange}/>
        </div>
      </div>
    )
  }
}

/**
 *
 * @type {{
 * relatedTableData: 相关推荐表格数据,
 * classifyData: 推荐分类树形数据
 * }}
 */
RelatedRecommend.propTypes = {
  relatedTableData: PropTypes.object,
  classifyData: PropTypes.array
};

export default RelatedRecommend;
