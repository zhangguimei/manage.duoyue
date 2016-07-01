/*
 *  Date    : 2016.6.30
 *  Author  : Zhang-Guimei
 *  Declare : 书籍修改文章Tab弹层页
 */
'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Validate from './Validate/BookArticleValidate';
import {InputF, InputTree} from '../../../../../../../../../components/PageTest/ValidationForm/ValidationComponents';

const fields = ['article', 'parentMenu', 'price', 'tryRead'];
const tryReadRadio = [{value: "no", content: "否"}, {value: "yes", content: "是"}];

class BookArticleForm extends React.Component {
  render() {
    const {menuTreeData, handleSubmit, fields: {article, parentMenu, price, tryRead}} = this.props;
    return (
      <form className="BookArticleForm" onSubmit={handleSubmit}>
        <div className="clearfix">
          <InputTree className="form-control w300" treeData={menuTreeData} field={parentMenu} label="所属目录"
                     required={true}/>
          <div className="title-code">
            <div className="title-code-title">标题字符：</div>
            <input className="form-control inline w100" label="售价"/>
            <span className="interval-margin">元</span>
          </div>
        </div>
        <div className="form-title w120 clearfix">
          <InputF field={tryRead} label="允许试读" inputType="radio" children={tryReadRadio}/>
        </div>
        <div className="form-title w500 ">
          <InputF field={article} className="form-control article-title" label="文章标题" required={true}/>
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
    article: PropTypes.object,
    parentMenu: PropTypes.object,
    price: PropTypes.object,
    tryRead: PropTypes.object
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