/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 评论管理-文章评论
 */
'use strict';
import React from 'react';
import CommentPage from 'PageComponentFolder/CommentPage/CommentPage';
import style from './Article.scss';

let data = require("AssetsFolder/MockData/user/comment/article_comment_table.json");

class Article extends React.Component {
  render() {
    return (
      <div className="Article">
        <CommentPage searchTitle="文章标题" data={data}/>
      </div>
    );
  }
}

module.exports = Article;