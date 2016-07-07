/*
 *  Date    : 2016.7.3
 *  Author  : Han-Shuangli
 *  Declare : 右侧详情区域
 */
'use strict';
import React, {PropTypes} from 'react';
import styles from "./RightAsideDetail.scss";

class RightAsideDetail extends React.Component {

  hideSelf() {
    const {hideFunc} = this.props;
    hideFunc && hideFunc(false);
  }
  
  render() {
    const {pic, name, desc, className, children} = this.props;
    return (
      <aside className={`RightAsideDetail ${className}`}>
        {
          children ? children : <div className="content">
            <div className="img-wrap">
              <img className="img" src={pic} alt="封面图"/>
            </div>
            <h3 className="name">{name}</h3>
            <p className="desc">{desc}</p>
          </div>
        }
        <input type="text" ref="hook" autoFocus="autofocus" onBlur={::this.hideSelf} style={{position:'absolute',left:'-1000px'}}/>
      </aside>
    )
  }
}

RightAsideDetail.propTypes = {
  pic: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.string,
  hideFunc: PropTypes.func
};

export default RightAsideDetail;
