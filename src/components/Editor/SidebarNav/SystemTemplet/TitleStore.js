"use strict";
import React from 'react';

import SnapShotItem from './SnapShotItem';
import TitleTempletArray from './TitleComponents/index';

class TitleStore extends React.Component {
  render() {
    const { snapShotOnClick } = this.props;
    let contentCode = TitleTempletArray.map((item, index) => {
      return <SnapShotItem snapShotOnClick={snapShotOnClick} key={index}>{item}</SnapShotItem>
    });
    return(
      <div className="TitleStore">
        { contentCode }
      </div>
    );
  }
}

export default TitleStore;
