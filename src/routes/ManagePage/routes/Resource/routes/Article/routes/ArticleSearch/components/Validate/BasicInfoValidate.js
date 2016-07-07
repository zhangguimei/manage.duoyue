"use strict";
import { isUrl, isInt, require } from 'UtilsFolder/formValidations';

const BasicInfoValidate = (values) => {
  const errors = {};
  if(!values.position || values.position == "0") {
    errors.position = "该项不能为空";
  }
  return errors;
};

export default BasicInfoValidate;