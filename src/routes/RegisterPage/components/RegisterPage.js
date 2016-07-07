'use strict';
import React from 'react';
import {withRouter} from 'react-router';
import RegisterForm from './RegisterForm';
import styles from './RegisterPage.scss';

@withRouter
class RegisterPage extends React.Component {

  submit(values) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!values.invitecode) {
          reject({invitecode: '请填写邀请码'})
        }
        if (!values.loginname) {
          reject({loginname: '请填写用户名'})
        } else if (['fyy'].includes(values.loginname)) {
          reject({loginname: '用户名已经被占用'})
        }
        if (!values.companyname) {
          reject({companyname: '请填写机构名称'})
        }
        if (!values.password) {
          reject({password: '请填写密码'})
        }
        if (!values.repassword) {
          reject({repassword: '请再次填写密码'})
        } else if (values.repassword != values.password) {
          reject({repassword: '两次输入的密码不一致'})
        } else {
          resolve();
          this.props.router.replace('/login');
        }
      }, 300)
    })
  }

  render() {
    return (
      <div className="RegisterPage">
        <RegisterForm handleRegister={::this.submit}/>
        <div className="register-bg"></div>
      </div>
    );
  }
}

module.exports = RegisterPage;