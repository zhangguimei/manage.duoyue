import {ADD_MY_IMAGES, DELETE_IMAGES_ITEM, CLEAR_ALL_IMAGES, ADD_EDIT_CONTENT} from '../constants/editorconstants';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
  myImages: [],
  editPanelContent: []
});

const actionFunc = {
  [ADD_MY_IMAGES]: (state, action) => state.update('myImages', v => v.merge(action.images)),
  [DELETE_IMAGES_ITEM]: (state, action) => state.update('myImages', v => v.filter( l => l.get("id") != action.id)),
  [CLEAR_ALL_IMAGES]: (state, action) => state.update('myImages', v => fromJS([])),
  [ADD_EDIT_CONTENT]: (state, action) => state.update('editPanelContent', v => v.concat([action.component]))
};

export default createReducer(initialState, actionFunc);