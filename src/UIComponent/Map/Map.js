'use strict';
export function openInfo(data, key) {
  let html = '';
  html += '<div class="open-info">';
  html += '<div class="pic">';
  html += '<img src="' + data[key.headimgurl] + '" />';
  html += '</div>';
  html += '<div class="text">';
  html += '<div class="name">' + data[key.nickname] + '</div>';
  html += '<div class="time">' + data[key.location_time] + '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

export function initialMap(id, nav = true) {
  let map = new BMap.Map(id);
  map.centerAndZoom(new BMap.Point(105.000, 38.000), 5);
  map.enableScrollWheelZoom();
  if (nav) {
    const navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // LARGE类型
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      // 启用显示定位
      enableGeolocation: true
    });
    map.addControl(navigationControl);
  }
  return map;
}