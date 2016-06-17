'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Validate from './Validate/BookArticleValidate';
import {InputF, InputTree} from '../../PageTest/ValidationForm/ValidationComponents';

const fields = ['article', 'parentMenu', 'price', 'tryRead'];
const tryReadRadio = [{value: "no", content: "否"}, {value: "yes", content: "是"}];

class BookArticleForm extends React.Component {
  render() {
    const {menuTreeData, handleSubmit, fields: {article, parentMenu, price, tryRead}} = this.props;
    return (
      <form className="BookArticleForm" onSubmit={handleSubmit}>
        <div className="clearfix">
          <InputTree className="info-input w300" treeData={menuTreeData} field={parentMenu} label="所属目录"
                     required={true}/>
          <InputF field={price} className="info-input w200"/>
        </div>
        <div className="form-title w120 clearfix">
          <InputF field={tryRead} label="允许试读" inputType="radio" children={tryReadRadio}/>
        </div>
        <div className="form-title w500 ">
          <InputF field={article} className="info-input input w300" label="文章标题" required={true}/>
        </div>
        <div className="form-title w500 ">
          <span>文章内容</span>
        </div>
      </form>
    )
  }
}
BookArticleForm.propTypes = {
  menuTreeData: PropTypes.array,
  handleSubmit: PropTypes.func,
  fields: PropTypes.shape({
    article: PropTypes.string,
    parentMenu: PropTypes.string,
    price: PropTypes.string,
    tryRead: PropTypes.string
  })
};
export default reduxForm({
    form: 'bookarticleform',
    fields,
    validate: Validate
  },
  state => ({
    initialValues: state.book.toJS().articleInfoData
  }),
)(BookArticleForm);