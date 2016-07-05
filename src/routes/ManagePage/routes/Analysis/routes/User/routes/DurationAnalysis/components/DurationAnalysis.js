/*
 *  Date    : 2016.7.5
 *  Author  : Zhang Guimei
 *  Declare : 时长分析页面
 */
'use strict';
import React, {PropTypes}  from 'react';
import ContentList from '../../ReadRank/components/ContentList';
import styles from './DurationAnalysis.scss';

const informationRankData = require("AssetsFolder/MockData/analysis/user/information_rank_list_data.json"),
  bookRankData = require("AssetsFolder/MockData/analysis/user/book_rank_list_data.json");

class DurationAnalysis extends React.Component {
  render() {
    return (
      <div className="DurationAnalysis">
        <div className="content-list left">
          <h4>资讯阅读时长排行</h4>
          <ContentList data={informationRankData.durationRank.slice(0, 20)}/>
        </div>
        <div className="content-list left">
          <h4>书籍阅读时长排行</h4>
          <ContentList data={bookRankData.durationRank.slice(0, 20)}/>
        </div>
      </div>
    )
  }
}

module.exports = DurationAnalysis;