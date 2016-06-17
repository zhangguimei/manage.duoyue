"use strict";
import React, {PropTypes} from 'react';

class BookSearchOperation extends React.Component {
  render() {
    const {index, linkOnClick} = this.props;
    return (
      <div className="BookSearchOperation clearfix">
        <div className="operation-btn left">下架</div>
        <div className="operation-btn left" onClick={() => linkOnClick(index)}>修改</div>
        <div className="operation-btn left">删除</div>
      </div>
    );
  };
}

BookSearchOperation.propTypes = {
  index: PropTypes.number,
  linkOnClick: PropTypes.func
};

export default BookSearchOperation;