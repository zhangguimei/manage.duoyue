"use strict";
import React from 'react';

import ContentItem from './ContentItem';

import styles from './WechatContent.scss';

class WechatContent extends React.Component {
  render(){
    const { content } = this.props,
          contentCode = content.map((item, index) => {
            return <ContentItem key={index}>{item}</ContentItem>;
          });
    return (
      <div className="WechatContent">
        {
          content.length == 0 &&
            <div className="no-page">←选择模板</div>
        }
        { contentCode }
      </div>
    );
  };
}

export default WechatContent;