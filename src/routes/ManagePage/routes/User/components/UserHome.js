/*
 * Created on 2016-06-25 17:59
 *
 * By Susan Su
 */

'use strict';

import React from 'react'
import styles from './User.scss';

class UserHome extends React.Component {
  render() {
    return (
        <div className="UserHome">
          <div className="userhome-title">数字中心</div>
          <ul className="main">
            <li className="tips-box">
              <span className="data-info">28</span>
              <span className="data-item">粉丝</span>
            </li>
            <li className="tips-box">
              <span className="data-info">8</span>
              <span className="data-item">书籍</span>
            </li>
            <li className="tips-box">
              <span className="data-info">111</span>
              <span className="data-item">文章</span>
            </li>
            <li className="tips-box">
              <span className="data-info">222</span>
              <span className="data-item">浏览</span>
            </li>
            <li className="tips-box">
              <span className="data-info">2333</span>
              <span className="data-item">评论</span>
            </li>
          </ul>
        </div>
    )
  }
}

export default UserHome;
