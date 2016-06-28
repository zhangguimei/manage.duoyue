'use strict';
import React from 'react';
import RegisterForm from './RegisterForm';
import styles from './RegisterPage.scss';

class RegisterPage extends React.Component {
  render() {
    return (
      <div className="RegisterPage">
        <RegisterForm />
        <div className="register-bg"></div>
      </div>
    );
  }
}

module.exports = RegisterPage;