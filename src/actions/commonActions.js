/*
 * Created on 2016-06-29 17:00
 *
 * By Susan Su
 */

'use strict';
import {SHOW_MSG, HIDE_MSG} from '../constants/constants';

export const showMsg = (content,type='error')=>{
  return {
    type: SHOW_MSG,
    message: { content:content,type:type }
  }
}
export const hideMsg = ()=>({type: HIDE_MSG})