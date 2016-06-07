'use strict';
import React from 'react';
import RegisterForm from './RegisterForm';
import styles from './PageRegister.scss';

class PageRegister extends React.Component {
  render() {
    return (
      <div className="PageRegister">
        <RegisterForm />
        <div className="register-bg"></div>
      </div>
    );
  }
}

export default PageRegister;