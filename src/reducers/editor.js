import {ADD_MY_IMAGES, DELETE_IMAGES_ITEM, CLEAR_ALL_IMAGES, ADD_EDIT_CONTENT,
        HIDE_ALL_EDIT_MENU, SHOW_EDIT_MENU} from '../constants/editorconstants';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
  myImages: [],
  editPanelContent: [],
  editMenuState: {
    ShowWordsEditMenu: false,
    ShowImageEditMenu: false
  }
});

const actionFunc = {
  [ADD_MY_IMAGES]: (state, action) => state.update('myImages', v => v.merge(action.images)),
  [DELETE_IMAGES_ITEM]: (state, action) => state.update('myImages', v => v.filter( l => l.get("id") != action.id)),
  [CLEAR_ALL_IMAGES]: (state, action) => state.update('myImages', v => fromJS([])),
  [ADD_EDIT_CONTENT]: (state, action) => state.update('editPanelContent', v => v.concat([action.component])),
  [HIDE_ALL_EDIT_MENU]: (state) => state.update('editMenuState', v => v.map(l => false)),
  [SHOW_EDIT_MENU]: (state, action) => state.update('editMenuState', v => v.set(action.name, true))
};

export default createReducer(initialState, actionFunc);