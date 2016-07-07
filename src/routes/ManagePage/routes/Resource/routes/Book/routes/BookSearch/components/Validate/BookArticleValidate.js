"use strict";
import { require } from 'UtilsFolder/formValidations';

const Validate = (values) => {
  const errors = {};
  require(values, errors, ["parentMenu", "article"]);
  return errors;
};

export default Validate;