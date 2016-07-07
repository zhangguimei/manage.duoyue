/*
 *  Date    : 2016.7.5
 *  Author  : Zhang Guimei
 *  Declare : 阅读排行页面
 */
'use strict';
import React, {PropTypes}  from 'react';
import ContentList from './ContentList';
import styles from './ReadRank.scss';

const informationRankData = require("AssetsFolder/MockData/analysis/user/information_rank_list_data.json"),
  bookRankData = require("AssetsFolder/MockData/analysis/user/book_rank_list_data.json");

class ReadRank extends React.Component {

  render() {
    return (
      <div className="ReadRank clearfix">
        <div className="content-list left">
          <h4>资讯阅读排行</h4>
          <ContentList data={informationRankData.timesRank.slice(0, 20)} />
        </div>
        <div className="content-list left">
          <h4>书籍阅读排行</h4>
          <ContentList data={bookRankData.timesRank.slice(0, 20)} />
        </div>
      </div>
    )
  }
}

module.exports = ReadRank;