/*
 *  Project : MatchList Page In Match
 *  Date    : 2016.6.30
 *  Author  : Zhou Xian
 *  Declare : Match Modify Index
 */
'use strict';
import React, {PropTypes} from 'react';

import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Modal from 'UIComponentFolder/Modals/Modal';
import Tab from 'UIComponentFolder/Tab/Tab';
import Tag from 'PageComponentFolder/Tag/Tag';
import QRcode from 'PageComponentFolder/QRcode/QRcode';
import HeaderInfo from 'PageComponentFolder/HeaderInfo/HeaderInfo';

import Config from './OptionsConfig';
import Register from './RegisterList';
import EntryLink from './EntryLink';
import BasicInfo from './BasicInfo';

const matchInfo = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_info.json"),
  matchRegisterTable = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_register_table.json"),
  matchConfigTable = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_config_table.json"),
  tagData = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_tag_data.json"),
  codeData = require("AssetsFolder/MockData/sourcecenter/code_data.json"),
  treeData = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_tree_data.json").menu,
  tabContent = require("AssetsFolder/MockData/sourcecenter/match/matchlist/match_showpage_tab.json");

const tabValue = tabContent.map((item) => {
  return Object.values(item)[0]
});

let TabItemsData = {
  content: tabValue,
  tabClass: {
    tabBox: "tab-nav",
    tabItemOn: "active"
  }
};

const headerData = {
  "name": "周杰伦2016地表最强世界巡回演唱会",
  "scan": 10,
  "browse": 10,
  "signUp": 100
};

class MatchListModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: this.props.tabIndex
    };
    this.showPageData = {};
  }

  onTypeChange(index) {
    this.createShowPageData(index);
    this.setState({
      tabIndex: index
    });
  }

  createShowPageData(idx) {
    let data = {
      title: tabValue[idx] || "",
      newPageHref: '',
      closeShowPage: this.props.toggleLayer,
      submitForm: this.submitChange
    };
    const {toggleLayer} = this.props;
    data.title = "周杰伦2016地表最强世界巡回演唱会-" + data.title;
    switch (idx) {
      case 0:
      case 2:
      case 3:
      case 4:
        data.ftChildren = <div><span className="cancel-btn btn" onClick={toggleLayer}>返回关闭</span></div>;
        break;
      case 1:
        data.ftChildren =
          <div className="btn-wrap"><span className="submit-btn btn" onClick={::this.submitForm}>确定修改</span><span
            className="cancel-btn btn" onClick={toggleLayer}>返回关闭</span></div>;
        break;
      default:
        data.showFooter = false;
        break;
    }
    this.showPageData = data;
  }

  submitChange() {
    this.props.toggleLayer();
  }

  submitForm(values) {
    return new Promise((resolve) => {
      resolve(values);
      this.props.toggleLayer();
    });
  }

  render() {
    const {tabIndex} = this.state,
      {toggleLayer} = this.props,
      {showPageData} = this;
    return (
      <Modal onModalClick={toggleLayer}>
        <ShowPage {...showPageData}>
          <HeaderInfo data={headerData}/>
          <Tab TabItemsData={TabItemsData} typeIndex={tabIndex} onTypeChange={::this.onTypeChange}/>
          {
            tabIndex == 0 &&
            <EntryLink matchInfo={matchInfo}/>
          }
          {
            tabIndex == 1 &&
            <BasicInfo matchInfo={matchInfo} treeData={treeData}/>
          }
          {
            tabIndex == 2 &&
            <Config tableData={matchConfigTable} matchInfo={matchInfo}/>
          }
          {
            tabIndex == 3 &&
            <Tag tagData={tagData}/>
          }
          {
            tabIndex == 4 &&
            <QRcode data={codeData} count={6}/>
          }
          {
            tabIndex == 5 &&
            <Register tableData={matchRegisterTable}/>
          }
        </ShowPage>
      </Modal>
    );
  }
}

MatchListModify.propTypes = {
  toggleLayer: PropTypes.func.isRequired
};

export default MatchListModify;