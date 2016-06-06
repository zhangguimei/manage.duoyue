'use strict';
import {isUrl, isInt, require} from '../../../utils/validations';

const validation = (values) => {
  const errors = {},
    MAX_LENGTH_NAME = 20, //最长的名字长度
    MAX_TITLE_LENGTH = 50, //最长的标题长度
    illegality = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/g,
    defautAddressValue = "---------无--------";

  require(values, errors, ["tree", "classify", "bookNum", "title", "bookNum"]);

  if(!values.position || values.position == "0") {
    errors.position = "该项不能为空";
  }

  if(values.author) {
    if(!illegality.test(values.author)) {
      errors.author = "含有非法字符";
    } else if(values.author.length > MAX_LENGTH_NAME) {
      errors.author = "名字超出长度";
    }
  }

  if(values.province == defautAddressValue || values.province == "") {
    errors.province = "该项不能为空";
  }

  if(values.city == defautAddressValue || values.city == "") {
    errors.city = "该项不能为空";
  }

  if(values.district == defautAddressValue || values.district == "") {
    if(!['北京', '上海', '重庆', '天津'].includes(values.province)) {
      errors.district = "该项不能为空";
    }
  }

  if(values.order) {
    if(!isInt(values.order)) {
      errors.order = "排序值必须是一个整数";
    }
  }

  if (values.title && values.title.length > MAX_TITLE_LENGTH) {
    errors.title = "长度超出限制";
  }

  if(values.url) {
    if(!isUrl(values.url)) {
      errors.url = "链接不合法";
    }
  }

  return errors;
};

export default validation;