"use strict";
import { require } from '../../../../utils/validations';

const Validate = (values) => {
  const errors = {};
  require(values, errors, ["parentMenu", "article"]);
  return errors;
};

export default Validate;