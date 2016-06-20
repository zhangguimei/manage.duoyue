import React from 'react';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from '../UIComponent/Modals/Modal';
import ShowPage from '../UIComponent/Modals/ShowPage';
import Tree from '../UIComponent/Tree/Tree';
import * as ArticleActions from '../../actions/ArticleActions';
import styles from './ModifyArticle.scss';

const tagData = require('../../assets/MockData/sourcecenter/article_tags_data.json');
class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      seletedList: [],
      addItem: {},
      selectedId: '',
      display: false
    }
  }

  componentDidMount() {
    this.props.ArticleActions.fetchTagsArrData();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      addItem: {}
    });
  }

  clickItem(data) {
    let parentName = this.getNameFromID(tagData, data.parentId);
    let newData = fromJS(data);
    newData.attr = data.attr;
    newData = newData.set('parentName', parentName);
    let flag = false;
    if (data.data != undefined && data.data.length > 0) {
      flag = true;
    }
    this.setState({
      addItem: newData.toJS(),
      display: flag
    });
  }

  deleteFun(id) {
    const {seletedList} = this.state;
    let IseletedList = fromJS(seletedList);
    let index;
    for (let i = 0; i < seletedList.length; i++) {
      if (seletedList[i].id == id) {
        index = i;
        break;
      }
    }
    IseletedList = IseletedList.splice(index, 1);
    this.setState({
      seletedList: IseletedList.toJS(),
      selectedId: id
    });
  }

  AddTagFun() {
    const {addItem, seletedList, showModal} = this.state;
    let IaddItem = fromJS(addItem);
    for (let i = 0; i < seletedList.length; i++) {
      let item = seletedList[i];
      if (item.id == addItem.id) {
        seletedList.splice(i, 1);
        break;
      }
    }
    let parentName = this.getNameFromID(tagData, addItem.parentId) || "";
    IaddItem = IaddItem.set('parentName', parentName);
    let attrs = [];
    addItem.attr != undefined && addItem.attr.length > 0 && addItem.attr.map((item, index) => {
      let title = item.title;
      let key = item.tagName;
      let val = this.refs[key].value;
      let selectedAttrObj = {
        "title": title,
        "tagName": key,
        "value": val
      }
      attrs.push(selectedAttrObj)
    })
    IaddItem = IaddItem.set("selectedAttr", attrs);
    if (IaddItem.get("attr") && IaddItem.get("name")) {
      this.setState({
        seletedList: seletedList.concat(IaddItem.toJS()),
        showModal: !showModal
      });
    }
  }

  modifyTagItem(item) {
    this.setState({
      showModal: !this.state.showModal,
      addItem: item
    });
  }

  getNameFromID(json, id) {
    const data = json;
    if (!data || !data.length) return;
    let stack = [], item;
    for (var i = 0, len = data.length; i < len; i++) {
      stack.push(data[i]);
    }
    while (stack.length) {
      item = stack.shift();
      if (item.id === id) {
        return item.name;
      }
      if (item.data && item.data.length) {
        stack = item.data.concat(stack);
      }
    }
  }

  render() {
    const {showModal, addItem, selectedId} = this.state,
      {seletedList} = this.state;
    let pagedata = {
      title: '选择标签',
      width: '70%',
      height: '90%',
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    let tagItem = seletedList.map((item, index) => {
      return (
        <div className="tagItem" key={index}>
          <div className="tag-title">{item.parentName ? item.parentName + ' - ' : item.parentName}{item.name}</div>
          {
            item.selectedAttr && item.selectedAttr.map((attrone, index) => {
              return (
                <div className="tag-cont" key={index}>{attrone.title}：{attrone.value}</div>
              )
            })
          }
          <div><a href="javascript:;" onClick={() => this.modifyTagItem(item)}>修改{" "}</a> | <a href="javascript:;"
                                                                                                onClick={() =>this.deleteFun(item.id)}>{" "}删除</a>
          </div>
        </div>
      )
    });
    let item = this.state.addItem;
    return (
      <div className="TagsPage">
        {tagItem}
        <div className="clearfix"/>
        <div className="add-tags">
          <a onClick={::this.toggleModal} className="tags-a">【新增标签】</a>
        </div>
        {
          showModal &&
          <Modal>
            <ShowPage {...pagedata} submitChange={() =>this.AddTagFun(selectedId)}>
              <div className="tags-main">
                <Tree data={tagData} clickItem={::this.clickItem}/>
                <form className="idoop_form">
                  {
                    item.id == null &&
                    <div>请选择标签...</div>
                  }
                  {
                    item.id != null && <div>
                      <div className="form-title form-row">
                        <span className="title info">标签名称：</span>
                        <span className="input"
                              ref="title">{item.parentName ? item.parentName + ' - ' : item.parentName}{addItem.name}</span>
                      </div>
                      <div className="form-content form-row">
                        {
                          item.attr != undefined && item.attr.length > 0 && item.attr.map((attrItem, index) => {
                              return (
                                <div className="form-row" key={index}>
                                  <span className="title info">{attrItem.title}：</span>
                                  <select className="aim" ref={attrItem.tagName}>
                                    {
                                      attrItem.options.map((opsItem, index) => {
                                        return (
                                          <option key={index} className="attr-value"
                                                  defaultValue={opsItem.name}>{opsItem.name}</option>
                                        )
                                      })
                                    }
                                  </select>
                                </div>
                              )
                            }
                          )
                        }
                      </div>
                    </div>
                  }
                </form>
                <div className="clear"></div>
              </div>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {tagsArrData} = state.article.toJS();
  return {
    tagsArrData: tagsArrData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ArticleActions: bindActionCreators(ArticleActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);

