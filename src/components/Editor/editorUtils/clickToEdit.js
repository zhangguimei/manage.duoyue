"use strict";

const onClick = (e) => {
  console.log("click");
  const node = e.target;
  node.contentEditable = true;
  node.click();
};

const onBlur = (e) => {
  console.log("blur");
  const node = e.target;
  node.contentEditable = false;
};

const onMouseOver = (e) => {
  const node = e.target;
  node.style.border = "1px dashed #00AEE8";
};

const onMouseOut = (e) => {
  const node = e.target;
  node.style.border = "1px dashed #fff";
};

export const clickToEdit = (editNode) => {
  editNode.addEventListener("click", onClick, false);
  editNode.addEventListener("blur", onBlur, false);
  editNode.addEventListener("mouseover", onMouseOver, false);
  editNode.addEventListener("mouseout", onMouseOut, false);
};

export const removeClickToEdit = (editNode) => {
  editNode.removeEventListener("click", onClick, false);
  editNode.removeEventListener("blur", onBlur, false);
  editNode.removeEventListener("mouseover", onMouseOver, false);
  editNode.removeEventListener("mouseout", onMouseOut, false);

};