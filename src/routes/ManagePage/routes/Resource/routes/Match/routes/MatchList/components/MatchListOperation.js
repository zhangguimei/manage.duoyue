/*
 *  Project : MatchList
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Match List Operation
 */
"use strict";
import React, {PropTypes} from 'react';

const OperationData = ["查看链接", "修改信息", "删除活动", "选项配置", "报名数据", "下架", "导出"];

class MatchListOperation extends React.Component {
  render() {
    const {linkOnClick,index} = this.props;
    let operationItem = OperationData.map((item, i)=> {
      return (
        <span className="btn btn-operate" key={i} onClick={() => linkOnClick(i,index)}>{item}</span>
      )
    });
    return (
      <div className="MatchListOperation clearfix">
        {operationItem}
      </div>
    );
  };
}

MatchListOperation.propTypes = {
  index: PropTypes.number,
  linkOnClick: PropTypes.func
};

export default MatchListOperation;