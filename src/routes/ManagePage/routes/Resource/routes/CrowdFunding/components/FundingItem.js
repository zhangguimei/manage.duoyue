/*
 *  Date    : 2016.07.01
 *  Author  : CC
 */
'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCrowdFundingDetail } from 'ActionsFolder/CrowdFundingActions';

import Modal from 'UIComponentFolder/Modals/Modal';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FundingDetail from './FundingDetail';

class FundingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailLayer: false,
      showSupportLayer: false,
      showCircleLayer: false
    };
  }

  createShowPageData() {
    let data = {
      title: "修改信息",
      newPageHref: '',
      closeShowPage: ::this.toggleDetailLayer,
      submitForm: ::this.submitChange,
      width: '90%',
      height: '95%'
    };
    data.ftChildren = <div><span className="submit-btn btn">确定修改</span>
      <span className="cancel-btn btn" onClick={::this.toggleDetailLayer}>返回关闭</span></div>;
    this.showPageData = data;
  }

  toggleDetailLayer(id) {
    const { showDetailLayer } = this.state,
      { fetchCrowdFundingDetail } = this.props;

    if(!showDetailLayer && id != undefined) {
      fetchCrowdFundingDetail && fetchCrowdFundingDetail(id);
    }
    this.setState({
      showDetailLayer: !showDetailLayer
    });
  }

  toggleSupportLayer() {
    const { showSupportLayer } = this.state;
    this.setState({
      showSupportLayer: !showSupportLayer
    });
  }

  toggleCircleLayer() {
    const { showCircleLayer } = this.state;
    this.setState({
      showCircleLayer: !showCircleLayer
    });
  }

  submitChange() {
    //TODO 提交
  }

  clickToDelete(id) {
    if(confirm("确定要删除吗？")) {
      this.props.onDelete(id);
    }
  }

  componentWillMount() {
    this.supportData = {
      title: "支持列表",
      closeShowPage: ::this.toggleSupportLayer,
      width: '50%',
      height: '70%'
    };
    this.circleData = {
      title: "评论列表",
      closeShowPage: ::this.toggleCircleLayer,
      width: '50%',
      height: '70%'
    };
  }

  componentDidMount() {
    this.createShowPageData();
  }

  render() {
    const { data, crowdFundingDetail } = this.props,
      { showDetailLayer, showSupportLayer, showCircleLayer } = this.state;
    let donePro = (data.collectedNum / data.wantedNum).toFixed(2) * 100 + "%";
    return (
      <div className="FundingItem clearfix">
        <div className="left-area left">
          <img className="item-img" src={data.pic} alt={data.title}/>
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
            <li className="count-num" onClick={() => this.toggleSupportLayer()}>
              <span>支持</span>
              <span>{data.support}</span>
            </li>
            <li className="count-num" onClick={() => this.toggleCircleLayer()}>
              <span>圈子动态</span>
              <span>{data.circle}</span>
            </li>
          </ul>
        </div>

        <div className="bottom left">
          <div className="button-wrap">
            <a onClick={() => this.toggleDetailLayer(data.id)}><span className="button">修改信息</span></a>
            <a onClick={() => this.clickToDelete(data.id)}><span className="button">删除</span></a>
          </div>
        </div>
        {
          showDetailLayer &&
          <Modal>
            <ShowPage {...this.showPageData} >
              <FundingDetail data={crowdFundingDetail}/>
            </ShowPage>
          </Modal>
        }
        {
          showSupportLayer &&
          <Modal>
            <ShowPage {...this.supportData} >
              <div className="result-tips">还没有任何支持信息...</div>
            </ShowPage>
          </Modal>
        }
        {
          showCircleLayer &&
          <Modal>
            <ShowPage {...this.circleData} >
              <form className="search-area form-inline clearfix" method="get" action="">
                <FormItem type="text" title="项目名称" name="name" itemClass="inline-block" className="form-control input-sm w200"
                          rules={{required: false}}/>
                <input type="button" className="btn btn-primary btn-sm ml20 w80" value="搜索"/>
              </form>
              <div className="result-tips">没有任何信息...</div>
            </ShowPage>
          </Modal>
        }
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundingItem);