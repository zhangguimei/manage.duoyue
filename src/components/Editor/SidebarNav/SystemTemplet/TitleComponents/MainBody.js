"use strict";
import React from 'react';
import { clickToEdit, removeClickToEdit } from '../../../editorUtils/clickToEdit';

import styles from './MainBody.scss';

class MainBody extends React.Component {

  componentDidMount() {
    clickToEdit(this.refs.text);
  }

  componentWillUnmount() {
    removeClickToEdit(this.refs.text);
  }

  render(){
    return (
      <div className="MainBody">
        <p ref="text" className="text">请输入正文</p>
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