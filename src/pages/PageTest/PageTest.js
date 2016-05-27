'use strict';
import React,{PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './PageTest.scss';

class PageTest extends React.Component {
  render(){
    return(
      <div className="PageTest">
        <h1>PageTest 功能测试页面</h1>
        <p className="component"><Link to="/test/datepicker">DatePicker</Link></p>
        <p className="component"><Link to="/test/table">table</Link></p>
        <p className="component"><Link to="/test/modal">modal</Link></p>
        {this.props.children}
      </div>
    );
  }
}

export default PageTest;