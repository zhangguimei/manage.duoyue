'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../actions/EditorActions';
import shouldUpdate from '../../../../utils/shouldUpdate';
import ImagesItem from './ImagesItem';

import styles from './MyImages.scss';

@shouldUpdate()
class MyImages extends React.Component {

  constructor(props) {
    super(props);
  }

  onFileChange() {
    const {actions: {addMyImages}} = this.props;
    addMyImages();
  }

  deleteItem(id) {
    const {actions: {deleteItem}} = this.props;
    deleteItem && deleteItem(id);
  }

  render() {
    const {images = [], actions:{clearImages}} = this.props;
    return (
      <div className="MyImages">
        <div className="room-name"><a>全部图片</a></div>
        <section className="click-area">
          <div className="upload-box text-center">
            <button className="upload-btn btn">点击上传(可选择多个图片)</button>
          </div>
          <input type="file" ref="file" multiple onChange={::this.onFileChange} className="file-input upload-box"/>
        </section>
        <section className="clearfix">
          <button className="add-url left btn">添加图片链接</button>
          <button className="clear-img right btn" onClick={clearImages}>清空图片</button>
        </section>
        <div className="my-images">
          <ul className="clearfix">
            {
              images.map( (item, index) => <ImagesItem key={index} data={item} deleteItem={::this.deleteItem}/>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.editor.get("myImages").toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyImages);