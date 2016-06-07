'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, is, fromJS} from 'immutable';
import * as actions from '../../actions/LoginActions';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const {username} = this.props;
    if (username) {
      this.context.router.push('/user');
    }
  }

  submit(values, dispatch) {
    let {actions:{logIn}} = this.props;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!values.username) {
          reject({username: '请输入账号'})
        } else if (!['admin', 'admin2'].includes(values.username)) {
          reject({username: '请输入正确的账号'})
        }
        if (!values.password) {
          reject({password: '请输入密码'})
        } else if (values.password != "123456") {
          reject({password: '请输入正确的密码'})
        }
        else {
          resolve();
          logIn(values.username);
          this.context.router.go('/user');
        }
      }, 300)
    })
  }

  render() {
    const {fields: {username, password}, handleSubmit, submitting} = this.props;
    return (
      <form className="LoginForm center-block" onSubmit={handleSubmit(::this.submit)}>
        <div className="input-block">
          <label>请输入账号：</label>
          <input type="text" placeholder="请输入账号" {...username}/>
          {username.touched && username.error && <div className="msg-error">{username.error}</div>}
        </div>
        <div className="input-block">
          <label>请输入密码：</label>
          <input type="password" placeholder="请输入密码" {...password}/>
          {password.touched && password.error && <div className="msg-error">{password.error}</div>}
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? <i/> : <i/>} 登录
        </button>
      </form>
    );
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

LoginForm.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['username', 'password'],
})(LoginForm);

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);