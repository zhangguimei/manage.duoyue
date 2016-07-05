/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 评论管理-圈子评论
 */
'use strict';
import React from 'react';
import CommentPage from 'PageComponentFolder/CommentPage/CommentPage';

let data = require("AssetsFolder/MockData/user/comment/book_comment_table.json");

class Group extends React.Component {
  render() {
    return (
      <div className="Group">
        <CommentPage searchTitle="圈子标题" data={data}/>
      </div>
    );
  }
}

module.exports = Group;