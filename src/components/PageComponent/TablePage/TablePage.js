/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 纯展示表格页面含分页
 */
'use strict';
import React, {PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import FixBottom from 'UIComponentFolder/FixBottom/FixBottom';
import style from './TablePage.scss';

class TablePage extends React.Component {
  static defaultProps = {
    contentData: [],
    className: "",
    fixBottom: false,
    rowsForOnePage: 5
  };

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: this.props.rowsForOnePage
    };
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  selectOnChange(e) {
    let selectDOM = e.target,
      nextRowsForOnePage = selectDOM.value,
      nextPageIndex;
    const {pageIndex, rowsForOnePage} = this.state;
    nextRowsForOnePage = parseInt(nextRowsForOnePage, 10);
    nextPageIndex = Math.ceil((rowsForOnePage * (pageIndex - 1) + 1) / nextRowsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      rowsForOnePage: nextRowsForOnePage
    });
  }

  render() {
    const { headData, contentData, className, fixBottom} = this.props,
      {rowsForOnePage, pageIndex} = this.state,
      totalPages = Math.ceil(contentData.length / rowsForOnePage);
    return (
      <div className={`TablePage ${className}`}>
        <Table headData={headData} contentData={contentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
        {
          (totalPages > 1) && !fixBottom &&
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange}/>
        }
        {
          (totalPages > 1) && fixBottom &&
          <FixBottom className="fix-bottom">
            <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
          </FixBottom>
        }
      </div>
    )
  }
}

/**TablePage页面组件(暂时是为纯展示表格页封装，自带分页
 * 可以一块传Table里面的数据data，也可以分开传像Table组件那样;
 * @type {{
 * headData: Table头部数据,
 * contentData: Table内容数据,
 * rowsForOnePage: 每页显示几条,
 * className: 顶层div类名,
 * fixBottom: 分页是否固定在底部
 * }}
 */
TablePage.propTypes = {
  headData: PropTypes.object,
  contentData: PropTypes.array,
  rowsForOnePage: PropTypes.number,
  className: PropTypes.string,
  fixBottom: PropTypes.bool
};

export default TablePage;
