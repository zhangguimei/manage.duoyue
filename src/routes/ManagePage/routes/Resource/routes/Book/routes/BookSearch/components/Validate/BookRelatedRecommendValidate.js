"use strict";
import {require} from 'UtilsFolder/validations';

const Validate = (values) => {
  const errors = {};

  require(values, errors, ["classify", "keyword"]);

  return errors;
};

export default Validate;