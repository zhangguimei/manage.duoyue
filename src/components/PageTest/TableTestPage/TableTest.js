"use strict";
import React from 'react';

import Table from '../../UIComponent/Table/Table';
import CheckBox from '../../UIComponent/Table/CheckBox';
import ClickPage from '../../UIComponent/ClickPage/NewClickPage';

const ROWS_FOR_ONE_PAGE = 6,
      tableHeadData = {
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
      pageIndex: 1
    };
  }

  onPageClick(nextPageIndex) {
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  render() {
    const totalPages = Math.ceil(tableContentData.length / ROWS_FOR_ONE_PAGE);
    return(
      <div className="Test" style={{ marginTop: 100 }}>
        <Table headData={tableHeadData} contentData={tableContentData} thClass={thClass} tdClass={tdClass}
               isOperatable={true} rowsForOnePage={ROWS_FOR_ONE_PAGE} pageIndex={this.state.pageIndex}
               CheckBox={CheckBox} />
        <ClickPage count={totalPages} index={1} onPageClick={::this.onPageClick}/>
      </div>
    );
  }
}

export default Test;