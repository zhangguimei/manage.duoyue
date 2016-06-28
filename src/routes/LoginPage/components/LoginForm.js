'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      error: false
    }
  }
  submit(values) {
    this.props.handleLogin(values);
  }

  render() {
    const {fields: {username, password}, handleSubmit, submitting} = this.props;
    return (
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
              <p className="msg-error">用户名或密码错误。请检查。</p>
          )}
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? <i/> : <i/>} 登录
        </button>
      </form>
    );
  }
}

LoginForm.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['username', 'password'],
  initialValues: {
    username: 'admin',
    password: '1'
  }
})(LoginForm);

export default LoginForm;