'use strict'
import React from 'react';
import SourceContent from './SourceContent';
import Pagination from '../UIComponent/Pagination/Pagination';
import styles from './SourceCenter.scss';

let data = require("../../assets/MockData/sourcecenter/source_center_data.json");
class SourceCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,  //页数
      itemsForOnePage: 15, //初始每页显示的个数
      list: data
    };
  }

  onPageClick(nextPageIndex) {                               //点击切换页数
    this.setState({
      pageIndex: nextPageIndex
    });
  }

//选中改变每页显示的个数和页数
  selectOnChange(e) {
    let selectDOM = e.target,
      nextitemsForOnePage = selectDOM.options[selectDOM.options.selectedIndex].value,
      nextPageIndex;
    const {pageIndex, itemsForOnePage} = this.state;
    nextitemsForOnePage = parseInt(nextitemsForOnePage, 10);
    nextPageIndex = Math.ceil((itemsForOnePage * (pageIndex - 1) + 1) / nextitemsForOnePage);
    this.setState({
      pageIndex: nextPageIndex,
      itemsForOnePage: nextitemsForOnePage
    });
  }

  render() {
    const {itemsForOnePage, pageIndex} = this.state,
      totalPages = Math.ceil(data.length / itemsForOnePage);   //获取总页数
    return (
      <div className="SourceCenter">
        <SourceContent data={data} itemsForOnePage={itemsForOnePage} pageIndex={pageIndex}/>
        <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}
                    selectOnChange={::this.selectOnChange}/>
      </div>
    )
  }
}

export default SourceCenter;