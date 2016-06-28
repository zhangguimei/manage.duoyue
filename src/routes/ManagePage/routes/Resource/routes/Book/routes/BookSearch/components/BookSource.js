'use strict';
import React, {PropTypes} from 'react';
import Table from './Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';

const pageNumLists = [5, 10, 50];

class BookSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 10,
      checkBoxState: false
    };
    this.sourceList = [];
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

  selectSource(id, isSelected) {
    const {sourceList} = this;
    const {sourceTableData} = this.props;
    if (isSelected) {
      if (sourceList.indexOf(id) < 0) {
        this.sourceList = sourceList.concat(id);
      }
    } else {
      if (sourceList.indexOf(id) >= 0) {
        sourceList.splice(sourceList.indexOf(id), 1)
      } else {
        alert("该记录不存在");
      }
    }
    this.forceUpdate();
  }

  deleteRelatedSource(id) {
    const {sourceList} = this;
    sourceList.splice(sourceList.indexOf(id), 1)
    this.forceUpdate();
  }

  render() {
    const {sourceTableData} = this.props,
      {pageIndex, rowsForOnePage, showModifyLayer, checkBoxState} = this.state,
      totalPages = Math.ceil(sourceTableData.tableContentData.length / rowsForOnePage),
      {sourceList} = this;
    let listCode = [];
    sourceList.map((item, i) => {
      listCode = listCode.concat(sourceTableData.tableContentData.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = listCode.map((item, i) => {
      return (
        <li className="checked-source-item" key={i}>
          <div className="source-name a-line">{item.title}</div>
          <div className="source-pic">
            <img src={item.pic}/>
            <div className="source-name-box">
              <div className="source-box-name a-line">{item.title}</div>
            </div>
          </div>
          <div className="source-dtitle">{item.dtitle}</div>
          <div className="source-delete">
            <div className="source-del-btn" onClick={() => this.deleteRelatedSource(item.id)}>删除</div>
          </div>
        </li>
      )
    })

    return (
      <div className="BookSource clearfix">
        <div className="source-left left">
          {
            listCode.length == 0 &&
            <div className="no-source"> 没有关联的资源信息...</div>
          }

          <ul className="source-list">
            {
              listCode
            }
          </ul>

        </div>
        <div className="source-table-area left">
          <div className="keyword-area">
            <div className="related-search-box">
              <span className="interval-margin">关键字</span>
              <input className="info-input interval-margin w200"/>
              <div className="book-submit-btn inline interval-margin">搜索</div>
            </div>
          </div>
          <Table headData={sourceTableData.tableHeadData} contentData={sourceTableData.tableContentData}
                 isOptional={true} rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}
                 selectArticle={::this.selectSource}/>
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange} pageNumLists={pageNumLists}/>
        </div>
      </div>
    )
  }
}
BookSource.propTypes = {
  sourceTableData: PropTypes.object
};
export default BookSource;
