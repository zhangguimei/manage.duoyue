"use strict";
const defaultValue = "---------无--------";
export const normalizeCity = (value, previousValue, allValues, previousAllValues) => {
  if(previousAllValues.province && allValues.province != previousAllValues.province) {
    return defaultValue;
  }
  return value;
};

export const normalizeDistrict = (value, previousValue, allValues, previousAllValues) => {
  if(previousAllValues.province && previousAllValues.city && (allValues.province != previousAllValues.province || allValues.city != previousAllValues.city)) {
    return defaultValue;
  }
  return value;
};

export const normalizeBookNumber = (value, previousValue) => {
  if(!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, ''),
        breakPoints = [3, 4, 8, 12];
  let newValue = [...onlyNums];
  for(let i = 0; i < breakPoints.length; i++) {
    if(breakPoints[i] > onlyNums.length) {
      break;
    }
    newValue.splice(breakPoints[i] + i, 0, "-");
  }
  //退格去"-"
  if(previousValue && value.length < previousValue.length) {
    for(let i = breakPoints.length - 1; i >= 0; i--) {
      if(breakPoints[i] == onlyNums.length) {
        newValue.splice(breakPoints[i] + i, 1);
      }
    }
  }
  newValue = String(newValue).replace(/,/g, "");
  return newValue.slice(0, 17);
};