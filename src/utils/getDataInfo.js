//获取title
export const getTitle = (data, route, url) => {
  let getData = data;
  if(route.length === 0) return "Rays";
  for (let i = 0, l = route.length; i < l; i++) {
    if(i != l - 1) {
      getData = getData[parseInt(route[i], 10)].data;
    } else {
      getData = getData[parseInt(route[i], 10)];
    }
  }
  return getData.name;
};

//获取children
export const getChildren = (data, route) => {
  let getData = data;
  if(route.length === 0) return [];
  for (let i = 0, l = route.length; i < l; i++) {
    if(i < l) {
      getData = getData[parseInt(route[i], 10)].data;
    }
  }
  return getData;
};

//给tree_data添加数据
export const parseJson = (data, route) => {
  const data_custom = require("AssetsFolder/MockData/tree_add_data.json");
  if(!data.length) return;
  route += '';
  data.forEach(function(item, i) {
    let temp = route + i + '.';
    item.route = temp.slice(0, temp.length - 1);
    item.url = data_custom[item.id] ? data_custom[item.id].url : '/404';
    item.icon_font = data_custom[item.id] ? data_custom[item.id].icon : '';
    if(item.data) {
      parseJson(item.data, temp);
    }
  });
};

//通过url，匹配路由数组
export const getUrlRoute = (data, url) => {
  if(!data || !data.length) return;
  let stack = [], item;
  for (var i = 0, len = data.length; i < len; i++) {
    stack.push(data[i]);
  }
  while (stack.length) {
    item = stack.shift();
    if(item.url === url) {
      return item.route;
    }
    if(item.data && item.data.length) {
      stack = item.data.concat(stack);
    }
  }
};
