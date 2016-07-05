/*
 *  Date    : 2016.7.6
 *  Author  : Han-Shuangli
 *  Declare : 评论管理-资源评论
 */
'use strict';
import React from 'react';
import CommentPage from 'PageComponentFolder/CommentPage/CommentPage';

let data = require("AssetsFolder/MockData/user/comment/source_comment_table.json");

class Source extends React.Component {
  render() {
    return (
      <div className="Source">
        <CommentPage searchTitle="资源标题" data={data}/>
      </div>
    );
  }
}

module.exports =  Source;