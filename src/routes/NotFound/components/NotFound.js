import React from 'react';
import styles from './NotFound.scss';
class NotFound extends React.Component {
  /**
   * 暂时效果，后期可能会抽做函数库方法
   * @param node 平台dom节点
   * @param classnames 变动dom节点class名
   * @param e
   */
  perspective(node, classnames, e) {
    if (!node) return;
    const MULTIPLE = 10;
    let aims = document.getElementsByClassName(classnames);
    let people = aims[3],
      tree = aims[2],
      rain = aims[1],
      moon = aims[0];

    const {left, top, width, height} = node.getBoundingClientRect();
    let centerX = left + width / 2,
      centerY = top + height / 2;
    let offsetX = e.pageX - centerX,
      offsetY = e.pageY - centerY;
    const updateStyle = (params) => {
      const {ele, multiple = 1, x = true, y = false, negative = false} = params;
      let dir = negative ? -1 : 1;
      x && (ele.style.marginLeft = (offsetX * dir) / (MULTIPLE * multiple) + 'px');
      y && (ele.style.marginTop = (offsetY * dir) / (MULTIPLE * multiple) + 'px');
    };

    updateStyle({ele: people, multiple: 1.2, y: true});
    updateStyle({ele: tree, multiple: 4});
    updateStyle({ele: rain, multiple: 7});
    updateStyle({ele: moon, negative: true, y: true});
  }

  render() {
    return (
      <div className="NotFound animated bounceInLeft"
           onMouseMove={(e)=>{::this.perspective(e.target, 'not-found-img', e)}}>
        <div className="not-found">
          <img className="not-found-img" src="http://file.duoyue.me/upload/source/pic/20160608/2016_06_08_205119622.png"
               alt="moon"/>
          <img className="not-found-img" src="http://file.duoyue.me/upload/source/pic/20160608/2016_06_08_211220336.png"
               alt="rain"/>
          <img className="not-found-img" src="http://file.duoyue.me/upload/source/pic/20160608/2016_06_08_210348678.png"
               alt="tree"/>
          <img className="not-found-img" src="http://file.duoyue.me/upload/source/pic/20160608/2016_06_08_205119872.png"
               alt="people"/>
          <img className="not-found-img" src="http://file.duoyue.me/upload/source/pic/20160608/2016_06_08_221727439.png"
               alt="stage"/>
        </div>
      </div>
    )
  }
}

module.exports = NotFound;