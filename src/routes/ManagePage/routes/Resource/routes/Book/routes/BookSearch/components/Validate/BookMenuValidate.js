"use strict";
import {require} from 'UtilsFolder/formValidations';

const Validate = (values) => {
  const errors = {};
  require(values, errors, ["parentMenu", "name"]);
  return errors;
};

export default Validate;