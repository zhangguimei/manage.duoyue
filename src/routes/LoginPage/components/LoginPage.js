'use strict';
import React from 'react';
import LoginForm from './LoginForm';
import {Link} from 'react-router';
import styles from './LoginPage.scss';

class LoginPage extends React.Component {
  render() {
    const BgSrc = 'http://manage.duoyue.me/manage/images/login/bg.png';
    return (
      <div className="LoginPage">
        <div className="index-wrapper">
          <div className="login-box center-block">
            <div className="logo"></div>
            <ul className="slogan text-center">
              <li className="slogan-top">
                <span>发现用户</span>
                <span>·</span>
                <span>挖掘价值</span>
              </li>
              <li className="slogan-bottom">RAYS出版融合平台</li>
            </ul>
            <div className="login-panel center-block ">
              <LoginForm/>
              <Link to={`/register`} className="text-center">新用户注册</Link>
            </div>
            <div className="new-user center-block text-center">第一次使用请点我！</div>
            <div className="announcement text-center center-block">
              <p>RAYS出版融合平台 V2.0<br/>Copyright &copy; 2016 武汉理工数字传播工程有限公司 版权所有</p>
            </div>
          </div>
        </div>
        <div className="index-bg">
          <div className="login-cover"></div>
          <img src={BgSrc}/>
        </div>
      </div>
    )
  }
}
module.exports = LoginPage;