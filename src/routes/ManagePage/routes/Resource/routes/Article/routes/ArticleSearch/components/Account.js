'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AccountAdd from './AccountAdd';
import {receiveAccountData} from 'ActionsFolder/ArticleActions';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Table from 'UIComponentFolder/Table/Table';
import styles from './ArticleSearch.scss';

const tableData = require('AssetsFolder/MockData/sourcecenter/article/account_data.json');

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      list: {},
      tableContent: tableData.tableContentData
    };
  }

  addSubmit() {
    this.toggleModal();
  }

  onDelete(id) {
    const {tableContent} = this.state;
    this.setState({
      tableContent: tableContent.filter(v => v.id != id)
    });
  }


  toggleModal(id) {
    const {showModal, tableContent} = this.state,
      {receiveAccountData, data} = this.props;
    if (!showModal && id != undefined) {
      let userData = tableContent.filter((item) => {
        return item.id == id;
      })[0];
      receiveAccountData(userData);
    }
    this.setState({
      showModal: !showModal,
      list: data
    });
  }

  render() {
    const {tableContent, showModal} = this.state;
    let pagedata = {
      title: '管理分账信息',
      width: '50%',
      height: '60%',
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    tableContent.map((item) => {
      item.operation = <div className="clearfix">
        <div className="left modify" onClick={() => this.toggleModal(item)}>修改</div>
        <div className="left">|</div>
        <div className="left delete" onClick={() => this.onDelete(item.id)}>删除</div>
      </div>
    });
    return (
      <div className="Account">
        <a href="javascript:;" onClick={::this.toggleModal}>新增分账用户</a>
        <Table contentData={tableContent} headData={tableData.tableHeadData}/>
        {
          showModal &&
          <Modal>
            <ShowPage {...pagedata} submitChange={::this.addSubmit}>
              <AccountAdd/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

function mapStateToProps() {
  const data = require('AssetsFolder/MockData/sourcecenter/article/account_data.json');
  return {
    data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveAccountData: bindActionCreators(receiveAccountData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);