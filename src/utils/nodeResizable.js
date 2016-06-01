"use strict";
import {is, fromJS} from 'immutable';

/*
* resizableNode:              要调整大小的节点
* requirePercentSize:         是否需要设置百分比宽高，默认值为false
* requireFixed:               是否需要设置position为fixed，默认值为false
* */

const RECOGNIZE_WIDTH = 5;
let initWidth, initHeight, browserWidth, browserHeight,
    rec, left, right, top, bottom, initLeft, initTop, startX, startY,
    borderLeft, borderRight, borderTop, borderBottom,
    direction, thisRequirePercentSize, thisRequireFixed, node;

const reCalculateRec = (node) => {
  rec = node.getBoundingClientRect();
  left = rec.left + document.body.scrollLeft + document.documentElement.scrollLeft + borderLeft;
  right = rec.right + document.body.scrollLeft + document.documentElement.scrollLeft - borderRight;
  top = rec.top + document.body.scrollTop + document.documentElement.scrollTop + borderTop;
  bottom = rec.bottom + document.body.scrollTop + document.documentElement.scrollTop - borderBottom;
};

const reCalculateSize = (node) => {
  initWidth = node.offsetWidth;
  initHeight = node.offsetHeight;
  browserWidth = document.body.clientWidth || document.documentElement.clientWidth;
  browserHeight = document.body.clientHeight || document.documentElement.clientHeight;
  borderLeft = parseInt(getCurProperty(node, "border-left-width"), 10);
  borderRight = parseInt(getCurProperty(node, "border-right-width"), 10);
  borderTop = parseInt(getCurProperty(node, "border-top-width"), 10);
  borderBottom = parseInt(getCurProperty(node, "border-bottom-width"), 10);
};

const getCurProperty = (obj, property) => {
  return obj.currentStyle ? obj.currentStyle[property] : getComputedStyle(obj)[property];
};

const onMouseMove = (e) => {
  let mouseX = e.pageX,
    mouseY = e.pageY,
    moveX,
    moveY;
  if(thisRequireFixed && !is(fromJS(node.getBoundingClientRect()), fromJS(rec))) {
    reCalculateRec(node);
  }
  switch(true) {
    case mouseX >= left - RECOGNIZE_WIDTH && mouseX <= left + RECOGNIZE_WIDTH
    && mouseY >= top - RECOGNIZE_WIDTH && mouseY <= top + RECOGNIZE_WIDTH:
      node.style.cursor = "nw-resize";
      break;

    case mouseX >= right - RECOGNIZE_WIDTH && mouseX <= right + RECOGNIZE_WIDTH
    && top - RECOGNIZE_WIDTH && mouseY <= top + RECOGNIZE_WIDTH:
      node.style.cursor = "ne-resize";
      break;

    case mouseX >= left - RECOGNIZE_WIDTH && mouseX <= left + RECOGNIZE_WIDTH
    && mouseY >= bottom - RECOGNIZE_WIDTH && mouseY <= bottom + RECOGNIZE_WIDTH:
      node.style.cursor = "sw-resize";
      break;

    case mouseX >= right - RECOGNIZE_WIDTH && mouseX <= right + RECOGNIZE_WIDTH
    && mouseY >= bottom - RECOGNIZE_WIDTH && mouseY <= bottom + RECOGNIZE_WIDTH:
      node.style.cursor = "se-resize";
      break;

    case mouseX >= left - RECOGNIZE_WIDTH && mouseX <= left + RECOGNIZE_WIDTH:
      node.style.cursor = "w-resize";
      break;

    case mouseX >= right - RECOGNIZE_WIDTH && mouseX <= right + RECOGNIZE_WIDTH:
      node.style.cursor = "e-resize";
      break;

    case mouseY >= bottom - RECOGNIZE_WIDTH && mouseY <= bottom + RECOGNIZE_WIDTH:
      node.style.cursor = "s-resize";
      break;

    case mouseY >= top - RECOGNIZE_WIDTH && mouseY <= top + RECOGNIZE_WIDTH:
      node.style.cursor = "n-resize";
      break;

    default:
      node.style.cursor = "default";
  }
  if(startX == null || startX == undefined) {
    return;
  }
  moveX = mouseX - startX;
  moveY = mouseY - startY;
  switch (direction) {
    case "NORTHWEST": {
      node.style.width = thisRequirePercentSize ? ((initWidth - moveX) / browserWidth * 100 + "%") : (initWidth - moveX + "px");
      node.style.height = thisRequirePercentSize ? ((initHeight - moveY) / browserHeight * 100 + "%") : (initWidth - moveY + "px");
      if(thisRequireFixed) {
        node.style.left = initLeft + moveX + "px";
        node.style.top = initTop + moveY + "px";
      }
    }
      break;

    case "NORTHEAST": {
      node.style.width = thisRequirePercentSize ? ((initWidth + moveX) / browserWidth * 100 + "%") : (initWidth + moveX + "px");
      node.style.height = thisRequirePercentSize ? ((initHeight - moveY) / browserHeight * 100 + "%") : (initWidth - moveY + "px");
      if(thisRequireFixed) {
        node.style.top = initTop + moveY + "px";
      }
    }
      break;

    case "SOUTHWEST": {
      node.style.height = thisRequirePercentSize ? ((initHeight + moveY) / browserHeight * 100 + "%") : (initWidth + moveY + "px");
      node.style.width = thisRequirePercentSize ? ((initWidth - moveX) / browserWidth * 100 + "%") : (initWidth - moveX + "px");
      if(thisRequireFixed) {
        node.style.left = initLeft + moveX + "px";
      }
    }
      break;

    case "SOUTHEAST": {
      node.style.height = thisRequirePercentSize ? ((initHeight + moveY) / browserHeight * 100 + "%") : (initWidth + moveY + "px");
      node.style.width = thisRequirePercentSize ? ((initWidth + moveX) / browserWidth * 100 + "%") : (initWidth + moveX + "px");
    }
      break;

    case "WEST": {
      node.style.width = thisRequirePercentSize ? ((initWidth - moveX) / browserWidth * 100 + "%") : (initWidth - moveX + "px");
      if(thisRequireFixed) {
        node.style.left = initLeft + moveX + "px";
      }
    }
      break;

    case "EAST": {
      node.style.width = thisRequirePercentSize ? ((initWidth + moveX) / browserWidth * 100 + "%") : (initWidth + moveX + "px");
    }
      break;

    case "NORTH": {
      node.style.height = thisRequirePercentSize ? ((initHeight - moveY) / browserHeight * 100 + "%") : (initWidth - moveY + "px");
      if(thisRequireFixed) {
        node.style.top = initTop + moveY + "px";
      }
    }
      break;

    case "SOUTH": {
      node.style.height = thisRequirePercentSize ? ((initHeight + moveY) / browserHeight * 100 + "%") : (initWidth + moveY + "px");
    }
      break;
  }
};

const onMouseDown = (e) => {
  let mouseX = e.pageX,
    mouseY = e.pageY;
  reCalculateSize(node);
  startX = mouseX;
  startY = mouseY;
  initLeft = left - borderLeft;
  initTop = top - borderTop;
  switch(true) {
    case mouseX >= left - RECOGNIZE_WIDTH && mouseX <= left + RECOGNIZE_WIDTH
    && mouseY >= top - RECOGNIZE_WIDTH && mouseY <= top + RECOGNIZE_WIDTH:
      direction = "NORTHWEST";
      break;

    case mouseX >= right - RECOGNIZE_WIDTH && mouseX <= right + RECOGNIZE_WIDTH
    && top - RECOGNIZE_WIDTH && mouseY <= top + RECOGNIZE_WIDTH:
      direction = "NORTHEAST";
      break;

    case mouseX >= left - RECOGNIZE_WIDTH && mouseX <= left + RECOGNIZE_WIDTH
    && mouseY >= bottom - RECOGNIZE_WIDTH && mouseY <= bottom + RECOGNIZE_WIDTH:
      direction = "SOUTHWEST";
      break;

    case mouseX >= right - RECOGNIZE_WIDTH && mouseX <= right + RECOGNIZE_WIDTH
    && mouseY >= bottom - RECOGNIZE_WIDTH && mouseY <= bottom + RECOGNIZE_WIDTH:
      direction = "SOUTHEAST";
      break;

    case mouseX >= left - RECOGNIZE_WIDTH && mouseX <= left + RECOGNIZE_WIDTH:
      direction = "WEST";
      break;

    case mouseX >= right - RECOGNIZE_WIDTH && mouseX <= right + RECOGNIZE_WIDTH:
      direction = "EAST";
      break;

    case mouseY >= bottom - RECOGNIZE_WIDTH && mouseY <= bottom + RECOGNIZE_WIDTH:
      direction = "SOUTH";
      break;

    case mouseY >= top - RECOGNIZE_WIDTH && mouseY <= top + RECOGNIZE_WIDTH:
      direction = "NORTH";
      break;

    default:
      startX = null;
      startY = null;
      direction = null;
  }
};

const onMouseUp = () => {
  startX = null;
  startY = null;
  direction = null;
};

export const nodeResizable = (resizableNode, requirePercentSize = false, requireFixed = false) => {
  thisRequirePercentSize = requirePercentSize;
  thisRequireFixed = requireFixed;
  node = resizableNode;
  if(requireFixed) {
    node.style.position = "fixed";
  }
  reCalculateSize(node);
  reCalculateRec(node);

  window.addEventListener("mousemove", onMouseMove, false);
  resizableNode.addEventListener("mousedown", onMouseDown, false);
  window.addEventListener("mouseup", onMouseUp, false);
};

export const removeResizable = (resizableNode) => {
  window.removeEventListener("mousemove", onMouseMove, false);
  resizableNode.removeEventListener("mousedown", onMouseDown, false);
  window.removeEventListener("mouseup", onMouseUp, false);
};