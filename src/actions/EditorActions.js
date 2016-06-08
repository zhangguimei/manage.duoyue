import {ADD_MY_IMAGES, DELETE_IMAGES_ITEM, CLEAR_ALL_IMAGES, ADD_EDIT_CONTENT,
        HIDE_ALL_EDIT_MENU, SHOW_EDIT_MENU} from '../constants/editorconstants';

//My Music

//add images
export const addMyImages = (data) => {
  let images = require('../assets/MockData/editor/images.json');
  return {
    type: ADD_MY_IMAGES,
    images
  }
};

//deleteitems
export const deleteItem = (id) => {
  return {
    type: DELETE_IMAGES_ITEM,
    id
  }
};

//clear all images
export const clearImages = () => {
  return {
    type: CLEAR_ALL_IMAGES
  }
};

//SystemTemplet

//add edit content
export const addEditContent = (component) => {
  return {
    type: ADD_EDIT_CONTENT,
    component
  };
};

export const hideAllEditMenu = () => {
  return {
    type: HIDE_ALL_EDIT_MENU
  };
};

export const showEditMenu = (name) => {
  return {
    type: SHOW_EDIT_MENU,
    name
  };
};