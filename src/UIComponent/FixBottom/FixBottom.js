/*
 *  Project : FixBottom
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : value为按钮的文本，left为底部固定DIV与左侧的距离，btnClick为按钮点击按钮事件
 */

'use strict';
import React, {PropTypes} from 'react';
import styles from './FixBottom.scss';

class FixBottom extends React.Component {
  static defaultProps = {
    left: 180,
    className:''
  };

  render() {
    const {left, children,className} = this.props;
    return (
      <div className={`FixBottom ${className}`}>
        <div className="btn-div"></div>
        <div className="btn-fix" style={{left:left}}>
          {
            children
          }
        </div>
      </div>
    );
  }
}

FixBottom.propTypes = {
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.any
};

export default FixBottom;