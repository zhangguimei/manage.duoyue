/*
*  data: 要匹配的数据,
*  compare: 要比较的属性,
*  value: 要比较属性的值
*  property: 要取得的属性值，没有，则默认返回匹配项
*/
export const compareData = (data, compare, value,  propety) => {
  if(!data || !data.length) return null;
  let stack = [], item;
  for (let i = 0, len = data.length; i < len; i++) {
    stack.push(data[i]);
  }
  while (stack.length) {
    item = stack.shift();
    if(item[compare] === value) {
      return propety ? item[propety] : item;
    }
    if(item.children && item.children.length) {
      stack = item.children.concat(stack);
    }
  }
  return null;
};

//得到当前的menu的主Index
export const getMainIndex = (data, path) => {
  return data.reduce((acc, item, index) =>
    item.accessPath == `/${path.slice(1).split("/")[0]}` ? index : acc, 0);
};
