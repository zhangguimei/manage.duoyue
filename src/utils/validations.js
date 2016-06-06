'use strict';

const isString = (value) => {
  return typeof value === "string";
};

const regs = {
  url: "^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*[^\.\,\)\(\s]$",
  email: "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$",
  phone: "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$",
  int: "^[1-9][0-9]*$"
};

export const require = (values, errors, fieldNames) => {
  let fieldNamesArray = [];
  if(typeof(fieldNames) == "string") {
    fieldNamesArray = [fieldNames];
  } else if(fieldNames instanceof Array) {
    fieldNamesArray = fieldNames;
  }
  for(let fieldName of fieldNamesArray) {
    if(!values[fieldName]) {
      errors[fieldName] = "必填";
    }
  }
};

function validation(reg) {
  return value => {
    if(isString(value)) {
      const regExp = new RegExp(regs[reg]);
      return regExp.test(value);
    }
    return false;
  }
}

//邮箱验证
export const isEmail = (value) => {
  return validation("email")(value);
};

//手机号码验证
export const isPhoneNumber = (value) => {
 return validation("phone")(value);
};

//URL验证
export const isUrl = (value) => {
  return validation("url")(value);
};

//正整数验证
export const isInt = (value) => {
  return validation("int")(value.trim());
};
