'use strict';
import React from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, is, fromJS} from 'immutable';
import * as actions from 'ActionsFolder/LoginActions';
import auth from '../../../api/auth';
import LoginForm from './LoginForm';
import styles from './LoginPage.scss';

@withRouter
class LoginPage extends React.Component {

  componentWillMount() {
    if (auth.loggedIn()) {
      this.props.router.replace('/');
    }
  }

  submit(values) {
    let {actions:{logIn}} = this.props;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!values.username) {
          reject({username: '请输入账号'})
        }
        if (!values.password) {
          reject({password: '请输入密码'})
        }
        else {
          auth.login(values.username, values.password, (loggedIn) => {
            if(!loggedIn) {
              this.setState({error: true});
              reject();
            }
            if(location.state && location.state.nextPathname) {
              this.props.router.replace(location.state.nextPathname);
            }else {
              this.props.router.replace('/');
            }
            logIn(values.username);
            resolve();
          });
        }
      }, 300)
    })
  }

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
              <LoginForm handleLogin={::this.submit}/>
              <Link to={'/register'} className="text-center">新用户注册</Link>
            </div>
            <div className="new-user center-block text-center">第一次使用请点我！</div>
            <div className="announcement text-center center-block">
              <p>RAYS出版融合平台 V2.0<br/>Copyright &copy; 2016 武汉理工数字传播工程有限公司 版权所有</p>
            </div>
          </div>
        </div>
        <div className="index-bg">
          <div className="login-cover"></div>
          <img src={BgSrc} alt="login background image"/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let {login:{username}} = fromJS(state).toJS();
  return {
    username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);