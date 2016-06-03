"use strict";
import React from 'react';

import styles from './MusicBox.scss';

class MusicBox extends React.Component {
  render() {
    const { audioSrc, onTabChange } = this.props;
    return (
      <div className="MusicBox" clearfix>
        <div className="image-cover left">
          <div className="tip center" onClick={() => onTabChange(1)}>
            “我的图库”中<br/>选择图片<br/>图片不小于<br/>300X300
          </div>
        </div>
        <div className="text-container right">
          <input type="text" className="title" placeholder="请输入标题"/>
          <textarea className="describe" name="describe" placeholder="微信分享时的描述，点击左侧图片改封面" />
        </div>
        <input type="text" className="music" placeholder="从我的音乐选择，或输入外链"  onClick={() => onTabChange(2)} />
        <audio src={audioSrc} className="audio" controls="controls">您的浏览器不支持 audio 标签。</audio>
      </div>
    );
  };
}

export default MusicBox;