'use strict';
import React from 'react';
import UserAnalysis from '../PageTest/ChartTestPage/UserAnalysis';
import styles from "./UserManage.scss";

class UserVideo extends React.Component {
  render() {
    return (
      <div className="UserVideo">
        <UserAnalysis/>
      </div>
    );
  }
}

export default UserVideo;