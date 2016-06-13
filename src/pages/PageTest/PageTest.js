'use strict';
import React,{PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './PageTest.scss';

class PageTest extends React.Component {
  render(){
    return(
      <div className="PageTest">
        <p className="component"><Link to="user/test/datepicker">DatePicker</Link></p>
        <p className="component"><Link to="user/test/table">table</Link></p>
        <p className="component"><Link to="user/test/modal">modal</Link></p>
        <p className="component"><Link to="user/test/map">map</Link></p>
        <p className="component"><Link to="user/test/useranalysis">useranalysis</Link></p>
        <p className="component"><Link to="user/test/newsorder">newsorder</Link></p>
        <p className="component"><Link to="user/test/validation">validation</Link></p>
        {this.props.children}
      </div>
    );
  }
}

export default PageTest;