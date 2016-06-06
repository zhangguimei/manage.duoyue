"use strict";
import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

import MusicBox from './MusicBox/MusicBox';
import WechatContent from './WechatContent/WechatContent';

import styles from './EditPanel.scss';

class EditPanel extends React.Component {
  render() {
    const { onTabChange, content } = this.props;
    return (
      <div className="editPanel-box">
        <Scrollbars style={{height:'100%'}}>
          <div className="EditPanel">
            <MusicBox onTabChange={onTabChange} />
            <WechatContent content={content} onTabChange={onTabChange} />
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default EditPanel;