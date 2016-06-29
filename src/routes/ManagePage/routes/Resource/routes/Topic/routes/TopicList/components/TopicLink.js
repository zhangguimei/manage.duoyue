'use strict';
import React from 'react';

const LinkData = require("AssetsFolder/MockData/topic/topic_link_data.json");

class TopicLink extends React.Component {
  render() {
    let linkCode = LinkData.map((item, index) => {
      return (
        <div className="link-item" key={index}>
          <div>{item.title}</div>
          <div className="link-url">{item.url}</div>
        </div>
      )
    })
    return (
      <div className="TopicLink">
        {linkCode}
      </div>
    )
  }
}

export default TopicLink;