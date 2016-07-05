/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 评论管理-书籍评论
 */
'use strict';
import React from 'react';
import CommentPage from 'PageComponentFolder/CommentPage/CommentPage';

let data = require("AssetsFolder/MockData/user/comment/book_comment_table.json");

class Book extends React.Component {
  render() {
    return (
      <div className="Book">
        <CommentPage searchTitle="书籍标题" data={data}/>
      </div>
    );
  }
}

module.exports = Book;