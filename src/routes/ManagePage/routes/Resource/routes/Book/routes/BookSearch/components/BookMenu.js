'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMenuInfoData} from '../../../../../../../../../actions/BookActions';
import BookMenuInfo from './BookMenuInfo'
import Tree from 'UIComponentFolder/Tree/Tree';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage'

class BookMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploadMenuLayer: false,
      showModifyLayer: false
    };
  }

  showUploadMenu() {
    this.setState({
      showUploadMenuLayer: !this.state.showUploadMenuLayer
    });
  }

  clickItem(data) {
    // console.log(data)
    data && this.props.fetchMenuInfoData(data)
    this.setState({
      showModifyLayer: true
    });
  }

  submitFunc(values) {
    return new Promise((resolve) => {
      resolve(values);
      this.setState({
        showModifyLayer: false
      });
    });
  }

  render() {
    const { menuTreeData } = this.props,
      {showUploadMenuLayer, showModifyLayer} = this.state;
    let pagedata = {
      width: "50%",
      height: "50%",
      title: "批量上传目录 ",
      newPageHref: 'http://www.baidu.com',
      closeShowPage: ::this.showUploadMenu
    };
    return (
      <div className="BookMenu">
        <div className="add-book-data">
          <span className="upload-menu" onClick={::this.showUploadMenu}>批量上传目录</span>
          <span className="add-menu" onClick={::this.clickItem}>新增目录 </span>
        </div>
        {
          showUploadMenuLayer &&
          <Modal>
            <ShowPage {...pagedata}>
              <div className="upload-menu-content">
                <div className="upload-menu-info clearfix">
                  <div className="item-font left w100">分界字符：</div>
                  <div className="item-input left"><input type="text" className="w100" placeholder="......"/></div>
                  <div className="item-font left w100">（默认 ……）</div>
                </div>
                <div className="upload-menu-info clearfix">
                  <div className="item-font left w100">文档上传：</div>
                </div>
                <div className="preview-document-content-title">文档内容预览</div>
                <div className="preview-document-content"></div>
              </div>
            </ShowPage>
          </Modal>
        }
        <div className="menu-content clearfix">
          <Tree data={menuTreeData} clickItem={::this.clickItem}/>
          {
            showModifyLayer ?
              <BookMenuInfo menuTreeData={menuTreeData} onSubmit={::this.submitFunc}/>
              :
              <div className="maintain-catalog-text left">请点击左侧目录节点进行维护！</div>
          }
        </div>
      </div>
    )
  }
}

BookMenu.propTypes = {
  menuTreeData: PropTypes.array
};

function mapStateToProps(state) {
  return {
    data: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenuInfoData: bindActionCreators(fetchMenuInfoData, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookMenu);

