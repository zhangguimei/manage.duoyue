/*
 *  Date    : 2016.6.28
 *  Author  : Han-Shuangli
 *  Declare : 分账页面
 */
'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import AssignMoneyModal from './AssignMoneyModal';
import TablePage from 'PageComponentFolder/TablePage/TablePage';
import styles from './AssignMoney.scss';

class AssignMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModifyModal: false,
      contentData: [],
      modifyData: {},
      title: "新增"
    };
  }

  modifyContent(id, i) {
    const {contentData} = this.state;
    if (i == true) {
      this.setState({title: "修改"})
    }
    else {
      this.setState({title: "新增"})
    }
    this.setState({
      showModifyModal: !this.state.showModifyModal,
      modifyData: contentData.filter(v => v.id == id)
    })
  }

  deleteOperation(id) {
    const {contentData} = this.state;
    this.setState({
      contentData: contentData.filter(v => v.id != id)
    });
  }

  componentDidMount() {
    const {data} = this.props;
    this.setState({
      contentData: data.contentData
    });
  }

  render() {
    const {data} = this.props,
      {showModifyModal, contentData} = this.state;
    data.contentData.map((item, i) => {
      item.operation = <div className="ProductOperation clearfix">
        <div className="modify left" onClick={() => this.modifyContent(item.id,true)}>修改</div>
        <div className="order-font left">|</div>
        <div className="delete left" onClick={() => this.deleteOperation(item.id)}>删除</div>
      </div>
    });
    let pagedata = {
      width: "50%",
      closeShowPage: ::this.modifyContent
    };
    let title = this.state.title + "分账商户信息";
    return (
      <div className="AssignMoney">
        <div className="add-user-area">
          <p className="add-user-btn" onClick={::this.modifyContent}>新增分账商户</p>
        </div>
        {
          showModifyModal &&
          <Modal className="assign-layer">
            <ShowPage {...pagedata} title={title}>
              <AssignMoneyModal optionsData={data.userOption} modifyData={this.state.modifyData}/>
            </ShowPage>
          </Modal>
        }
        <TablePage className="assign-money-table" headData={data.headData} contentData={contentData}/>
      </div>
    )
  }
}

/**
 *
 * 分账页面
 */
AssignMoney.propTypes = {
  data: PropTypes.object
};

export default AssignMoney;
