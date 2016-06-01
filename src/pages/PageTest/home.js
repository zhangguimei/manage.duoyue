'use strict';
import React,{PropTypes} from 'react';
import { Link } from 'react-router';
import PageTest from './PageTest';
import styles from './PageTest.scss';

class home extends React.Component {
  render(){
    return(
      <div className="home">
        {this.props.children}
      </div>
    );
  }
}

export default home;