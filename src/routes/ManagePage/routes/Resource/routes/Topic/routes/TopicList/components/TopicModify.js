'use strict';
import React from 'react';
import Tag from 'PageComponentFolder/Tag/Tag';
import Tab from 'UIComponentFolder/Tab/Tab';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import TopicInfo from './TopicInfo';
import TopicLink from './TopicLink';
import TopicCover from './TopicCover';
import TopicCont from './TopicCont';
import QRcode from 'PageComponentFolder/QRcode/QRcode';
import styles from './TopicList.scss';

const navData = [{'link': '入口链接'}, {'infor': '基本信息'}, {'cover': '封面图片'}, {'content': '栏目内容'}, {'tag': '标签'}, {'maxCard': '二维码'}];
const tagData = require("AssetsFolder/MockData/sourcecenter/book/book_tag_data.json");
const qrcodeData = require("AssetsFolder/MockData/sourcecenter/article/code_data.json");
const tabContent = navData.map((item) => {
  return Object.values(item)[0]
});

class TopicModify extends React.Component {
  constructor(props) {
    super(props);
    this.type = 0; //记录当前资源类型
    const {index, showModal} = this.props;
    this.state = {
      index: index,
      showModal: showModal
    }
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
    this.props.toggleClick(this.state.showModal);
  }

  onTypeChange(index) {
    this.setState({
      index: index
    })
  }

  render() {
    const {list} = this.props, {index} = this.state;
    const pagedata = {
      title: "修改信息",
      width: '90%',
      height: '95%',
      closeShowPage: ::this.toggleModal
    };
    const TabItemsData = {
      content: tabContent,
      tabClass: {
        tabBox: "tab-nav",
        tabItemOn: "active",
        tabItemDefault: ""
      }
    };
    return (
      <div className="TopicModify">
        <Modal onModalClick={::this.toggleModal}>
          <ShowPage {...pagedata}>
            <header className="TopicTop common-hd">
              <div className="top-title fl">{list.title}</div>
              <ul className="info">
                <li>
                  <h5>{list.scan}</h5>
                  <p>浏览</p>
                </li>
                <li>
                  <h5>{list.code}</h5>
                  <p>扫一扫</p>
                </li>
              </ul>
            </header>
            <Tab TabItemsData={TabItemsData} typeIndex={index} onTypeChange={::this.onTypeChange}/>
            { index == 0 && <TopicLink/>}
            { index == 1 && <TopicInfo data={list}/>}
            { index == 2 && <TopicCover/>}
            { index == 3 && <TopicCont/>}
            { index == 4 && <Tag tagData={tagData}/> }
            { index == 5 && <QRcode data={qrcodeData}/>}
          </ShowPage>
        </Modal>
      </div>
    );
  }
}

export default TopicModify;