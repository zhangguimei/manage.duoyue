/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 用户管理-用户查询
 */
'use strict';
import React from 'react';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import RightAsideDetail from 'PageComponentFolder/RightAsideDetail/RightAsideDetail';
import styles from "./UserSearch.scss";

let data = require("AssetsFolder/MockData/user/usermanage/user_search_table.json"),
  detailData = require("AssetsFolder/MockData/user/usermanage/user_detail.json");

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetail: false,
      curPageIdx: 1
    };
  }

  toggleUserDetail(type='', id) {
    this.setState({
      showUserDetail: type + '' ? type : !this.state.showUserDetail
    });
    //console.log(id);
  }

  onPageClick(nextPageIndex) {
    this.setState({
      curPageIdx: nextPageIndex
    });
  }

  pluginData(data) {
    data.forEach((item, i)=> {
      item.id = i + 1;
      let userName = item.userName;
      if (userName) {
        item.userName = <span className="user-name" onClick={()=>::this.toggleUserDetail(item.id)}>{userName}</span>;
      }
    });
  }

  componentWillMount() {
    this.pluginData(data.contentData)
  }

  render() {
    const {showUserDetail, curPageIdx} = this.state,
      {headData, contentData} = data,
      totalPages = Math.ceil(contentData.length / 10);
    const details = {
      pic: detailData.headPic,
      name: detailData.name,
      desc: detailData.desc,
      hideFunc: ::this.toggleUserDetail
    };
    return (
      <div className="UserSearch">
        <header className="header">
          <input type="text" name="keyword" className="form-control inline-block w200"/>
          <button className="btn btn-primary w80 ml10">搜索</button>
        </header>
        <div className="content-wrap">
          <Table headData={headData} contentData={contentData} rowsForOnePage={10} pageIndex={curPageIdx}/>
        </div>
        <footer className="bottom">
          <Pagination totalPages={totalPages} index={curPageIdx} onPageClick={::this.onPageClick}/>
        </footer>
        {
          showUserDetail &&
          <RightAsideDetail {...details} className="animated bounceInRight"/>
        }
      </div>
    );
  }
}

module.exports = UserSearch;