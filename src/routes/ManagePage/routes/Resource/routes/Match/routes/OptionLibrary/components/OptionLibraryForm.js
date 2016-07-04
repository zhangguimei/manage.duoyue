/*
 *  Project : OptionLibrary Page In Match
 *  Date    : 2016.7.1
 *  Author  : Zhou Xian
 *  Declare : Built OptionLibraryForm Componet
 */

'use strict';
import React, {PropTypes} from 'react';

class OptionLibraryForm extends React.Component {
  static defaultProps = {
    title:"",
    dtitle:"",
    type:"0",
    dataType:"text",
    desc:""
  };

  render() {
    const {title,dtitle,type,dataType,desc}=this.props;
    return (
      <div className="OptionLibraryForm">
        <div className="showPageTable form-horizontal form-horizontal-lg">
          <div className="form-group">
            <label className="control-label"><span className="text-danger">*</span>选项类型：</label>
            <div className="control-body">
              <select name="item_input_type" className="form-control" defaultValue={type}>
                <option value="0">文本域</option>
                <option value="1">多行文本域</option>
                <option value="2">单选按钮</option>
                <option value="3">复选框</option>
                <option value="4">选择（列表/菜单）</option>
                <option value="5">2级选择（列表/菜单）</option>
                <option value="6">文件域</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label"><span className="text-danger">*</span>选项名称：</label>
            <div className="control-body">
              <input type="text" className="w200 form-control" defaultValue={title}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label"><span className="text-danger">*</span>选项说明：</label>
            <div className="control-body">
              <input type="text" className="w200 form-control" defaultValue={dtitle}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">数据类型：</label>
            <div className="control-body">
                <select name="item_data_type" className="form-control" defaultValue={dataType}>
                  <option value="text">不限</option>
                  <option value="Number">数字</option>
                  <option value="Chinese">汉字</option>
                  <option value="English">字母</option>
                  <option value="Date">日期</option>
                  <option value="Email">邮箱</option>
                  <option value="Mobile">手机</option>
                  <option value="Phone">固话</option>
                  <option value="IdCard">身份证</option>
                </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">备注说明：</label>
            <div className="control-body">
              <input type="text" className="w200 form-control" defaultValue={desc}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OptionLibraryForm.propTypes = {
  title: PropTypes.string,
  dtitle: PropTypes.string,
  type: PropTypes.string,
  dataType: PropTypes.string,
  desc: PropTypes.string
};

export default OptionLibraryForm;