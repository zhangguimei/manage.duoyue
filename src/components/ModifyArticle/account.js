import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from '../UIComponent/Modals/Modal';
import ShowPage from '../UIComponent/Modals/ShowPage';
import AccountMain from './Account/AccountMain';
import styles from './recommend.scss';
import {receiveAccountData} from '../../actions/ArticleActions';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      list: [],
      data: [],
      display: false
    }
  }

  onClickFunc(item) {
    this.setState({
      list: item
    })
  }

  onDelete(id) {
    const {data} = this.props;
    let index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        index = i;
        break;
      }
    }
    data.splice(index, 1);
  }

  toggleModal(id) {
    const {showModal} = this.state,
      {receiveAccountData, data} = this.props;
    if (!showModal && id != undefined) {
      let userData = data.filter((item) => {
        return item.id == id;
      })[0];
      receiveAccountData(userData);
    }
    this.setState({
      showModal: !showModal,
      list: data
    });
  }

  addSubmit() {
    this.toggleModal();
  }

  render() {
    const {data} = this.props;
    const {showModal, list} = this.state;
    let pagedata = {
      title: '管理分账信息',
      width: '50%',
      height: '60%',
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.toggleModal
    };
    let AccountData = data.map((item, index) => {
      return (
        <tr key={index} onClick={this.onClickFunc.bind(this, item)}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.WeChatName}</td>
          <td>{item.userWeChat}</td>
          <td>{item.price}</td>
          <td>{item.startDate}-{item.endDate}</td>
          <td>
            <a className="change cursor" onClick={() => this.toggleModal(item.id, item)} id={item.id}>修改</a>
            {" "}|{" "}
            <a className="delete cursor" onClick={() => this.onDelete(item.id)} id={item.id}>删除</a>
          </td>
        </tr>
      )
    })
    return (
      <div className="Account">
        <a href="javascript:;" onClick={::this.toggleModal}>新增分账用户</a>
        <div className="table_main">
          <table className="table_main list_table">
            <thead>
            <tr className="thead">
              <th className="th">ID</th>
              <th className="th">商户名称</th>
              <th className="th">微信公号</th>
              <th className="th">关联微信用户</th>
              <th className="th">分账单价</th>
              <th className="th">分账有效期</th>
              <th className="th">操作</th>
            </tr>
            </thead>
            <tbody>{AccountData}</tbody>
          </table>
          {
            showModal &&
            <Modal>
              <ShowPage {...pagedata} submitChange={::this.addSubmit}>
                <AccountMain data={list}/>
              </ShowPage>
            </Modal>
          }
        </div>
      </div>
    )
  }
}
function mapStateToProps() {
  const data = require('../../assets/MockData/sourcecenter/account_data.json');
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
