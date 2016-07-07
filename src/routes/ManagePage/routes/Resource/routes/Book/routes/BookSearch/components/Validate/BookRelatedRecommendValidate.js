"use strict";
import {require} from 'UtilsFolder/formValidations';

const Validate = (values) => {
  const errors = {};

  require(values, errors, ["classify", "keyword"]);

  return errors;
};

export default Validate;