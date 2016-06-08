"use strict";
/*
* moveNode:         需要移动的节点
* dragNode:         添加drag事件的节点，默认与moveNode相同
* */

let nodeForMove, startX, startY, xPos, yPos;

const onMouseDown = (e) => {
  startX = e.pageX;
  startY = e.pageY;
  xPos = nodeForMove.getBoundingClientRect().left + document.body.scrollLeft + document.documentElement.scrollLeft;
  yPos = nodeForMove.getBoundingClientRect().top + document.body.scrollTop + document.documentElement.scrollTop;
};

const onMouseMove = (e) => {
  let moveX = (e.pageX) ? (e.pageX - startX) : 0,
    moveY = (e.pageY) ? (e.pageY - startY) : 0;
  nodeForMove.style.left = parseInt(xPos, 10) + moveX + "px";
  nodeForMove.style.top = parseInt(yPos, 10) + moveY + "px";
};

const onMouseUp = () => {
  startX = null;
  startY = null;
  xPos = null;
  yPos = null;
};

export const nodeDraggable = (moveNode, dragNode = moveNode) => {
  dragNode.style.cursor = "move";
  moveNode.style.margin = 0;
  nodeForMove = moveNode;
  dragNode.addEventListener("mousedown", onMouseDown, false);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("mouseup", onMouseUp, false);
};

export const removeDraggable = (moveNode, dragNode = moveNode) => {
  dragNode.addEventListener("mousedown", onMouseDown, false);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("mouseup", onMouseUp, false);
};