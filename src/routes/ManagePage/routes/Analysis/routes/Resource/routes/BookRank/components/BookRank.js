/*
 *  Date    : 2016.7.1
 *  Author  : Zhang Guimei
 *  Declare : 书籍排行页面
 */
'use strict';
import React, {PropTypes} from 'react';
import styles from './bookRank.scss';

const bookListData = require("AssetsFolder/MockData/analysis/resource/book_rank_list_data.json");
class bookRank extends React.Component {
  render() {
    return (
      <div className="bookRank">
        <ul className="clearfix">
          {
            bookListData.map((item, i) => {
              return <li className="book-item left clearfix" key={i}>
                <span className="number left">{i + 1}</span>
                <div className="book-pic left">
                  <img src={item.pic} className="book-img" alt="书籍封面"/>
                </div>
                <section className="book-info left">
                  <h3 className="book-title">{item.title}</h3>
                  <p className="book-detail">{item.detail}</p>
                  <span className="book-read-times">{item.readTimes}</span>
                </section>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = bookRank;
