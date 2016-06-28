'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Validate from './Validate/BookMenuValidate';
import {InputF, InputTree} from '../../PageTest/ValidationForm/ValidationComponents';

const fields = ['parentMenu', 'name', 'tryRead', 'recommendRead', 'introduction'];
const tryReadRadio = [{value: "no", content: "否"}, {value: "yes", content: "是"}];
const recommendReadRadio = [{value: "no", content: "否"}, {value: "yes", content: "是"}];

class BookMenuInfo extends React.Component {
  render() {
    const {menuTreeData, handleSubmit, fields: {parentMenu, name, tryRead, recommendRead, introduction}} = this.props;
    return (
      <form className="add-menu-box left" onSubmit={handleSubmit}>
        <InputTree className="info-input w300" field={parentMenu} treeData={menuTreeData} label="父级目录" required={true}/>
        <InputF field={name} className="info-input input w300" label="目录名称" required={true}/>
        <div className="radio-area clearfix">
          <InputF field={tryRead} label="允许试读" inputType="radio" children={tryReadRadio}/>
          <InputF field={recommendRead} label="推荐阅读目录" inputType="radio" children={recommendReadRadio}/>
        </div>
        <div className="form-title w450">
          <span>简介</span>
          <textarea {...introduction} className="introduction-textarea w450"></textarea>
        </div>
        <button type="submit" className="book-submit-btn">确定</button>
      </form>
    )
  }
}
BookMenuInfo.propTypes = {
  menuTreeData: PropTypes.array,
  handleSubmit: PropTypes.func
};
export default reduxForm({
    form: 'bookmenuform',
    fields,
    validate: Validate
  },
  state => ({
    initialValues: state.book.toJS().menuInfoData
  }),
)(BookMenuInfo);