"use strict";
/*
 *  Date    : 2016.06.28
 *  Author  : CastileMan
 *  Declare : 获取验证表单中所有表单的值，报错，和合法信息
 *
 * examples:
 * 获取报错信息：let errors = getFormErrors(yourFormNode);
 * 获取第一个报错信息： errors.error
 * 同理，获取整个表单是否合法： valid.form
 * */
import { fromJS } from 'immutable';

const getFormStatus = (formNode, attr) => {
  let attrs = {};
  let itemNodes = formNode.querySelectorAll(".FormItem");
  for(let i = 0; i < itemNodes.length; i++) {
    attrs[i] = itemNodes[i].getAttribute(`data-${attr}`);
  }
  return attrs;
};

export const getFormValues = (formNode) => {
  return getFormStatus(formNode, 'value');
};

export const getFormErrors = (formNode) => {
  let errors = getFormStatus(formNode, 'error');
  errors.error = getFirstError(errors);
  return errors;
};

export const getFormValid = (formNode) => {
  let valid = getFormStatus(formNode, 'valid');
  valid.form = checkValid(valid);
  return valid;
};

const getFirstError = (errors) => {
  for(let key in errors) {
    if(errors[key]) {
      return errors[key];
    }
  }
  return "";
};

const checkValid = (valid) => {
  for(let key in valid) {
    if(valid[key] == "false") {
      return false;
    }
  }
  return true;
};