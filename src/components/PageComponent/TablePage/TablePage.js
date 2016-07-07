/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 纯展示表格页面含分页
 */
'use strict';
import React, {PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: this.props.rowsForOnePage || 5
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

  render() {
    const {data, headData, contentData, className=""} = this.props,
      {rowsForOnePage, pageIndex} = this.state,
      totalPages = Math.ceil(data.tableContentData.length / rowsForOnePage);
    return (
      <div className={`TablePage ${className}`}>
        <Table className="table-left" headData={headData||data.tableHeadData} contentData={contentData||data.tableContentData}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}/>
        {
          totalPages > 1 &&
          <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                      selectOnChange={::this.selectOnChange}/>
        }

      </div>
    )
  }
}

/**TablePage页面组件(暂时是为纯展示表格页封装，自带分页
 * 可以一块传Table里面的数据data，也可以分开传像Table组件那样;
 * @type {{
 * data: Table所有数据,
 * headData: Table头部数据,
 * contentData: Table内容数据,
 * rowsForOnePage: 每页显示几条,
 * className: 顶层div类名
 * }}
 */
TablePage.propTypes = {
  data: PropTypes.object,
  headData: PropTypes.array,
  contentData: PropTypes.array,
  rowsForOnePage: PropTypes.object,
  className: PropTypes.string
};

export default TablePage;
