'use strict';
import React, {PropTypes} from 'react';
import Tab from 'UIComponentFolder/Tab/Tab';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import BasicInfo from './BasicInfo';
import Source from './Source';
import Recommend from './Recommend';
import Tag from 'PageComponentFolder/Tag/Tag'
import QRcode from 'PageComponentFolder/QRcode/QRcode';
import Account from './Account';
import TablePage from 'PageComponentFolder/TablePage/TablePage'
import styles from './ArticleSearch.scss';

const tagData = require("AssetsFolder/MockData/book/book_tag_data.json"),
  navData = [{'info': '基本信息'}, {'source': '资源'}, {'tag': '标签'}, {'maxCard': '二维码'}, {'Cookies': '浏览记录'}, {'account': '分账设置'}, {'recommend': '相关推荐'}],
  qrcodeData = require("AssetsFolder/MockData/article/code_data.json"),
  historyData = require('AssetsFolder/MockData/article/cookies_data.json');
const tabContent = navData.map((item) => {
  return Object.values(item)[0]
});

const TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active",
    tabItemDefault: ""
  }
};
class ArticleModify extends React.Component {
  constructor(props) {
    super(props);
    this.type = 0; //记录当前资源类型
    const {index, showModal} = this.props;
    this.changed = true; //判断是否资源类型发生变化
    this.state = {
      index: index,
      showModel: showModal
    };
  }

  toggleModal(id, data) {
    const {showModal} = this.state,
      {fetchArticleData} = this.props;
    if (!showModal && id != undefined) {
      fetchArticleData && fetchArticleData(id);
    }
    this.setState({
      showModal: !this.state.showModal,
      list: data
    });
    this.props.toggleClick(this.state.showModal);
  }

  onTypeChange(index) {
    this.setState({
      index: index
    });
  }

  render() {
    const {data} =this.props, {index} = this.state;
    let pagedata = {
      title: "修改文章内容",
      width: '90%',
      height: '95%',
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    return (
      <div className="ArticleModify">
        <Modal onModalClick={::this.toggleModal}>
          <ShowPage {...pagedata}>
            <div className="top common-hd">
              <div className="pic">
                <img src={data.src} title={data.title} alt={data.title}/>
              </div>
              <div className="title-time">
                <div className="title">{data.title}</div>
                <div className="time">{data.updateTime}</div>
              </div>
              <ul className="info">
                <li>
                  <h5>{data.scan}</h5>
                  <p>浏览</p>
                </li>
                <li>
                  <h5>{data.maxCard}</h5>
                  <p>扫一扫</p>
                </li>
                <li>
                  <h5>{data.collect}</h5>
                  <p>收藏</p>
                </li>
                <li>
                  <h5>{data.comment}</h5>
                  <p>评论</p>
                </li>
              </ul>
            </div>
            <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
            { index == 0 && <BasicInfo data={data}/>}
            { index == 1 && <Source/>}
            { index == 2 && <Tag tagData={tagData}/>}
            { index == 3 && <QRcode data={qrcodeData}/>}
            { index == 4 && <TablePage data={historyData}/>}
            { index == 6 && <Recommend/>}
            { index == 5 && <Account/>}
          </ShowPage>
        </Modal>
      </div>
    )
  }
}

ArticleModify.PropTypes = {
  data: PropTypes.array.isRequired,
  TabItemsData: PropTypes.array.isRequired,
  onTypeChange: PropTypes.func.isRequired
}

export default ArticleModify;
