"use strict";
import React from 'react';

import styles from './SnapShotItem.scss';

class SnapShotItem extends React.Component {
  render() {
    const { children, snapShotOnClick } = this.props,
          contentCode = React.createElement(children.default.snapShot);
    return (
      <div className="SnapShotItem" onClick={() => snapShotOnClick(children.default.component)}>
        { contentCode }
      </div>
    );
  }
}

export default SnapShotItem;