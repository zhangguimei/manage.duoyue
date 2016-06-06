'use strict';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import validate from './Validation';
import {InputF, SelectF, InputNumber, InputTree} from './ValidationComponents';
import CascadeSelect from '../../UIComponent/CascadeSelect/CascadeSelect'

const fields = ['tree', 'range', 'position' ,'classify', 'author', 'bookNum', 'province', 'city', 'district', 'order', 'title', 'description', 'original', 'color', 'cover', 'url', 'content'];
const potentialColor = [{
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
  }
];
const positions = [
  {
    value: "0",
    content: "无"
  },
  {
    value: "1",
    content: "老师"
  },
  {
    value: "2",
    content: "工人"
  },
  {
    value: "3",
    content: "医生"
  },
  {
    value: "4",
    content: "总统"
  },
  {
    value: "5",
    content: "学生"
  }
];
const treeData = require('../../../assets/MockData/tree_data.json').menu;
const locationData = {
  showGenre: ['省/市', '市/县', '区'],
  defaultItemVaule: '---------无--------',
  addressValue: ['湖北', '武汉', '新洲', 2003]
};

class ValidationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectAddress: {}
    }
  }

  getSelectData(info) {
    this.setState({
      selectAddress: info
    });
  }

  submit(values) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(()=>{alert(values)})
      }, 1000)
    })
  }

  render() {
    const {
        fields: {tree, range, classify, author, bookNum, province, city, district, position, order, title, description, original, color, cover, url, content},
        handleSubmit, submitting
      } = this.props;
    const { selectAddress } = this.state;
    const CascadeSelectClassName = [
      province.touched && province.error ? "error-input" : "",
      city.touched && city.error ? "error-input" : "",
      district.touched && district.error ? "error-input" : ""
    ];
    return (
      <form className="ValidationForm article-form" onSubmit={handleSubmit(this.submit)}>

        <InputTree treeData={treeData} field={tree} label="请选择父节点" required={true} defaultPrompt="haha"/>

        <InputNumber field={range}/>

        <SelectF field={position} options={positions} />

        <InputF field={classify} label="选择分类" defaultPrompt="必填" required={true} showError={true}/>

        <InputF field={author} label="作者" />

        <InputF field={bookNum} label="书号" placeholder="999-9-9999-9999-9" />

        <p>name:{selectAddress.name}</p>
        <p>id:{selectAddress.id}</p>
        <CascadeSelect data={locationData} getSelectInfo={::this.getSelectData} fields={[province, city, district]} fieldsClassName={CascadeSelectClassName}/>

        <InputF field={title} label="标题" required={"required"} defaultPrompt={"长度小于150"}/>

        <InputF field={order} label="排序值" defaultPrompt={"整数"}/>

        <InputF field={description} label="简介" inputType="textarea"/>

        <InputF field={original} label="是否原创" inputType="checkbox"/>

        <InputF field={color} label="请选择标题颜色（适应主题图片颜色为宜）:" inputType="radio" children={potentialColor}/>

        <section className="cover form-box">
          <label className="">
            封面（大图片建议尺寸：900像素 * 500像素） <br/>
            <input type="file" multiple {...cover} value={null} className="cover-input"/>
          </label>
        </section>

        <InputF field={url} label="跳转数据URL" inputType="text"/>

        <section className="content-form form-box">
          <label className="content-form required">
            正文 <br/>
            <textarea {...content} className="content-input"/>
          </label>
        </section>

        {
          submitting && <div style={{color: 'red'}}>submitting</div>
        }
        <button className="btn" type="submit">提交</button>

      </form>
    );
  }
}

ValidationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'article',
  initialValues: {
    province: locationData.addressValue[0],
    city: locationData.addressValue[1],
    district: locationData.addressValue[2]
  },
  fields,
  validate
})(ValidationForm)