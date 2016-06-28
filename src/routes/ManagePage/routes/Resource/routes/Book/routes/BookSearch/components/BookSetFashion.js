'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchFashionInfoData} from '../../../actions/BookActions';
import Table from '../../UIComponent/Table/Table';
import Modal from '../../UIComponent/Modals/Modal'
import ShowPage from '../../UIComponent/Modals/ShowPage'
import BookOperation from './BookOperation';
import BookAddFashionUser from './BookAddFashionUser';

class BookSetFashion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFashionUserLayer: false,
      tableContent: []
    };
  }

  componentDidMount() {
    const {fashionTableData} = this.props;
    this.setState({
      tableContent: fashionTableData.tableContentData
    });
  }

  addFashionUser() {
    this.setState({
      showFashionUserLayer: !this.state.showFashionUserLayer
    })
  }

  fashionOperation(id, type) {
    this.props.fetchFashionInfoData(id);
    this.setState({
      showFashionUserLayer: !this.state.showFashionUserLayer
    })
  }

  deleteOperation(id) {
    const {tableContent} = this.state;
    this.setState({
      tableContent: tableContent.filter(v => v.id != id)
    });
  }

  submitChange() {
    this.refs.BookAddFashionUser.submit();
    this.setState({
      showFashionUserLayer: false
    })
  }

  submitForm(values) {
    return new Promise((resolve) => {
      resolve(values);
    });
  }

  render() {
    const {fashionTableData, handleSubmit} = this.props,
      {showFashionUserLayer, tableContent} = this.state;
    fashionTableData.tableContentData.map((item, i) => {
      item.operation =
        <BookOperation index={item.id} modify={::this.fashionOperation} deleteOperation={::this.deleteOperation}/>;
    });
    let pagedata = {
      width: "50%",
      title: "",
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.fashionOperation
    };
    let datePickerData = {
      format: 'yyyy-mm-dd hh:ii:ss ',
      dateValue: '2016-5-29 00:10:12',
      placeHolder: '请选择日期',
      showTimePanel: true
    };
    return (
      <div className="BookSetFashion">
        <div className="add-user-area">
          <div className="add-user-btn" onClick={::this.fashionOperation}>新增分账商户</div>
        </div>
        {
          showFashionUserLayer &&
          <Modal>
            <ShowPage {...pagedata} submitChange={::this.submitChange}>
              <BookAddFashionUser ref="BookAddFashionUser" fashionTableData={fashionTableData}
                                  onSubmit={::this.submitForm}/>
            </ShowPage>
          </Modal>
        }
        <Table headData={fashionTableData.tableHeadData} contentData={tableContent}/>
      </div>
    )
  }
}
BookSetFashion.propTypes = {
  fashionTableData: PropTypes.object,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFashionInfoData: bindActionCreators(fetchFashionInfoData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookSetFashion);
