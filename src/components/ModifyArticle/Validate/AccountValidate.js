"use strict";
import { isUrl, require } from '../../../utils/validations';

const AccountValidate = (values) => {
  const errors = {};

  require(values, errors, ['name']);
  
  if(values.startDate && values.endDate) {
    if(new Date(values.startDate) > new Date(values.endDate)) {
      errors.startDate = "起始时间必须早于结束时间";
      errors.endDate = "结束时间必须晚于起始时间";
    }
  }
  return errors;
};

export default AccountValidate;