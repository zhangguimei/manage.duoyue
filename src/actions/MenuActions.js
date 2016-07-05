'use strict';
import {CHOOSED_TREE_LEAVES} from '../constants/constants';

export const chooseTreeLeaves  = (id, allchoose) => {
  return {
    type: CHOOSED_TREE_LEAVES,
    id,
    allchoose
  }
};