"use strict";
import React from 'react';

import Table from '../../../UIComponent/Table/Table';
import CheckBox from '../../../UIComponent/Table/CheckBox';
import Pagination from '../../../UIComponent/Pagination/Pagination';

import styles from './TableTest.scss';

const tableHeadData = {
    id: "编号",
    img: "封面",
    sortValue: "排序值",
    iconName: "图片名称",
    zone: "所在区域",
    column: "所属栏目",
    startDate: "开始日期",
    endDate: "结束日期"
  },
  tableHeadData2 = {
    id: "孙行者",
    img: "封面",
    sortValue: "行者孙",
    iconName: "者行孙",
    zone: "所在区域",
    column: "所属栏目",
    startDate: "开始日期",
    endDate: "结束日期"
  },
  tableContentData = require("../../../assets/MockData/testpage/table_list_data.json"),
  tableContentData2 = require("../../../assets/MockData/testpage/table_list_data_2.json"),
  thClass = ["head-0", "head-1", "head-2", "head-3", "head-4", "head-5", "head-6", "head-7"],
  tdClass = ["body-0", "body-1", "body-2", "body-3", "body-4", "body-5", "body-6", "body-7"],
  pageNumLists = [5, 10, 20];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      rowsForOnePage: pageNumLists[0],
      deleteList: []
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

  deleteData(id) {
    this.setState({
      deleteList: this.state.deleteList.concat(id)
    });
  }

  render() {
    const { rowsForOnePage, pageIndex, deleteList } = this.state;
    let filteredTableContentData = tableContentData.filter((item) => {
      return (!deleteList.includes(item.id));
    }),
        totalPages = Math.ceil(filteredTableContentData.length / rowsForOnePage);
    return (
      <div className="TableTest">
        <Table headData={tableHeadData} contentData={filteredTableContentData} thClass={thClass} tdClass={tdClass}
               isOptional={true} rowsForOnePage={rowsForOnePage} pageIndex={pageIndex}
               CheckBox={CheckBox} editable={true} deletable={true} deleteDataFunc={::this.deleteData}/>
        <br/><br/>
        <Table headData={tableHeadData2} contentData={tableContentData2} isOptional={true}
               rowsForOnePage={rowsForOnePage} pageIndex={pageIndex} />
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick} requireSelect={true}
                    selectOnChange={::this.selectOnChange} pageNumLists={pageNumLists}/>
      </div>
    );
  }
}

export default Test;