'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchArticleData} from 'ActionsFolder/ArticleActions';
import ArticleModify from './ArticleModify';

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      list: [],
      index: 0
    }
  }

  toggleModal(id, data) {
    const {showModal} = this.state,
      {fetchArticleData} = this.props;
    if (!showModal && id != undefined) {
      fetchArticleData && fetchArticleData(id);
    }
    this.setState({
      showModal: !showModal,
      list: data
    });
  }

  toggleClick(state) {
    this.setState({
      showModal: state
    });
  }

  onClickFun(id) {
    if (confirm("确定要删除吗？")) {
      this.props.onDelete(id)
    }
  }

  render() {
    const {data} = this.props;
    const {showModal, list, index} = this.state;
    return (
      <div className="ArticleItem">
        <div>
          <a href="javascript:;"><h1 className="source-title">{data.title}</h1></a>
          <div className="source-content">
            <div className="pic">
              <img className="img" src={data.src} alt={data.title} title={data.title}/>
            </div>
            <div className="publish-desc">
              <div className="publish">{data.publish}，浏览：{data.opensize}</div>
              <div className="de">{data.desc}</div>
            </div>
          </div>
        </div>
        <div className="source-bottom">
          <div className="deal">
            <div className="fl status">已审核</div>
            <div className="fl"><a href="javascript:;" onClick={() => this.toggleModal(data.id, data)}>修改</a></div>
            <div className="fl delet"><a className="delet" onClick={this.onClickFun.bind(this, data.id)}>删除</a></div>
            {
              showModal &&
              <ArticleModify data={list} index={index} showModal={showModal} toggleClick={()=>{
          this.toggleClick()}}/>
            }
            <div className="clear"/>
          </div>
          <div className="code">
            <a href="javascript:;">{data.code}（{data.num}）</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleData: bindActionCreators(fetchArticleData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleItem);
