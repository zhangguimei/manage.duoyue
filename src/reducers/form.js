import {reducer as formReducer } from 'redux-form';
import * as normalize from '../components/PageTest/ValidationForm/Normalize';
// /components/PageTest/ValidationForm/Normalize
const form = formReducer.normalize({
  article: {
    range: value => Number(value) || "0",
    bookNum: normalize.normalizeBookNumber,
    city: normalize.normalizeCity,
    district: normalize.normalizeDistrict
  },
  bookform: {
    bookNumber: normalize.normalizeBookNumber
  }
});

export default form;