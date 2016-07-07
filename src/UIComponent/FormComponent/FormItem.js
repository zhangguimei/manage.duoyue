/*
 *  Date    : 2016.06.28
 *  Author  : CastileMan
 *  Declare : 表单验证组件
 *
 * examples:
 * <FormItem type="text" name="age" title="年龄" className="input-age" rules={{required: true, pattern: regs.number}}
 *  tips={{required: "请填写您的年龄", pattern: "请您填写正确的年龄"}} requireError={true} value="blabla" defaultValue="18"
 *  placeholder="请填写年龄" />
 * */
"use strict";
import React, {PropTypes} from 'react';
import { fromJS } from 'immutable';
import CheckBox from '../Table/CheckBox';
import Radio from '../Radio/Radio';
import DatePicker from '../DatePicker/DatePicker';
import Tree from '../Tree/Tree';
import CascadeSelect from '../CascadeSelect/CascadeSelect';
import ImageUpload from '../ImageUpload/ImageUpload';

import { requiredValid, maxLengthValid, minLengthValid, patternValid } from '../../utils/formValidations';

class FormItem extends React.Component {

  static defaultProps = {
    itemClass: "",              //FormItem自定义类名
    className: "",              //表单自定义类名
    name: "",                   //表单名字
    title: "",                  //表单标题
    desc: "",                   //表单详情描述
    type: "text",               //表单类型
    defaultValue: "",           //表单初始值
    value: "",                  //通过此属性可以给表单赋值
    placeholder: "",            //placeholder
    tips: {},                   //表单自定义报错信息
    requireError: false,        //是否需要显示报错信息
    options: [],                //radio, checkbox, select， dblSelect等类型的选项
    rules: {},                  //表单自定义验证规则
    disabled: false             //是否不可编辑
  };

  constructor(props) {
    super(props);
    this.state = {
      valid: true,                      //表单是否合法
      value: this.props.defaultValue,   //表单的值
      error: "",                        //表单报错信息
      touched: false,                   //表单是否被点击过
      showTree: false                   //是否显示树
    };
  }

  //通用change事件
  onChange(e, newValue = "") {
    const value = newValue || (e ? e.target.value : ""),
      { type } = this.props;
    this.setState({
      value: value
    });
    if(!['text', 'number', 'textarea'].includes(type)) {
      ::this.validate(e, false, newValue);
    }
  }

  //验证
  validate(e, isDefault = false, newValue) {
    const { defaultValue, rules, tips, title, type } = this.props;
    const { required = false, minLength = 0, maxLength = 0, pattern = "" } = rules;
    const value = isDefault ? defaultValue : (newValue ? newValue : (e ? e.target.value : ""));
    let error = "",
      touched = !isDefault,
      operation = ['text', 'textarea'].includes(type) ? "填写" : "选择";
    //验证必填
    if(required && !requiredValid(value)) {
      error = tips.required || `请${operation}${title}`;
    }
    //验证最小长度
    if(!error && minLength > 0 && !minLengthValid(value, minLength)) {
      error = tips.minLength || `${title}${operation}长度过短`;
    }
    //验证最大长度
    if(!error && minLength > 0 && !maxLengthValid(value, maxLength)) {
      error = tips.maxLength || `${title}${operation}长度过长`;
    }
    //验证正则
    if(!error && pattern && !patternValid(value, pattern)) {
      error = tips.pattern || `请${operation}正确的${title}`;
    }
    this.setState({
      valid: !error,
      error: error,
      touched: touched
    });
  }

  numberOnChange(e) {
    const value = e.target.value;
    let strArray = value.split("");
    let newValue = "";
    for(let str of strArray) {
      if(str >= "0" && str <= "9") {
        newValue = newValue.concat(str);
      }
    }
    ::this.onChange(null, newValue);
  }

  calculateNum(isAdd) {
    const { value } = this.state;
    let newValue = value ? Number(value) : 0;
    newValue = isAdd ? newValue + 1 : newValue -1;
    this.setState({
      value: newValue
    });
  }

  radioOnClick(newValue) {
    ::this.onChange(null, newValue);
    ::this.onClick(newValue);
  }

  //二级选择的change事件
  dblSelectOnChange(e) {
    this.getSubOptions(e);
    this.onChange(e, [e.target.value, this.refs["dblSelect2"].value]);
  }

  //获取二级选择的下级列表
  getSubOptions(e) {
    const { options } = this.props;
    let selectedIndex = e.target.options.selectedIndex;
    if(selectedIndex == 0) {
      this[`subOptionsCode`] = null;
    } else {
      this[`subOptionsCode`] = options[selectedIndex - 1].subOptions.map((option, i) => {
        return <option value={option.id} key={i}>{option.value}</option>;
      });
    }
    this.refs["dblSelect2"].options.selectedIndex = 0;
  };

  //checkBox的点击事件
  checkBoxClick(checkBoxValue) {
    const { value } = this.state;
    let Ivalue = fromJS(value),
        valueIndex = value.indexOf(checkBoxValue);
    if(valueIndex >= 0) {
      Ivalue = Ivalue.delete(valueIndex);
    } else {
      Ivalue = Ivalue.push(checkBoxValue);
    }
    this.onChange(null, Ivalue.toJS());
  }

  //文件上传的change事件
  fileOnChange(value) {
    ::this.onChange(null, value);
  }

  //日期选择器change事件
  pickDateOnChange(data) {
    const { getPickDate } = this.props;
    ::this.onChange(null, data);
    getPickDate && getPickDate(data);
  }

  //树的change事件
  clickItem(data) {
    const {showTree} = this.state;
    this.onChange(null, data.name);
    if(showTree) {
      ::this.toggleShowTree();
    }
  }

  toggleShowTree() {
    this.setState({
      showTree: !this.state.showTree
    })
  }

  //多级联动change事件
  cascadeSelectChange(data) {
    const { getSelectInfo } = this.props;
    ::this.onChange(null, data.name);
    getSelectInfo && getSelectInfo(data);
  }

  onClick(index) {
    const { onClick } = this.props;
    onClick && onClick(index);
  }

  createFormItem() {
    const { type, className, name, options, defaultValue, placeholder, index, disabled } = this.props,
      { valid, value, touched } = this.state;
    let itemClassName = `${className} ${touched && !valid ? "error" : ""}`;
    let generalProps = {
      type: type,
      name: name,
      className: itemClassName
    };
    if(disabled) {
      generalProps.disabled = "disabled";
    }
    switch (type) {
      case "text": {
        return <input {...generalProps} value={value} onChange={::this.onChange} placeholder={placeholder} onBlur={(e) => this.validate(e, false)} onClick={::this.onClick} />;
      }

      case "number": {
        return (
          <div className="number-box">
            <input {...generalProps} ref="numberInput" type="text" value={value} placeholder={placeholder} onChange={::this.numberOnChange} onBlur={(e) => this.validate(e, false)} onClick={::this.onClick}/>
            <em className="triangle up" onClick={() => this.calculateNum(true)} />
            <em className="triangle down" onClick={() => this.calculateNum(false)} />
          </div>
        )
      }

      case "radio": {
        return (
          <div className="radio-box">
            {
              options.map((option, i) => {
                return (
                  <Radio {...generalProps} checked={option.id === value} defaultChecked={option.id === value} radioOnClick={::this.radioOnClick} index={option.id} value={option.id} title={option.value} key={i} />
                )
              })
            }
          </div>
        )
      }

      case "select": {
        let optionsCode = options.map((option, i) => {
          return <option value={option.id} key={i}>{option.value}</option>;
        });
        return (
          <select  {...generalProps} value={value} onChange={::this.onChange} onClick={::this.onClick}>
            <option value="">请选择</option>
            { optionsCode }
          </select>
        )
      }

      case "dblSelect": {
        let optionsCode = options.map((option, i) => {
          return <option value={option.id} key={i}>{option.value}</option>
        });
        if(!this[`initForDblSelect`]) {
          let defaultIndex = 0;
          for(let i = 0; i < options.length; i++) {
            if(options[i].id == defaultValue[0]) {
              defaultIndex = i;
              break;
            }
          }
          this["subOptionsCode"] = options[defaultIndex].subOptions.map((subOption, i) => {
            return <option value={subOption.id} key={i}>{subOption.value}</option>;
          });
          this["initForDblSelect"] = true;
        }
        return (
          <div className="dblSelect-box">
            <select ref="dblSelect1" {...generalProps} value={value[0]} onChange={::this.dblSelectOnChange} onClick={::this.onClick} >
              <option value="">请选择</option>
              { optionsCode }
            </select>
            <select ref="dblSelect2" {...generalProps} value={value[1]} onChange={(e) => this.onChange(e, [this.refs["dblSelect1"].value, e.target.value])}>
              <option value="">请选择</option>
              { this[`subOptionsCode`] }
            </select>
          </div>
        )
      }

      case "checkbox": {
        let optionsCode = options.map((option, i) => {
          let contentCode,
            checked = value.indexOf(option.id) >= 0;
          if(defaultValue.indexOf(option.id) >= 0) {
            contentCode = <CheckBox {...generalProps} checked={checked} index={index} value={option.id} defaultValue={option.id} title={option.value} defaultChecked
                                    checkBoxOnClick={() => this.checkBoxClick(option.id)} key={i} />;
          } else {
            contentCode = <CheckBox {...generalProps} checked={checked} index={index} value={option.id} defaultValue={option.id} title={option.value}
                                    checkBoxOnClick={() => this.checkBoxClick(option.id)} key={i} />
          }
          return contentCode;
        });
        return (
          <div className="checkbox-box clearfix">
            { optionsCode }
          </div>
        )
      }

      case "imageUpload": {
        return (
          <ImageUpload name={name} className={itemClassName} defaultSrc={defaultValue} onChange={::this.fileOnChange} />
        )
      }

      case "textarea": {
        return (
          <textarea {...generalProps} value={value} onChange={::this.onChange} onBlur={(e) => this.validate(e, false)} onClick={::this.onClick} />
        )
      }

      case "datePicker": {
        const { data } = this.props;
        let Idata = fromJS(data);
        Idata = Idata.set("calendarWrapClassName", `${data.calendarWrapClassName || ""} ${touched && !valid ? "error" : ""}`);
        return (
          <DatePicker data={Idata.toJS()} getPickDate={::this.pickDateOnChange} {...generalProps} className={className}/>
        )
      }

      case "tree": {
        const { treeData } = this.props,
          { showTree } = this.state;
        return (
          <div className="tree-wrap">
            <input {...generalProps} type="text" value={value} readOnly onClick={::this.toggleShowTree}/>
            <span onClick={() => this.clickItem("")} className="clear-tree">清除</span>
            {
              showTree && treeData &&
              <div className="tree-component">
                <Tree data={treeData} clickItem={::this.clickItem}/>
              </div>
            }
          </div>
        )
      }

      case "cascadeSelect": {
        const { data, CascadeSelectClassName } = this.props;
        return (
          <CascadeSelect data={data} getSelectInfo={::this.cascadeSelectChange} fieldsClassName={CascadeSelectClassName}/>
        )
      }
    }
  }

  componentDidMount() {
    this.validate(null, true);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
      this.validate(null, false, nextProps.value);
    }
  }

  render() {
    const { title, type, rules, requireError, itemClass, desc } = this.props,
      { value, valid, error, touched } = this.state;
    return (
      <div className={`FormItem clearfix ${type}-item ${itemClass}`} data-value={value} data-valid={valid} data-error={error}>
        <span className={`subtitle ${rules.required ? "required" : ""}`}>{title}</span>
        <span className="desc right">{desc}</span>
        { this.createFormItem() }
        { requireError && !valid && touched && <span className="error-detail">{error}</span> }
      </div>
    )
  }
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.string,
  itemClass: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
  tips: PropTypes.object,
  requireError: PropTypes.bool,
  options: PropTypes.array,
  rules: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default FormItem;