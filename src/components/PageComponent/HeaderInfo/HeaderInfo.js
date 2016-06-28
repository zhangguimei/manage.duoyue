/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 通用弹层头部
 */
'use strict';
import React, {PropTypes} from 'react';
import styles from './HeaderInfo.scss';

class HeaderInfo extends React.Component {

  render() {
    const {data:{img, name, price, update, type, browse, scan, collection, comment}} = this.props;
    return (
      <div className="HeaderInfo">
        <div className="img-wrap left">
          <img src={img} className="img"/>
        </div>
        <div className="main-info left">
          <p className="title">{name}</p>
          <h4 className="price">售价：{price}</h4>
          <h4 className="update">更新：{update}</h4>
          {type && <h4 className="type">类型：{type}</h4>}
        </div>
        <ul className="top-list right clearfix">
          <li className="top-item left">
            <span className="num">{browse}</span>
            <h4 className="item-text">浏览</h4>
          </li>
          <li className="top-item left">
            <span className="num">{scan}</span>
            <h4 className="item-text">扫一扫</h4>
          </li>
          <li className="top-item left">
            <span className="num">{collection}</span>
            <h4 className="item-text">收藏</h4>
          </li>
          <li className="top-item left">
            <span className="num">{comment}</span>
            <h4 className="item-text">评论</h4>
          </li>
        </ul>
      </div>
    )
  }
}

HeaderInfo.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    update: PropTypes.string,
    type: PropTypes.string,
    browse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    scan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    collection: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comment: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default HeaderInfo;
