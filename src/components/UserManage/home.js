'use strict';
import React from 'react';
import DatePickerTest from '../PageTest/DatePickerTestPage/DatePickerTestPage';

import styles from "./UserManage.scss";

class UserManageHome extends React.Component {
  render() {
    return (
      <div className="UserManageHome">
        <DatePickerTest/>
        UserManageHome
      </div>
    );
  }
}

export default UserManageHome;