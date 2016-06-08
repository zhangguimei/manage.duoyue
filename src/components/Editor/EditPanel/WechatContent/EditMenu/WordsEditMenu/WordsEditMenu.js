"use strict";
import React from 'react';
import { nodeDraggable, removeDraggable } from '../../../../../../utils/nodeDraggable';

import styles from './WordsEditMenu.scss';

class WordsEditMenu extends React.Component {

  componentDidMount() {
    nodeDraggable(this.refs.WordsEditMenu);
  }

  componentWillUnmount() {
    removeDraggable(this.refs.WordsEditMenu);
  }

  render() {
    const { className } = this.props;
    return(
      <div ref="WordsEditMenu" className={`WordsEditMenu clearfix ${className}`}>
        <span className="title left">文字</span>
        <div className="font-size left">
          <input className="font-size-input" type="text" defaultValue="12" />
          <i className="font-btn ic ic-unfold" />
        </div>
        <div className="color left clearfix">
          <input className="btn color-btn left" style={{ color: "#fff" }} type="button" value="A" title="文字颜色"/>
          <input className="btn bg-color-btn left" style={{ backgroundColor: "#000" }} type="button" title="文字背景色"/>
        </div>
        <div className="align left clearfix">
          <button className="btn align-left-btn left active"><i className="ic ic-alignleft" /></button>
          <button className="btn align-center-btn left"><i className="ic ic-aligncenter" /></button>
          <button className="btn align-right-btn left"><i className="ic ic-alignright" /></button>
          <button className="btn align-justify-btn left"><i className="ic ic-alignjustify" /></button>
        </div>
        <div className="font left clearfix">
          <button className="btn left"><b>B</b></button>
          <button className="btn left"><i style={{ fontStyle: "italic" }}>I</i></button>
          <button className="btn left"><span style={{ textDecoration: "underline" }}>U</span></button>
          <button className="btn left"><span style={{ textDecoration: "line-through" }}>AB</span></button>
        </div>
        <div className="format left">
          <input className="btn" type="button" value="格式" />
        </div>
        <div className="spacing left">
          <input className="btn" type="button" value="间距" />
        </div>
        <div className="ellipsis left">
          <button className="btn"><i>···</i></button>
        </div>
      </div>
    )
  }
}

export default WordsEditMenu;
