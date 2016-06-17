'use strict';
import React, {PropTypes} from 'react';
import Table from '../../UIComponent/Table/Table';

class BookBrowseHistory extends React.Component {
  render() {
    const {browseTableData} = this.props;
    return (
      <div className="BookBrowseHistory">
        <Table headData={browseTableData.tableHeadData} contentData={browseTableData.tableContentData}/>
      </div>
    )
  }
}
BookBrowseHistory.propTypes = {
  browseTableData: PropTypes.object
};
export default BookBrowseHistory;
