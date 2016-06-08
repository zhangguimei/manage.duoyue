'use strict';
import React from 'react';
import TableTest from '../PageTest/TableTestPage/TableTest';
import styles from "./UserManage.scss";

class UserImage extends React.Component {
  render() {
    return (
      <div className="UserImage">
        <TableTest/>
      </div>
    );
  }
}

export default UserImage;