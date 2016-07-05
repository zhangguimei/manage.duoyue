"use strict";
import { isUrl, require } from 'UtilsFolder/validations';

const RecommendValidate = (values) => {
  const errors = {};
  if(!values.position || values.position == "0") {
    errors.position = "该项不能为空";
  }
  return errors;
};

export default RecommendValidate;