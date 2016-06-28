/*
 *  Project : Progress Controller
 *  Date    : 2016.06.28
 *  Author  : Paco
 *  Declare : It can show percent of what you want to show, also, it is controlled, it provide three functions to be used.
 */
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from "./ProgressController.scss";

class ProgressController extends React.Component {

  touchStartProgress(e) {
    let {onProgressControll, progressValue} = this.props;
    e.stopPropagation();
    e.preventDefault();
    this.startXP = e.targetTouches[0].pageX;
    this.startV = progressValue;
    onProgressControll && onProgressControll("start", progressValue);
  }

  touchMoveProgress(e) {
    e.stopPropagation();
    e.preventDefault();
    let touchmove = e.targetTouches, {onProgressControll} = this.props,
      progressValueNew, progressLong = this.progressLong;
    let moveX = touchmove[0].pageX - this.startXP;
    progressValueNew = this.startV + moveX / progressLong;
    if(progressValueNew >= 0 && progressValueNew <= 1) {
      onProgressControll && onProgressControll("move", progressValueNew);
    }
  }

  touchEndProgress(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    let {onProgressControll, progressValue} = this.props;
    onProgressControll && onProgressControll("end", progressValue);
  }

  moveProgress(node) {
    node.addEventListener("touchstart", ::this.touchStartProgress, false);
    node.addEventListener('touchmove', ::this.touchMoveProgress, false);
    node.addEventListener("touchend", ::this.touchEndProgress, false);
  }

  componentDidMount() {
    let progressDot = findDOMNode(this.refs.progressDot);
    this.progressLong = findDOMNode(this.refs.progress).offsetWidth;
    this.forceUpdate();
    this.moveProgress(progressDot);
  }

  componentWillUnmount() {
    let progressDot = findDOMNode(this.refs.progressDot);
    progressDot.removeEventListener("touchstart", ::this.touchStartProgress, false);
    progressDot.removeEventListener('touchmove', ::this.touchMoveProgress, false);
    progressDot.removeEventListener("touchend", ::this.touchEndProgress, false);
  }

  render() {
    let DOT_WIDTH = 10;
    let width = this.props.progressValue * (this.progressLong || 0);
    return (
      <div className="ProgressController" id="ProgressController">
        <div id="progress_bg" className="music-progress-box" ref="progress">
          <div id="progress_buffer">
            <div id="progress" style={{width: width}}></div>
          </div>
          <div className="progress-dot-bg"></div>
          <div id="progress_dot" ref="progressDot" style={{marginLeft: (width - DOT_WIDTH) }}></div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ProgressController.propTypes = {
  progressValue: PropTypes.number.isRequired,
  onProgressControll: PropTypes.func
};

export default ProgressController;