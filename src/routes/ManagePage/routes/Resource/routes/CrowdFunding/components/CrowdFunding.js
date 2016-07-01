/*
 *  Date    : 2016.07.01
 *  Author  : CC
 *  Declare : crowdfunding manage
 */
'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchCrowdFundingList } from 'ActionsFolder/CrowdFundingActions';
import Modal from 'UIComponentFolder/Modals/Modal';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';
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
    let {list} = this.props,
      index;
    for (let i = 0; i < list.length; i++) {
      if(list[i].id == id) {
        index = i;
        break;
      }
    }
    list.splice(index, 1);
    this.forceUpdate();
  }

  componentWillMount() {
    this.pagedata = {
      title: "发起项目",
      width: '90%',
      height: '95%',
      closeShowPage: ::this.toggleModal
    };
  }

  componentDidMount() {
    const { fetchCrowdFundingList } = this.props;
    fetchCrowdFundingList();
  }

  render() {
    const {list} = this.props,
      {showModal} = this.state;
    let contentCode = list.map((item, index) => {
      return <FundingItem data={item} onDelete={::this.onDelete} key={index}/>;
    });
    return (
      <div className="CrowdFunding">
        <form className="search-area form-inline clearfix" method="get" action="">
          <FormItem type="text" title="项目名称" name="name" itemClass="inline-block" className="form-control input-sm w200"
                    rules={{required: false}}/>
          <input type="button" className="btn btn-primary btn-sm ml20 w80" value="搜索"/>
          <input type="button" className="btn btn-primary btn-sm ml20 w120 right" value="发起项目"
                 onClick={() => this.toggleModal()}/>
        </form>
        {contentCode}
        {
          showModal &&
          <Modal>
            <ShowPage {...this.pagedata} >
              <FundingDetail />
            </ShowPage>
          </Modal>
        }
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