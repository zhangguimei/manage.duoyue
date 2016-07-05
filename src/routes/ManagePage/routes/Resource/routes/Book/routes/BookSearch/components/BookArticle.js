'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchArticleInfoData} from '../../../../../../../../../actions/BookActions';
import {InputF} from '../../../../../../../../../components/PageTest/ValidationForm/ValidationComponents';
import Tree from 'UIComponentFolder/Tree/Tree';
import Table from './Table/Table';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage'
import BookArticleModify from './BookArticleModify';

const pageIndex = 1, rowsForOnePage = 15;
class BookArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModifyLayer: false,
      showUploadLayer: false,
      operationTitle: "",
      tableContent: this.props.menuTableData.tableContentData,
      optionId: ""
    };
  }

  articleOperation(id, type) {
    const {fetchArticleInfoData} = this.props;
    fetchArticleInfoData && fetchArticleInfoData(id);
    this.setState({
      optionId: id,
      showModifyLayer: !this.state.showModifyLayer,
      operationTitle: type == 1 ? "修改文章" : "新增文章",
    })
  }

  showUploadArticle() {
    this.setState({
      showUploadLayer: !this.state.showUploadLayer
    });
  }

  deleteOperation(id) {
    this.setState({
      tableContent: this.state.tableContent.filter(v => v.id != id)
    });
  }

  clickItem(data) {
    const {menuTableData} = this.props;
    this.setState({
      tableContent: menuTableData.tableContentData.filter(v => v.menuId == data.id)
    });
  }

  submitModify(id) {
    this.refs.BookArticleForm.submit();
    let price = document.querySelector(".price-input").value,
      article = document.querySelector(".article-input").value;
    this.setState({
      showModifyLayer: false
    });
  }

  submitForm(values) {
    return new Promise((resolve) => {
      resolve(values);
      ::this.toggleModal();
    });
  }

  pluginTableData() {
    const {menuTableData} = this.props;
    menuTableData.tableContentData.forEach((item, i) => {
      item.operation = <div className="BookArticleOperation clearfix">
        <div className="modify left" onClick={() => this.articleOperation(item.id,1)}>修改</div>
        <div className="order-font left">|</div>
        <div className="delete left" onClick={() => this.deleteOperation(item.id)}>删除</div>
      </div>
    });
  }

  componentWillMount() {
    this.pluginTableData();
  }

  render() {
    const {showModifyLayer, showUploadLayer, operationTitle, tableContent, optionId} = this.state,
      {menuTreeData, menuTableData} = this.props;
    let pagedata = {
      width: "50%",
      title: operationTitle,
      closeShowPage: ::this.articleOperation
    };
    let pageUploadData = {
      width: "50%",
      title: "批量上传文章",
      closeShowPage: ::this.showUploadArticle
    };
    return (
      <div className="BookArticle">
        <div className="add-book-data">
          <span className="upload-menu" onClick={::this.showUploadArticle}>批量上传文章</span>
          <span className="add-menu" onClick={::this.articleOperation}>新增文章 </span>
        </div>
        <div className="clearfix">
          <Tree data={menuTreeData} clickItem={::this.clickItem}/>
          {
            tableContent.length > 0 &&
            <Table headData={menuTableData.tableHeadData} contentData={tableContent} isOperatable={false}
                   rowsForOnePage={rowsForOnePage} pageIndex={pageIndex} editable={true}/>
          }
        </div>
        {
          showModifyLayer &&
          <Modal>
            <ShowPage {...pagedata} submitChange={() => this.submitModify(optionId)}>
              <BookArticleModify ref="BookArticleForm" menuTreeData={menuTreeData} onSubmit={::this.submitForm}/>

            </ShowPage>
          </Modal>
        }
        {
          showUploadLayer &&
          <Modal>
            <ShowPage {...pageUploadData} submitChange={::this.showUploadArticle}>
              <div className="upload-article">批量上传文章</div>
              <div className="upload-content">
                <div className="upload-big-title">文章文档上传</div>
                <div>
                  <div className="line-info">
                    <InputF field={menuCode} className="info-input input physical-book-price w120" label="目录字符："/>
                  </div>
                  <span>（默认 ……）</span>
                </div>
                <div>
                  <div className="line-info">
                    <InputF field={menuCode} className="info-input input physical-book-price w120" label="标题字符："/>
                  </div>
                  <span>（默认 ……）</span>
                </div>
                <div className="line-info"><span>文档上传</span><span>上传文件</span></div>
                <div className="upload-big-title">文档内容预览</div>
                <div className="preview-document-content"></div>
              </div>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}
BookArticle.propTypes = {
  menuTreeData: PropTypes.array,
  menuTableData: PropTypes.object,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleInfoData: bindActionCreators(fetchArticleInfoData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookArticle);