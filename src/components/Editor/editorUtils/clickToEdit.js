"use strict";

const onClick = (e) => {
  const node = e.target;
  node.contentEditable = true;
  node.focus();
};

const onBlur = (e) => {
  const node = e.target;
  node.contentEditable = false;
  node.style.cursor = "move";
};

const onFocus = (e) => {
  const node = e.target;
  node.style.cursor = "text";
};

export const clickToEdit = (editNode) => {
  editNode.addEventListener("click", onClick, false);
  editNode.addEventListener("blur", onBlur, false);
  editNode.addEventListener("focus", onFocus, false);
};

export const removeClickToEdit = (editNode) => {
  editNode.removeEventListener("click", onClick, false);
  editNode.removeEventListener("blur", onBlur, false);
  editNode.removeEventListener("focus", onFocus, false);
};