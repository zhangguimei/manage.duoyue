export const animations = (ele, animates) => {
  window.animationTimer && window.clearTimeout(window.animationTimer);
  if (!ele)return;
  let originClass = ele.className || '';

  if (originClass.search('animated') > -1) {
    let cutindex = originClass.indexOf('animated'),
      pureClass = originClass.slice(0, cutindex);
    ele.className = pureClass;
    window.animationTimer = setTimeout(function(){
      ele.className = originClass;
    }, 0);
    return;
  }

  ele.className = `${originClass} animated ${animates}`;
  ele.addEventListener('animationend', function animfoo() {
    ele.className = originClass;
    ele.removeEventListener('animationend', animfoo);
  })
};