'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCrowdFundingDetail } from 'ActionsFolder/CrowdFundingActions';

import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FundingDetail from './FundingDetail';

class FundingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  createShowPageData() {
    let data = {
      title: "修改信息",
      newPageHref: '',
      closeShowPage: ::this.toggleModal,
      submitForm: ::this.submitChange,
      width: '90%',
      height: '95%'
    };
    data.ftChildren = <div><span className="submit-btn btn">确定修改</span>
      <span className="cancel-btn btn" onClick={::this.toggleModal}>返回关闭</span></div>;
    this.showPageData = data;
  }

  toggleModal(id) {
    const { showModal } = this.state,
      { fetchCrowdFundingDetail } = this.props;
    if(!showModal && id != undefined) {
      fetchCrowdFundingDetail && fetchCrowdFundingDetail(id);
    }
    this.setState({
      showModal: !showModal
    });
  }

  submitChange() {
    //TODO
  }

  ClickToDelete(id) {
    if(confirm("确定要删除吗？")) {
      this.props.onDelete(id)
    }
  }

  componentDidMount() {
    this.createShowPageData();
  }

  render() {
    const { data, crowdFundingDetail } = this.props;
    const {showModal} = this.state;
    let donePro = ( data.collectedNum / data.wantedNum ).toFixed(2) * 100 + "%";
    return (
      <div className="FundingItem clearfix">
        <div className="left-area left">
          <img className="item-img" src={data.pic}/>
          <div className="item-info clearfix">
            <div className="money-info left">￥{data.collectedNum}/￥{data.wantedNum}</div>
            <div className="time-info right">剩余{data.remainDay}</div>
          </div>
          <div className="item-progress">
            <div className="bar-wrapper">
              <div className="left-bar" style={{ width: donePro }}>已完成{donePro}</div>
            </div>
          </div>
        </div>

        <div className="right-area left">
          <div className="item-title">{data.title}</div>
          <div className="item-content">{data.desc}</div>
          <ul className="user-count">
            <li className="count-num">
              <span>喜欢</span>
              <span>{data.like}</span>
            </li>
            <li className="count-num">
              <span>支持</span>
              <span>{data.support}</span>
            </li>
            <li className="count-num">
              <span>圈子动态</span>
              <span>{data.circle}</span>
            </li>
          </ul>
        </div>

        <div className="bottom left">
          <div className="button-wrap">
            <a onClick={() => this.toggleModal(data.id)}><span className="button">修改信息</span></a>
            <a onClick={() => this.ClickToDelete(data.id)}><span className="button">删除</span></a>
            {
              showModal &&
              <Modal>
                <ShowPage {...this.showPageData} >
                  <FundingDetail data={crowdFundingDetail}/>
                </ShowPage>
              </Modal>
            }
          </div>
        </div>
      </div>
    )
  }
}

FundingItem.propTypes = {
  data: PropTypes.object,
  crowdFundingDetail: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    crowdFundingDetail: state.crowdfunding.toJS().crowdFundingDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCrowdFundingDetail: bindActionCreators(fetchCrowdFundingDetail, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundingItem);