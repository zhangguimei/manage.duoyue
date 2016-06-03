"use strict";
import React from 'react';

import styles from './WechatContent.scss';

class WechatContent extends React.Component {
  render(){
    const { pages } = this.props;
    return (
      <div className="WechatContent">
        {
          pages.length == 0 &&
            <div className="no-page">←选择模板</div>
        }
        {
          pages.map((item) => {
            return item;
          })
        }
      </div>
    );
  };
}

export default WechatContent;