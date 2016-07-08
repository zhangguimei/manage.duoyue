/*
 *  Date    : 2016.07.05
 *  Author  : Jin-Guolong
 *  Declare : 网站管理-网站列表
 */
'use strict';
import React, {PropTypes} from 'react'
import styles from './WebList.scss'

const weblistData = require('AssetsFolder/MockData/website/web_list_data.json');

class WebList extends React.Component {
  render() {
    let weblistCodes = weblistData.map((item, i)=> {
      return (
        <div className="website-box" key={i}>
          <div className="info-group">
            <span className="table-name">机构名称：</span><span className="table-info">{item.name}</span>
          </div>
          <div className="info-group">
            <span className="table-name">登录账号：</span><span className="table-info">{item.account}</span>
          </div>
          <div className="info-group">
            <span className="table-name">邀请码：</span><span className="table-info">{item.invitationCode}</span>
          </div>
          <div className="info-group">
            <span className="table-name">PC网站：</span><span className="table-info">{item.websiteURL}</span>
          </div>
          <div className="info-group">
            <span className="table-name">创建时间：</span><span className="table-info">{item.createTime}</span>
          </div>
        </div>)
    });
    return (
      <div className="WebList">
        {weblistCodes}
      </div>
    )
  }
}

module.exports = WebList;