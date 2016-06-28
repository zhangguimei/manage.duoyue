"use strict";
import { require } from 'Utils/validations';

const Validate = (values) => {
  const errors = {};
  require(values, errors, ["parentMenu", "article"]);
  return errors;
};

export default Validate;