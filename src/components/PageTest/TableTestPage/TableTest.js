"use strict";
import React from 'react';

import Table from '../../UIComponent/Table/Table';
import CheckBox from '../../UIComponent/Table/CheckBox';
import Pagination from '../../UIComponent/Pagination/Pagination';

const tableHeadData = {
        id: "编号",
        sortValue: "排序值",
        iconName: "图片名称",
        zone: "所在区域",
        column: "所属栏目",
        startDate: "开始日期",
        endDate: "结束日期"
      },
      tableContentData = require("../../../assets/MockData/table_list_data.json"),
      thClass = ["head-0", "head-1", "head-2", "head-3", "head-4", "head-5", "head-6"],
      tdClass = ["body-0", "body-1", "body-2", "body-3", "body-4", "body-5", "body-6"];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: 5
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
    const { pageIndex, rowsForOnePage } = this.state;
    nextRowsForOnePage = parseInt(nextRowsForOnePage, 10);
    nextPageIndex = Math.ceil((rowsForOnePage * (pageIndex - 1) + 1) / nextRowsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      rowsForOnePage: nextRowsForOnePage
    });
  }

  render() {
    const { rowsForOnePage, pageIndex } = this.state,
          totalPages = Math.ceil(tableContentData.length / rowsForOnePage);
    return(
      <div className="Test" style={{ marginTop: 100 }}>
        <Table headData={tableHeadData} contentData={tableContentData} thClass={thClass} tdClass={tdClass}
               isOperatable={true} rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}
               CheckBox={CheckBox} />
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange} />
      </div>
    );
  }
}

export default Test;