'use strict';
import React, {PropTypes} from 'react';

class BookInfo extends React.Component {
  render() {
    const { bookInfo } = this.props;
    return (
      <div className="BookInfo">
        <div className="modify-top-info clearfix">
          <div className="book-cover left">
            <img src={bookInfo.img} className="book-img"/>
          </div>
          <div className="book-main-info left">
            <div className="book-title">{bookInfo.title}</div>
            <div className="book-price">售价：{bookInfo.price}</div>
            <div className="bool-update">更新：{bookInfo.update}</div>
          </div>
          <ul className="book-top-list right clearfix">
            <li className="book-top-item left">
              <div className="num">{bookInfo.browse}</div>
              <div className="item-text">浏览</div>
            </li>
            <li className="book-top-item left">
              <div className="num">{bookInfo.scan}</div>
              <div className="item-text">扫一扫</div>
            </li>
            <li className="book-top-item left">
              <div className="num">{bookInfo.collection}</div>
              <div className="item-text">收藏</div>
            </li>
            <li className="book-top-item left">
              <div className="num">{bookInfo.comment}</div>
              <div className="item-text">评论</div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default BookInfo;
