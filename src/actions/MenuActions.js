'use strict';
import {CHANGE_MENU_ROUTE, CHOOSED_TREE_LEAVES} from '../constants/constants';

export const changeRoute  = (route) => {
  return {
    type: CHANGE_MENU_ROUTE,
    route
  }
};

export const chooseTreeLeaves  = (id, allchoose) => {
  return {
    type: CHOOSED_TREE_LEAVES,
    id,
    allchoose
  }
};