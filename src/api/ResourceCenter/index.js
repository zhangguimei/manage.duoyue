/*
 * Created on 2016-06-29 11:28
 *
 * By Susan Su
 */

'use strict';

import { ResourceCenter } from '../axiosServices';

const ROOT = 'resource';

export default  {
  //1.获取资源页资源列表
  findResByType: (data) => {
    console.log(data);
    return ResourceCenter('get', ROOT, 'findResByType', data);  //http://localhost:8058/usercenter/user/doLogin
  }
}