"use strict";
import React from 'react';

import styles from './ContenItem.scss';

class ContentItem extends React.Component {
  render() {
    const { children } = this.props,
          contentCode = React.createElement(children);
    return(
      <div className="ContentItem">
        { contentCode }
      </div>
    );
  }
}

export default ContentItem;