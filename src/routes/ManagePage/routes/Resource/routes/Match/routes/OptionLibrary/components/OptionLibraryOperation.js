/*
 *  Project : OptionLibrary
 *  Date    : 2016.7.1
 *  Author  : Zhou Xian
 *  Declare : OptionLibrary Table Operation
 */

"use strict";
import React, {PropTypes} from 'react';

const OperationData = ["修改", "删除"];

class OptionLibraryOperation extends React.Component {
  render() {
    const {linkOnClick, index} = this.props;
    let operationItemCode = OperationData.map((item, i)=> {
      return (
        <span className="btn btn-operate" key={i} onClick={() => linkOnClick(i,index)}>{item}</span>
      )
    });
    return (
      <div className="OptionLibraryOperation clearfix">
        {operationItemCode}
      </div>
    );
  };
}

OptionLibraryOperation.propTypes = {
  index: PropTypes.number,
  linkOnClick: PropTypes.func
};

export default OptionLibraryOperation;