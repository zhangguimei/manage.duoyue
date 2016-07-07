'use strict';

export const regs = {
  url: "^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*[^\.\,\)\(\s]$",
  email: "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$",
  mobile: "^1[3|4|5|8][0-9]{9}$",
  idCard: "^\d{15}(\d{2}[A-Za-z0-9])?$",
  currency: "^\d+(\.\d+)?$",
  qq: "^[1-9]\d{4,8}$",
  number: "^[1-9][0-9]*$",
  zip: "^[1-9]\d{5}$",
  double: "^[-\+]?\d+(\.\d+)?$",
  english: "^[A-Za-z]+$",
  chinese: "^[\u0391-\uFFE5]+$",
  unSafe: "^(.{0,5})$|\s",
  date: "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)"
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

export const isString = (value) => {
  return typeof value === "string";
};

//URL验证
export const isUrl = (value) => {
  return validation("url")(value);
};

//邮箱验证
export const isEmail = (value) => {
  return validation("email")(value);
};

//手机号码验证
export const isMobile = (value) => {
  return validation("mobile")(value);
};

//正整数验证
export const isNumber = (value) => {
  return validation("number")(value);
};

//验证必填（可验证数组）
export const requiredValid = (value) => {
  if(typeof(value) == "undefined") {
    return false;
  } else if(typeof(value) == "string") {
    return !!value;
  }else if(Array.isArray(value)) {
    if(value.length === 0) { return false; }
    for(let item of value) {
      if(typeof(item) !== "number" && !item) {
        return false;
      }
    }
  }
  return true;
};

//验证最大长度
export const maxLengthValid = (value, maxLength) => {
  let length;
  if(typeof(value) === "number") {
    length = String(value).length;
  } else if(value instanceof Array || typeof(value) === 'string') {
    length = value.length;
  }
  return maxLength > 0 && length <= maxLength;
};

//验证最小长度
export const minLengthValid = (value, minLength) => {
  let length;
  if(typeof(value) === "number") {
    length = String(value).length;
  } else if(value instanceof Array || typeof(value) === 'string') {
    length = value.length;
  }
  return minLength > 0 && length >= minLength;
};

//验证指定正则
export const patternValid = (value, pattern) => {
  return pattern && new RegExp(pattern).test(value);
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
