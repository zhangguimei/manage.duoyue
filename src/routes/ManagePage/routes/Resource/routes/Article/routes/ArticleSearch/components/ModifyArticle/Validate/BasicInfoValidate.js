"use strict";
import { isUrl, isInt, require } from '../../../../../../../../../../../utils/formValidations';

const BasicInfoValidate = (values) => {
  const errors = {},
  MAX_LENGTH_NAME = 20, //最长的名字长度
  MAX_TITLE_LENGTH = 50, //最长的标题长度
  illegality = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/g;

  require(values, errors, ['title', 'rank', 'intro', 'category']);

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

  if(values.rank) {
    if(!isInt(values.rank)) {
      errors.rank = "排序值必须是一个整数";
    }
  }

  if (values.title && values.title.length > MAX_TITLE_LENGTH) {
    errors.title = "长度超出限制";
  }

  if(values.link) {
    if(!isUrl(values.link.trim())) {
      errors.link = "链接不合法";
    }
  }
  return errors;
};

export default BasicInfoValidate;