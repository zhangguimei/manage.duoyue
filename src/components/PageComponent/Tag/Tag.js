/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 标签页
 */
'use strict';
import React, {PropTypes} from 'react';
import {fromJS} from 'immutable';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage'
import Tree from 'UIComponentFolder/Tree/Tree';
import Dropdown from 'UIComponentFolder/Dropdown/Dropdown';
import styles from './Tag.scss';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTagLayer: false,
      selectedTagArr: [],
      isModify: false
    };
    this.updadeDropdown = null;
  }

  toggleModal() {
    this.setState({
      tagName: "",
      showAddTagLayer: !this.state.showAddTagLayer
    });
  }

  modifyTagModal(data) {
    this.setState({
      tagName: data.name,
      showAddTagLayer: !this.state.showAddTagLayer,
      isModify: true
    });
  }

  componentDidMount() {
    const {tagData} = this.props;
    this.setState({
      selectedTagArr: tagData.tagTreeData.filter(v => v.selected)
    });
  }

  updateArr(arr, data) {
    let tempArr = fromJS(arr).toJS();
    ((tempArr.some((item, i)=> {
      return item.id === data.id
    })) !== false) ?
      tempArr.forEach(function (item, i) {
        if (item.id === data.id) {
          tempArr[i] = data;
        }
      }) :
      tempArr.push(data);
    return tempArr;
  }

  clickItem(data) {
    const {tagData} = this.props,
      {selectItem={}} = this.state;
    let parentData = tagData.tagTreeData.filter(v => v.id == data.parentId);
    let name = data.parentId == 0 ? data.name : parentData[0].name + "-" + data.name;
    this.setState({
      selectItem: data,
      tagName: name,
      tagPurpose: '不限'
    });
    if (selectItem.id !== data.id) {
      this.updadeDropdown();
    }

  }

  deleteTagItem(id) {
    const {selectedTagArr} = this.state;
    this.setState({
      selectedTagArr: selectedTagArr.filter(v => v.id != id)
    });
  }

  getUpdate(foo) {
    this.updadeDropdown = foo;
  }

  submitChange(data) {
    const {tagData} = this.props;
    const {selectedTagArr, isModify} = this.state;
    let parentData = tagData.tagTreeData.filter(v => v.id == data.parentId);
    let name = data.parentId == 0 ? data.name : parentData[0].name + "-" + data.name;
    let readPurpose = document.querySelector(".single-select").innerHTML;

    let tempData = {
      id: data.id,
      name: name,
      readPurpose: readPurpose
    }
    let selectedIdArr = selectedTagArr.map((item, i) => {
      return item.id
    })

    let tempArr = this.updateArr(selectedTagArr, tempData);

    this.setState({
      selectedTagArr: tempArr,
      showAddTagLayer: !this.state.showAddTagLayer
    });
  }

  render() {
    const {showAddTagLayer, selectedTagArr=[], tagName = "", tagPurpose="", selectItem, optionData} = this.state,
      {tagData} = this.props;
    let pagedata = {
      width: "70%",
      height: "90%",
      title: "选择标签",
      closeShowPage: ::this.toggleModal
    };
    return (
      <div className="Tag">
        <ul className="tag-list clearfix">
          {
            selectedTagArr.map((item, i) => {
              return (
                <li className="tag-item left" key={i}>
                  <div className="tag-name">{item.name}</div>
                  { item.readPurpose && <div className="tag-info">通用阅读目的：{item.readPurpose}</div>}
                  <div className="tag-operation">
                    <span className="tag-modify" onClick={() => this.modifyTagModal(item)}>修改</span>
                    <span className="tag-delete" onClick={() => this.deleteTagItem(item.id)}>删除</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="add-tag-box">
          <div className="add-tag-btn" onClick={::this.toggleModal}>【增加标签】</div>
        </div>
        {
          showAddTagLayer &&
          <Modal>
            <ShowPage {...pagedata} submitChange={() => this.submitChange(selectItem)}>
              <div className="select-tag-area clearfix">
                <div className="select-tag-left left">
                  <Tree data={tagData.tagTreeData} clickItem={::this.clickItem}/>
                </div>
                <div className="select-tag-right left">
                  <div className="tag-info clearfix">
                    <div className="tag-info-title left w150">标签名称：</div>
                    <div className="tag-name left">{tagName}</div>
                  </div>
                  <div className="tag-info clearfix">
                    <div className="tag-info-title left w150">通用阅读目的：</div>
                    <Dropdown option={tagData.tagReadPurpose} skin="blue" defaultContent={tagPurpose} exportUpdate={::this.getUpdate}/>
                  </div>
                </div>
              </div>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

/**
 * 暂时静态数据直接调用，后期传参
 * @type {{
 * tagData: *,
 * fetchData: *,
 * selectData: *,
 * submitForm: *,
 * updateParent: *
 * }}
 */
Tag.propTypes = {
  tagData: PropTypes.object,
  fetchData: PropTypes.func,
  selectData: PropTypes.object,
  submitForm: PropTypes.func,
  updateParent: PropTypes.func
};
export default Tag;	
