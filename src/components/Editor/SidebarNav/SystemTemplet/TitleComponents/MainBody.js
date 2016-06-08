"use strict";
import React from 'react';
import { clickToEdit, removeClickToEdit } from '../../../editorUtils/clickToEdit';
import WordsComponent from '../WordsComponent/WordsComponent';

import styles from './MainBody.scss';

class MainBody extends React.Component {
  render(){
    return (
      <div className="MainBody">
        <WordsComponent _this={this}>
          <p ref="text" className="text">请输入正文</p>
        </WordsComponent>
      </div>
    );
  }
}

class MainBodySnapShot extends React.Component {
  render(){
    return (
      <div className="MainBody">
        <p className="text">请输入正文</p>
      </div>
    );
  }
}

export default {
  component: MainBody,
  snapShot: MainBodySnapShot
}