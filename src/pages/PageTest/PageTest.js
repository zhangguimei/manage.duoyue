'use strict';
import React,{PropTypes} from 'react';
import { Link } from 'react-router';

class PageTest extends React.Component {
  render(){
    return(
      <div className="PageTest">
        <h1>PageTest 用户中心页面</h1>
        <p><Link to="/test/datepicker">DatePicker</Link></p>
        <p><Link to="/test/table">table</Link></p>
        {this.props.children}
      </div>
    );
  }
}

export default PageTest;