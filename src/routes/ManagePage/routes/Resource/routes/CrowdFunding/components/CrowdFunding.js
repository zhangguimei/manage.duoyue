'use strict';
/*
 *  Date    : 2016.06.28
 *  Author  : CC
 *  Declare : crowdfunding manage
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { fetchCrowdFundingList } from 'ActionsFolder/CrowdFundingActions';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FundingItem from './FundingItem';
import FundingDetail from './FundingDetail';
import styles from './CrowdFunding.scss';

class CrowdFunding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal
    });
  }

  onDelete(id) {
    let {list} = this.props;
    let index;
    for (let i = 0; i < list.length; i++) {
      if(list[i].id == id) {
        index = i;
        break;
      }
    }
    list.splice(index, 1);
    this.forceUpdate();
  }

  componentDidMount() {
    const { fetchCrowdFundingList } = this.props;
    fetchCrowdFundingList();
  }

  render() {
    const {list} = this.props;
    const {showModal} = this.state;
    let pagedata = {
      title: "发起项目",
      width: '90%',
      height: '95%',
      closeShowPage: ::this.toggleModal
    };
    let contentData = list.map((item, index) => {
      return <FundingItem data={item} onDelete={::this.onDelete} key={index}/>
    });
    return (
      <div className="CrowdFunding">
        <div className="search-area">
          <form className="search-form clearfix" method="get" action="">
            <div className="input-area left">
              <span className="input-name">项目名称</span>
              <input type="text" className="form-control w200"/>
              <input type="button" className="search-button" value="搜索"/>
            </div>
            <input type="button" className="start-button right" value="发起项目" onClick={() => this.toggleModal()}/>
          </form>
          {
            showModal &&
            <Modal>
              <ShowPage {...pagedata} >
                <FundingDetail />
              </ShowPage>
            </Modal>
          }
        </div>
        {contentData}
      </div>
    );
  }
}

CrowdFunding.propTypes = {
  list: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    list: state.crowdfunding.toJS().crowdFundingList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCrowdFundingList: bindActionCreators(fetchCrowdFundingList, dispatch)
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrowdFunding);