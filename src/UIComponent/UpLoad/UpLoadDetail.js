'use strict';
import React, {PropTypes} from 'react';
import UploadItem from './UploadItem';

class UploadDetail extends React.Component {

  render() {
    const {files = [], deleteItem} = this.props;
    return (
      <table className="UploadDetail">
        <tbody>
          <tr>
            <th width="00">文件名称</th>
            <th width="100">缩略图</th>
            <th width="200">进度条</th>
            <th width="100">大小</th>
            <th width="100">操作</th>
          </tr>
          {
           files.map( (item, index) => {
             return <UploadItem file={item} key={index} deleteItem={deleteItem}/>;
           })
          }
        </tbody>
      </table>
    );
  }
}

UploadDetail.propTypes = {
  files: PropTypes.array.isRequired
};

export default UploadDetail;