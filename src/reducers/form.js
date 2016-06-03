import {reducer as formReducer } from 'redux-form';

const form = formReducer.normalize({
  article: {
    range: value => Number(value) || "0"
  }
});

export default form;