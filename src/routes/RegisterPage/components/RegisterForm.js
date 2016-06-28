'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';

class RegisterForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  submit(values, dispatch) {
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
          this.context.router.push('/login');
        }
      }, 300)
    })
  }

  render() {
    const {fields: {invitecode, loginname, companyname, password, repassword}, handleSubmit, submitting} = this.props;
    return (
      <form className="RegisterForm" onSubmit={handleSubmit(::this.submit)}>
        <h2 className="text-center">RAYS企业账号注册</h2>
        <div className="input-box">
          <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3">邀请码</label>
          <input className="col-xs-8 col-sm-8 col-md-8 col-lg-8" type="text" placeholder="请输入邀请码" {...invitecode}/>
          {
            invitecode.touched && invitecode.error &&
            <div
              className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3 error-msg">
              {invitecode.error}
            </div>}
        </div>
        <div className="input-box">
          <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3">用户名</label>
          <input className="col-xs-8 col-sm-8 col-md-8 col-lg-8" type="text" placeholder="请输入账号" {...loginname}/>
          {
            loginname.touched && loginname.error &&
            <div
              className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3 error-msg">
              {loginname.error}
            </div>}
        </div>
        <div className="input-box">
          <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3">机构名称</label>
          <input className="col-xs-8 col-sm-8 col-md-8 col-lg-8" type="text" placeholder="请输入机构名称" {...companyname}/>
          {
            companyname.touched && companyname.error &&
            <div
              className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3 error-msg">
              {companyname.error}
            </div>
          }
        </div>
        <div className="input-box">
          <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3">请输入密码</label>
          <input className="col-xs-8 col-sm-8 col-md-8 col-lg-8" type="password" placeholder="请输入密码" {...password}/>
          {
            password.touched && password.error &&
            <div
              className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3 error-msg">
              {password.error}
            </div>
          }
        </div>
        <div className="input-box">
          <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3">请再次输入密码</label>
          <input className="col-xs-8 col-sm-8 col-md-8 col-lg-8" type="password" placeholder="请再次输入密码" {...repassword}/>
          {
            repassword.touched && repassword.error &&
            <div
              className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3 error-msg">
              {repassword.error}
            </div>
          }
        </div>
        <button className="btn btn-primary center-block" type="submit" disabled={submitting}>
          {submitting ? <i/> : <i/>} 确定注册
        </button>
      </form>
    );
  }
}

RegisterForm.contextTypes = {
  router: PropTypes.object.isRequired
};

RegisterForm.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

RegisterForm = reduxForm({
  form: 'login',
  fields: ['invitecode', 'loginname', 'companyname', 'password', 'repassword']
})(RegisterForm);

export default RegisterForm;