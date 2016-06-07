'use strict';
import React from 'react';

class ImagesItem extends React.Component {

  deleteItem(e) {
    e.stopPropagation();
    const {data: {id}, deleteItem} = this.props;
    deleteItem && deleteItem(id);
  }

  render() {
    const {data: {title, url}} = this.props;
    return (
      <li className="ImagesItem">
        <div className="image-box">
          <i className="ic ic-delete delete-item" onClick={::this.deleteItem}/>
          <img src={url} title="点击图片可以直接添加到模板编辑区域" alt={title}/>
        </div>
        <span >{title}</span>
      </li>
    );
  }
}

export default ImagesItem;