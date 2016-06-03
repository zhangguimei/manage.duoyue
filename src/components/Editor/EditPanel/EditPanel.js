"use strict";
import React from 'react';

import MusicBox from './MusicBox/MusicBox';
import WechatContent from './WechatContent/WechatContent';

import styles from './EditPanel.scss';

class EditPanel extends React.Component {
  render() {
    const { onTabChange } = this.props;
    return (
      <div className="editPanel-box">
        <div className="EditPanel">
          <MusicBox onTabChange={onTabChange} />
          <WechatContent pages={[]} onTabChange={onTabChange} />
        </div>

      </div>
    );
  }
}

export default EditPanel;