import React from 'react';

class ArticleTop extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="top">
        <div className="pic">
          <img src={data.src} title={data.title} alt={data.title}/>
        </div>
        <div className="title-time">
          <div className="title">{data.title}</div>
          <div className="time">{data.updateTime}</div>
        </div>
        <div className="fr">
          <div className="scan article-fl">
            <div className="">{data.scan}</div>
            <div className="explain">浏览</div>
          </div>
          <div className="maxCard article-fl">
            <div>{data.maxCard}</div>
            <div className="explain">扫一扫</div>
          </div>
          <div className="collect article-fl">
            <div>{data.collect}</div>
            <div className="explain">收藏</div>
          </div>
          <div className="comment article-fl">
            <div>{data.comment}</div>
            <div className="explain">评论</div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

export default ArticleTop;
