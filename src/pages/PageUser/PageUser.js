'use strict';
import React,{PropTypes} from 'react';
import { Link } from 'react-router';

class PageUser extends React.Component {
  render(){
    return(
      <div className="PageUser">
        <h1>PageUser 用户中心页面</h1>
        <Link to="/rays">点击可到测试测试页面</Link>
      </div>
    );
  }
}

export default PageUser;