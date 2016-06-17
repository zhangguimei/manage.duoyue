'use strict';
import React, {PropTypes} from 'react';
import Table from '../../UIComponent/Table/Table';

class BookSalesHistory extends React.Component {

  render() {
    const {salesHistoryTableData} = this.props;
    return (
      <div className="BookSalesHistory">
        <Table headData={salesHistoryTableData.tableHeadData} contentData={salesHistoryTableData.tableContentData}/>
      </div>
    )
  }
}
BookSalesHistory.propTypes = {
  salesHistoryTableData: PropTypes.object
};
export default BookSalesHistory;
