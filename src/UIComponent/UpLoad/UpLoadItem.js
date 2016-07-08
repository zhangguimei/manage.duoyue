'use strict';
import React, {PropTypes} from 'react';
import ShowBreviaryImg from './ShowBreviaryImg';
import ProgressController from 'UIComponentFolder/ProgressController/ProgressController';
import utils from 'UtilsFolder/utils';

class UploadItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0
    }
  }

  componentWillReceiveProps(np) {
    this.forceUpdate();
  }

  componentDidMount() {
    // let total, pre,
    //   xhr = utils.getXhr();
    // xhr.onreadystatechange = () => {
    //   if(this.readyState == 4 && xhr.status == 200) {
    //     if(callback instanceof Function) {
    //       callback(xhr.responseText);
    //       cconsole.log(xhr.responseText);
    //     }
    //   }
    // };
    //
    // xhr.upload.onprogress = (event) => {
    //   loaded = event.loaded;
    //   total = event.total;
    //   pre = Math.floor(100 * loaded / total);
    //   if(uploading instanceof Function) {
    //     uploading(pre)
    //   }
    // };
    //
    // xhr.open("post", "http://www.baidu.com");
    // xhr.send({data: file});
    //file = this.props.file;
  }

  render() {
    let {file, deleteItem} = this.props, {progressValue} = this.state;
    return (
      <tr className="UploadItem">
        <td width="200">
          {file.name}
        </td>
        <td>
          <ShowBreviaryImg file={file}/>
        </td>
        <td>
          <ProgressController progressValue={progressValue}/>
        </td>
        <td>
          {utils.getSizeByByte(file.size)}
        </td>
        <td>
          <a className="delete-item" onClick={() => deleteItem(file.name)}>删除</a>
        </td>
      </tr>
    );
  }
}

export default UploadItem;