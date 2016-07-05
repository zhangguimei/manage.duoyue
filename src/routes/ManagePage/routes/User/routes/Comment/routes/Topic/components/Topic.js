/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 评论管理-专题评论
 */
'use strict';
import React from 'react';
import CommentPage from 'PageComponentFolder/CommentPage/CommentPage';

let data = require("AssetsFolder/MockData/user/comment/topic_comment_table.json");

class Topic extends React.Component {
  render() {
    return (
      <div className="Topic">
        <CommentPage searchTitle="专题标题" data={data}/>
      </div>
    );
  }
}

module.exports =  Topic;