"use strict";

class Tag {
  constructor(json) {
    this.id = json.id || 0;
    this.parentId = json.parentId || 0;
    this.name = json.name || "";
    this.aim = json.aim || "";
    this.attr = Tag.createAttr(json.attr) || [];
    this.data = Tag.createData(json.data) || [];
  }

  static createData(data) {
    if(!data) { return null; }
    return data.map((item) => {
      return new Tag(item);
    });
  }

  static createAttr(attr) {
    if(!attr) { return null; }
    return attr.map((item) => {
      return new Attr(item);
    });
  }
}

class Attr {
  constructor(json) {
    this.title = json.title || "";
    this.options = json.options || [];
  }
}

export default Tag;