'use strict'
import React, {PropTypes} from 'react';
import {Map, is, fromJS} from 'immutable';

import ArticleItem from './ArticleItem';

class ArticleContent extends React.Component {

  static defaultProps = {
    pageIndex: 0
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.startIndex = 0;
    if (this.props.itemsForOnePage) {
      this.endIndex = this.props.itemsForOnePage;
    }
    this.headKeyList = [];
  }

  componentWillMount() {
    let {data, pageIndex, itemsForOnePage} = this.props;
    this.contentDataForShow = (pageIndex && itemsForOnePage)
      ? data.slice(this.startIndex, this.endIndex)
      : data;
  }

  componentWillReceiveProps(nextProps) {
    let {pageIndex, itemsForOnePage} = nextProps;
    //翻页
    if (pageIndex) {
      if ((this.props.pageIndex != pageIndex) || this.contentDataForShow.length < 1) {
        this.startIndex = (pageIndex - 1) * itemsForOnePage;
        this.endIndex = pageIndex * itemsForOnePage;
        this.contentDataForShow = nextProps.data.slice(this.startIndex, this.endIndex);
      }
    } else if (!pageIndex) {
      this.contentDataForShow = nextProps.data;
    }
  }

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {},
      thisState = this.state || {};
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }
    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  componentWillUnmount() {
    this.contentDataForShow = null;
  }

  onDelete(id) {
    let {data, pageIndex, itemsForOnePage} = this.props;
    let index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        index = i;
        break;
      }
    }
    data.splice(index, 1);
    this.contentDataForShow = (pageIndex && itemsForOnePage)
      ? data.slice(this.startIndex, this.endIndex)
      : data;
    this.forceUpdate();
  }

  render() {
    const {contentDataForShow} = this;
    let contentCodes = contentDataForShow.map((item, index) => {
      return <ArticleItem data={item} key={index} onDelete={::this.onDelete}/>
    })
    return (
      <div className="ArticleContent clearfix">
        { contentCodes }
      </div>
    )
  }
}

ArticleContent.propTypes = {
  data:PropTypes.array
}

export default ArticleContent;
