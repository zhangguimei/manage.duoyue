"use strict";
/*
 *  Date    : 2016.06.28
 *  Author  : CastileMan
 *  Declare : 图片文件上传组件

 * examples:
 * <ImageUpload name="image" className="blabla" defaultSrc="yourImageUrl" />
 * 若要修改图片高宽，请直接在img-box类名中设置
 * 若要修改上传按钮样式，在upload-btn类名中设置
 * */

import React, {PropTypes} from 'react';
import styles from './ImageUpload.scss';

const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'swf', 'tiff', 'psd', 'svg'];

class ImageUpload extends React.Component {

  static defaultProps = {
    name: "",             //input的name属性
    className: "",        //按钮外层自定义类名
    defaultSrc: "",       //默认图片的src
    requireDelete: false  //是否需要清空按钮
  };

  constructor(props) {
    super(props);
    const isImage = imageFormats.includes(this.props.defaultSrc.toLowerCase().substring(this.props.defaultSrc.lastIndexOf(".") + 1));
    this.state = {
      isImage: isImage,                             //所选文件是否为图片类型
      tip: isImage ? "重新上传" : "请选择...",         //上传按钮左侧提示信息
      imgTip: isImage ? "" : "点击按钮选择图片",       //图片区域文字提示信息
      dataURL: this.props.defaultSrc                //图片的src
    }
  }

  //文件上传的change事件
  fileOnChange(e) {
    let file = e ? e.target.files[0] : {},
      isImage = file.type && file.type.includes("image"),
      _this = this,
      tip = "",
      imgTip = "";
    //如果选择的文件是图片类型
    if(isImage) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        _this.setState({
          dataURL: reader.result,
          tip: "上传成功"
        });
      };
    } else if(file.name) {
      //如果选择的文件不是图片类型
      tip = "重新上传";
      imgTip = "请选择图片格式文件";
    } else {
      //如果没有选中文件
      tip = "请选择...";
      imgTip = "点击按钮选择图片";
    }
    this.setState({
      isImage: isImage,
      dataURL: "",
      tip: tip,
      imgTip: imgTip
    });
    this.props.onChange && this.props.onChange(isImage ? "图片已选择" : "");
  }

  //清空所选图片
  deleteClick() {
    this.refs.input.value = "";
    ::this.fileOnChange(null);
  }

  render() {
    const { isImage, tip, dataURL, imgTip } = this.state,
      { name, className, requireDelete } = this.props;
    let uniqCode = Math.random(),
      fileContentCode = isImage ?
        <img className="file-img" src={dataURL} alt="image"/>
        :
        <div className="img-tip">{imgTip}</div>;
    return (
      <div className={`ImageUpload ${className}`}>
        <div className="img-box">
          { fileContentCode }
        </div>
        {
          requireDelete &&
            <span className="delete-btn" onClick={::this.deleteClick}>删除</span>
        }
        <input ref="input" className="input-file" type="file" name={name} accept="image/*" id={`file-${uniqCode}`}
               onChange={::this.fileOnChange}/>
        <label className="wrapper-label clearfix" htmlFor={`file-${uniqCode}`}>
          <span className="upload-btn right">选择图片</span>
          <span className="upload-tip">{tip}</span>
        </label>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  defaultSrc: PropTypes.string,
  onChange: PropTypes.func,
  requireDelete: PropTypes.bool
};

export default ImageUpload;