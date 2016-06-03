'use strict';
import React,{PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './PageTest.scss';

class PageTest extends React.Component {
  render(){
    return(
      <div className="PageTest">
        <p className="component"><Link to="/test/datepicker">DatePicker</Link></p>
        <p className="component"><Link to="/test/table">table</Link></p>
        <p className="component"><Link to="/test/modal">modal</Link></p>
        <p className="component"><Link to="/test/map">map</Link></p>
        <p className="component"><Link to="/test/useranalysis">useranalysis</Link></p>
        <p className="component"><Link to="/test/newsorder">newsorder</Link></p>
        <p className="component"><Link to="/test/validation">validation</Link></p>
        {this.props.children}
      </div>
    );
  }
}

export default PageTest;