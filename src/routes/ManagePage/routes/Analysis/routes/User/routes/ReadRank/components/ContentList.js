/*
 *  Date    : 2016.7.5
 *  Author  : Zhang Guimei
 *  Declare : 阅读排行、时长分析列表页面
 */
'use strict';
import React, {PropTypes}  from 'react';
import styles from './ContentList.scss';

class ContentList extends React.Component {

  render() {
    const {data=[], className=''} = this.props;
    return (
      <ul className={`ContentList ${className}`}>
        {
          data.map((item, i) => {
            return <li className="rank-item" key={i}>
              <span className="rank-serial inline-block">{i + 1}</span>
              <div className="user-pic inline-block">
                <img src={item.pic} className="user-img" alt="用户头像"/>
              </div>
              <div className="user-info inline-block">
                <span className="user-name">{item.nickname}</span>
                <span className="user-region">{item.region}</span>
              </div>
              <span className="official-accounts inline-block">{item.officialAccounts}</span>
              <span className="times inline-block">{item.times||item.duration}</span>
            </li>
          })
        }
      </ul>
    )
  }
}

ContentList.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string
};

module.exports = ContentList;