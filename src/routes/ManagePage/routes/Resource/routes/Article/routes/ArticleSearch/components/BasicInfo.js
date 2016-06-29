'use strict';
import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {InputF, InputTree} from '../../../../../../../../../components/PageTest/ValidationForm/ValidationComponents';
import BasicInfoValidate from './Validate/BasicInfoValidate';

const fields = ['category', 'color', 'original', 'cover'];
const oArticleRadio = [{value: 'no', content: "否"}, {value: 'yes', content: "是"}];
const colorRadio = [{
  value: "brown",
  content: <i className="color-radio" style={{backgroundColor: "#c29364"}}/>
},
  {
    value: "pink",
    content: <i className="color-radio" style={{backgroundColor: "#d27970"}}/>
  },
  {
    value: "blue",
    content: <i className="color-radio" style={{backgroundColor: "#6193c2"}}/>
  },
  {
    value: "none",
    content: <i className="color-radio" style={{backgroundColor: "#fff"}}/>
  }];

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
  }

  render() {
    const {data, fields: { category, color, original, cover}} = this.props;
    const dataTree = require("AssetsFolder/MockData/tree_data.json").menu;
    return (
      <form className="BasicInfo article-content">
        <div className="form-group pull-left w300">
          <div className="tree-wrap">
            <InputTree className="tree" className="input" treeData={dataTree} field={category} label="所属分类"
                       required={true}/>
          </div>
        </div>
        <div className="form-group pull-left w300">
          <label>作者</label>
          <input type="text" className="form-control w200" defaultValue={data.author}/>
        </div>
        <div className="form-group pull-left w200">
          <label>排序值</label>
          <input type="text" className="form-control w120" defaultValue={data.rank}/>
        </div>
        <div className="clearfix"></div>
        <div className="form-group">
          <label>标题</label>
          <input type="text" className="form-control w720" defaultValue={data.title}/>
        </div>
        <div className="form-group">
          <label>简介</label>
          <textarea className="form-control w720" rows="3" defaultValue={data.desc}/>
        </div>
        <div className="form-group">
          <InputF field={original} label="是否原创" inputType="radio" children={oArticleRadio}/>
        </div>
        <div className="form-group">
          <div className="radio-color">
            <InputF field={color} label=" 请选择标题颜色（适应主题图片颜色为宜）：" inputType="radio"
                    children={colorRadio}/>
          </div>
        </div>
        <div className="form-group">
          <label>封面（大图片建议尺寸：900像素 * 500像素） </label>
          <div className="pic">
            <img className="mb10" src={data.src}/>
          </div>
          <input type="file" multiple {...cover} value={null} className="cover-input"/>
        </div>
        <div className="form-group">
          <label>外链跳转网页</label>
          <input className="form-control w720" type="text"/>
        </div>
        <div className="form-group">
          <label>正文</label>
          <textarea className="form-control w100per" rows="5" defaultValue="编辑器"/>
        </div>
      </form>
    )
  }
}

BasicInfo.PropTypes = {
  defaultValue: PropTypes.String,
  src: PropTypes.String
};

export default reduxForm({
    form: 'articleform',
    fields,
    validate: BasicInfoValidate
  },
  state => ({
    initialValues: state.article.toJS().articleData
  })
)(BasicInfo);

