import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {InputF, InputTree} from '../PageTest/ValidationForm/ValidationComponents';
import BasicInfoValidate from './Validate/BasicInfoValidate';

const fields = ['title', 'author', 'rank', 'introduction', 'color', 'category', 'link', 'color', 'original', 'cover'];
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
    const {data, fields: {title, author, rank, introduction, category, link, color, original, cover}} = this.props;
    let dataTree = require("../../assets/MockData/tree_data.json").menu;
    return (
      <form className="article-content">
        <div className="modify">
          <InputTree className="tree" className="input" treeData={dataTree} field={category} label="所属分类"
                     required={true}/>
        </div>
        <div className="modify">
          <InputF field={author} className="input" label="作者"/>
        </div>
        <div className="modify">
          <InputF field={rank} className=" input" label="排序值" defaultPrompt={"整数"}/>
        </div>
        <div className="clear"/>
        <InputF field={title} className="input" label="标题" required={true} defaultPrompt={"长度小于150"}/>
        <div className="article-title">简介</div>
        <div className="tit-input">
          <textarea {...introduction} className="article-title w700" type="text"/>
        </div>
        <div>
          <InputF field={original} label="是否原创" inputType="radio" children={oArticleRadio}/>
        </div>
        <div className="radio-color">
          <InputF field={color} label=" 请选择标题颜色（适应主题图片颜色为宜）：" inputType="radio"
                  children={colorRadio}/>
        </div>
        <div className="input">
          <section className="cover form-box">
            <div className="">
              封面（大图片建议尺寸：900像素 * 500像素） <br/>
              <div className="pic">
                <img src={data.src}/>
              </div>
              <input type="file" multiple {...cover} value={null} className="cover-input"/>
            </div>
          </section>
        </div>
        <InputF field={link} className="input w700" label="外链跳转网页" inputType="text"/>
        <div className="article-title"><span className="red">*</span>正文</div>
        <div className="input">
          <div className="editor"/>
        </div>
        <div className="input"/>
        <div className="editor_bottom">
          <span className="path">元素路径</span>
          <span className="statistics">字数统计</span>
          <div className="clear"/>
        </div>
      </form>
    )
  }
}

BasicInfo.PropTypes = {
  defaultValue: PropTypes.String,
  src: PropTypes.String
}

export default reduxForm({
    form: 'articleform',
    fields,
    validate: BasicInfoValidate
  },
  state => ({
    initialValues: state.article.toJS().articleData
  })
)(BasicInfo);

