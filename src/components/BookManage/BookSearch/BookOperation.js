"use strict";
import React, {PropTypes} from 'react';

class BookOperation extends React.Component {
  render() {
    const {index, modify, deleteOperation} = this.props;
    return (
      <div className="BookArticleOperation clearfix">
        <div className="modify left" onClick={() => modify(index,1)}>修改</div>
        <div className="order-font left">|</div>
        <div className="delete left" onClick={() => deleteOperation(index)}>删除</div>
      </div>
    );
  };
}
BookOperation.propTypes = {
  index: PropTypes.number,
  modify: PropTypes.func,
  deleteOperation: PropTypes.func
};

export default BookOperation;