'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import ImageUpload from 'UIComponentFolder/ImageUpload/ImageUpload';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import Confirm from 'UIComponentFolder/Modals/Confirm';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import style from './CommentPage.scss';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerIndex: -1
    };
    this.deleteId = -1;
  }

  toggleLayer(index) {
    const {layerIndex} = this.state;
    this.setState({
      layerIndex: index == layerIndex ? -1 : index
    });
  }

  replyFunc(id) {
    //回复评论接口
    this.toggleLayer(1);
  }

  deleteItemFunc(id) {
    this.toggleLayer(2);
    this.deleteId = id;
  }

  confirmResult(result) {
    const {deleteId} = this;
    if (result) {
      console.log('删除', deleteId, '成功！');
    }
    this.toggleLayer(2);
  }

  passComment(id) {
    //通过审核接口
  }

  sumbitSearchForm() {
    //搜索接口
  }

  pluginData(data) {
    data.forEach((item)=> {
      item.headImg = <img className="head-pic" src={item.headPic} alt="用户头像"/>;
      item.content = <div className="comment-content-wrap">
        <div className="comment-wrap">
          <p className="text">{item.text}</p>
          {
            item.pic &&
            <div className="img-wrap">
              <img className="img" src={item.pic} alt="评论图"/>
            </div>
          }
          <span className="at-where">@{item.original}</span>
        </div>
        {
          !!item.reply.length &&
          <div className="reply-wrap">
            {
              item.reply.map((item, i)=> {
                return (
                  <div className="reply-item" key={i}>
                    <p className="text">{item.text}</p>
                    <div className="img-wrap">
                      <img className="img" src={item.pic} alt="回复图片"/>
                    </div>
                    <time className="time">{item.replyTime}</time>
                    <button className="delete-btn" onClick={()=>this.deleteItemFunc(item.id)}>删除</button>
                  </div>
                );
              })
            }
          </div>
        }
      </div>;
      item.statusType = <div>{item.status ? <span>已审核</span> : <span className="red">未审核</span>}</div>;
      item.operation = <div className="operation-wrap">
        {
          item.status ? <button className="btn btn-operate" onClick={()=>this.replyFunc(item.id)}>回复</button> :
            <button className="btn btn-operate" onClick={()=>::this.passComment(item.id)}>通过审核</button>
        }
        <button className="btn btn-operate" onClick={()=>this.deleteItemFunc(item.id)}>删除</button>
      </div>;

    });
  }

  componentWillMount() {
    let {data} = this.props;
    this.pluginData(data.contentData)
  }

  render() {
    const {headData, contentData} = this.props.data,
      {layerIndex} = this.state,
      {searchTitle} = this.props;
    return (
      <div className="CommentPage">
        <header className="header search-bar">
          <label htmlFor="search-input">{searchTitle}</label>
          <input name="keyword" id="search-input" type="text" className="form-control w100 ml20 input-sm"/>
          <button className="search-btn btn btn-primary w80 ml10 btn-sm" onClick={::this.sumbitSearchForm}>搜索</button>
        </header>
        <section className="content-wrap">
          <TablePage headData={headData} contentData={contentData} rowsForOnePage={2} fixBottom={true}/>
        </section>
        {
          layerIndex == 1 &&
          <Modal onModalClick={()=>::this.toggleLayer(1)}>
            <ShowPage width="40%" height="60%" title="回复评论" closeShowPage={()=>::this.toggleLayer(1)}>
              <div className="reply-layer-wrap">
                <FormItem type="textarea" name="text" title="回复内容:" rules={{required:true}}
                          className="text-area form-control"/>
                <div className="img-wrap">
                  <span className="required subtitle">回复图片:</span>
                  <ImageUpload name="pic" className="text-area"/>
                </div>
              </div>
            </ShowPage>
          </Modal>
        }
        {
          layerIndex == 2 &&
          <Modal onModalClick={()=>::this.toggleLayer(2)}>
            <Confirm confirmResult={::this.confirmResult} content="确定删除么？"/>
          </Modal>
        }
      </div>
    );
  }
}

CommentPage.propTypes = {
  data: PropTypes.object,
  searchTitle: PropTypes.string
};

export default CommentPage