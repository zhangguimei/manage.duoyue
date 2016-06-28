'use strict';
import React from 'react';
import DatePickerTest from '../../../../../../../../../components/PageTest/DatePickerTestPage/DatePickerTestPage';
import {Link, withRouter} from 'react-router';

// import styles from "./UserManage.scss";

@withRouter
class BookConsult extends React.Component {

  componentWillMount() {
    this.props.router.setRouteLeaveHook(
        this.props.route,
        ::this.routerWillLeave
    )
  }

  render() {
    return (
      <div className="BookConsult">
        <DatePickerTest />
      </div>
    );
  }

  routerWillLeave() {
    console.log(1);
    //if (this.state.textValue)
    //return 'You have unsaved information, are you sure you want to leave this page?'
  }
}

module.exports =  BookConsult;