'use strict'
/*
 *  Project : website Area
 *  Date    : 2016.06.29
 *  Author  : jinguolong
 *  Declare : 系统管理-系统账号
 */

import React, {PropTypes} from 'react';
import styles from './SystemAccount.scss';

class SystemAccount extends React.Component {
  
  render() {
    return (
      <div className="SystemAccount">
        <div className="user-info">
          <p>账号:<span>chenmin</span></p>
          <p>创建：<span>2016/3/27 16:00:19</span></p>
          <p className="attention">系统帐号是最高管理权限的帐号，一般只创建管理帐号与分配权限，请牢记您的系统帐号与密码！</p>
        </div>
        <form className="form-default">
          <div className="mes-group">
            <div className="form-group">
              <label className="require">请输入新密码</label>
              <input type="password" className="form-control w200"/>
            </div>
            <div className="form-group">
              <label className="require">请再次输入新密码</label>
              <input type="password" className="form-control w200"/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = SystemAccount;
