'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';

class RegisterForm extends React.Component {

  submit(values) {
    this.props.handleRegister(values);
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


RegisterForm.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleRegister: PropTypes.func.isRequired
}

RegisterForm = reduxForm({
  form: 'login',
  fields: ['invitecode', 'loginname', 'companyname', 'password', 'repassword']
})(RegisterForm);

export default RegisterForm;