/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 二维码页面
 */
'use strict';
import React, {PropTypes} from 'react';

import Pagination from 'UIComponentFolder/Pagination/Pagination';
import styles from './QRcode.scss';

class QRcode extends React.Component {
  static defaultProps = {
    count: 5
  }

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      totalPage: 0
    };
  }

  onPageClick(nextIdx) {
    this.setState({
      pageIndex: nextIdx
    });
  }

  componentDidMount() {
    const {data} = this.props;
    let total = Math.ceil(data.length / this.props.count);
    this.setState({
      totalPage: total
    });
  }

  render() {
    const {pageIndex, totalPage} = this.state,
      {count, data} = this.props;
    let showData = data.slice((pageIndex - 1) * count, (pageIndex - 1) * count + count);
    let QRcodeContent = showData.map((item, index) => {
      return (
        <div className="item left" key={index}>
          <div className="pic">
            <img src={item.pic} alt="二维码"/>
          </div>
          <div className="title">{item.title + item.id}</div>
        </div>
      )
    });
    return (
      <div className="QRcode">
        <div className="main-content">{QRcodeContent}</div>
        <Pagination index={pageIndex} totalPages={totalPage} onPageClick={::this.onPageClick}/>
      </div>
    )
  }
}

/**
 * @type {{
 * data: *,
 * fetchData: *,
 * count: 每页显示二维码的个数
 * }}
 */
QRcode.propTypes = {
  data: PropTypes.array,
  count: PropTypes.number,
  fetchData: PropTypes.func
};
export default QRcode;