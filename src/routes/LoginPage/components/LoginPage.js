'use strict';
import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';
import {reduxForm} from 'redux-form';
import * as loginActions from 'ActionsFolder/LoginActions';
import {requiredValid, minLengthValid } from 'UtilsFolder/formValidations';
import auth from 'APIFolder/auth';

import styles from './LoginPage.scss';

const validate = values => {
  const errors = {};
  if (!requiredValid(values.username)) {
    errors.username = '请输入账号';
  } else if (!minLengthValid(values.username, 3)) {
    errors.username = '账号长度不得少于3个字符'
  }

  if (!requiredValid(values.password)) {
    errors.password = '请输入密码'
  }
  return errors;
};

@withRouter
@reduxForm({
  form: 'login',
  fields: ['username', 'password'],
  validate,
  initialValues: {
    username: 'admin',
    password: '123456'
  }
})
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      error: false,
      errMsg: ""
    }
  }
  componentWillMount() {
    if (auth.loggedIn()) {
      this.props.router.replace('/');
    }
  }

  submit(values) {
    this.props.actions.doLogin(values, (json, status)=>{
      if(!auth.loggedIn()) {
        if(status !=200) {
          this.setState({error: true, errorMsg: json.message});
        }
      }
      if(location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname);
      }else {
        this.props.router.replace('/');
      }
    });
  }

  render() {
    const BgSrc = 'http://manage.duoyue.me/manage/images/login/bg.png';
    const {fields: {username, password}, handleSubmit, submitting} = this.props;
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
              <form className="LoginForm center-block" onSubmit={handleSubmit(::this.submit)}>
                <div className="input-block">
                  <label htmlFor="username">请输入账号：</label>
                  <input type="text" id="username" name="username" placeholder="请输入账号" {...username} />
                  {username.touched && username.error && <div className="msg-error">{username.error}</div>}
                </div>
                <div className="input-block">
                  <label htmlFor="password">请输入密码：</label>
                  <input type="password" id="password" name="password" placeholder="请输入密码" {...password} />
                  {password.touched && password.error && <div className="msg-error">{password.error}</div>}
                </div>
                <div className="input-block">
                  {this.state.error && (
                      <p className="msg-error">{this.state.errorMsg}</p>
                  )}
                </div>
                <button type="submit" disabled={submitting}>
                  {submitting ? <i/> : <i/>} 登录
                </button>
              </form>
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


const mapStateToProps = state =>{
  let {userName, token} = fromJS(state).toJS().login;
  return {
    userName,
    token
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

LoginPage.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired
}

LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);



module.exports = LoginPage;