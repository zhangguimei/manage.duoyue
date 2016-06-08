"use strict";
import React from 'react';

import SnapShotItem from './SnapShotItem';
import TitleTempletArray from './TitleComponents/index';

class TitleStore extends React.Component {
  render() {
    let contentCode = TitleTempletArray.map((item, index) => {
      return <SnapShotItem key={index}>{item}</SnapShotItem>
    });
    return(
      <div className="TitleStore">
        { contentCode }
      </div>
    );
  }
}

export default TitleStore;
