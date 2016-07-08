'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import tools from './tools';
import UploadDetail from './UploadDetail';
import styles from './Upload.scss';

class UpLoad extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      showError: false
    };
    this.overUpLoad = []; //存储上传的文件地址,并提供给调用者
  }

  onFileChange() {
    const {beforeSend, callback, uploadUrl, uploading} = this.props, {files} = this.state;
    let checkAnswer,
      newFiles = files,
      input = findDOMNode(this.refs.file);
    let chooseFiles = Array.from(input.files);
    //执行beforeSend方法，多用于测试自定义方法
    if(beforeSend instanceof Function) {
      if(beforeSend(file) === false) {
        return false;
      }
    }
    //将得到的文件列表并入当前列表中
    chooseFiles.map( item => {
      if(files.findIndex( v => v.name == item.name) < 0) {
        newFiles = newFiles.concat([item]);
      }
    });
    //检查文件大小数量
    checkAnswer = tools.checkNumAndSize(newFiles);
    if(!checkAnswer.status) {
      alert(checkAnswer.message);
      return null;
    }

    //新建上传
    this.setState({
      files: newFiles
    });
  }
  
  deleteItem(name) {
    let {files} = this.state;
    console.log(name);
    this.setState({
      files: files.filter(v => v.name != name)
    })
  }

  render() {
    const {files} = this.state;
    return (
      <div className="Upload">
        <section className="click-area">
          <div className="upload-box text-center">
            <i className="ic ic-upload upload-icon"/>
            <span className="upload-btn">点击上传</span>
          </div>
          <input type="file" ref="file" multiple onChange={::this.onFileChange} className="file-input"/>
        </section>
        {
          files.length > 0 &&
          <UploadDetail files={files} deleteItem={::this.deleteItem}/>
        }
      </div>
    );
  }
}

export default UpLoad;