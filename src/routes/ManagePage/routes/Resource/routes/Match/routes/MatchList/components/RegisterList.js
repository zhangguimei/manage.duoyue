/*
 *  Project : MatchList
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Register List
 */
import React, {PropTypes} from 'react';
import Table from 'UIComponentFolder/Table/Table';

class RegisterList extends React.Component {
  render() {
    const {tableData} = this.props;
    return (
      <div className="RegisterList">
        <span className="output-excel">导出Excel</span>
        <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}/>
      </div>
    )
  }
}

RegisterList.propTypes = {
  tableData: PropTypes.object
};

export default RegisterList;