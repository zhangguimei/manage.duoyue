'use strict';
import React, {PropTypes} from 'react';
import Modal from 'UIComponentFolder/Modals/Modal'
import ShowPage from 'UIComponentFolder/Modals/ShowPage'
import CheckBox from 'UIComponentFolder/Table/CheckBox';
import Pagination from 'UIComponentFolder/Pagination/Pagination';

const numsForOnePage = 50;

class BookAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      showAuthorLayer: false,
      checkBoxState: false,
      selectAuthorArr: []
    };
    this.authorList = [];
    this.dataForShow = [];
  }

  componentWillMount() {
    const {authorListData} = this.props;
    if (authorListData.length > 0) {
      this.dataForShow = authorListData.slice(0, numsForOnePage);
    }
  }

  onPageClick(nextPageIndex) {
    const {authorListData} = this.props;
    this.dataForShow = authorListData.slice((nextPageIndex - 1) * numsForOnePage, nextPageIndex * numsForOnePage);
    this.setState({
      pageIndex: nextPageIndex
    });
  }

  addAuthorModal() {
    this.setState({
      showAuthorLayer: !this.state.showAuthorLayer
    });
  }

  selectAuthor(id) {
    const {authorList} = this;
    const {authorListData} = this.props;
    if (authorList.indexOf(id) < 0) {
      this.authorList = authorList.concat(id);
    } else {
      authorList.splice(authorList.indexOf(id), 1)
    }
    this.forceUpdate();
  }

  deleteAuthor(id) {
    const {authorList} = this;
    authorList.splice(authorList.indexOf(id), 1)
    this.forceUpdate();
  }

  render() {
    const {authorListData} = this.props,
      {showAuthorLayer, checkBoxState, selectAuthorArr, pageIndex} = this.state,
      {authorList} = this,
      totalPages = Math.ceil(authorListData.length / numsForOnePage);
    let pagedata = {
      width: "50%",
      height: "50%",
      title: "选择作者 ",
      showFooter: false,
      closeShowPage: ::this.addAuthorModal
    };
    let listCode = [];
    authorList.map((item, i) => {
      listCode = listCode.concat(authorListData.filter((dataItem) => {
        return dataItem.id == item;
      }))
    });
    listCode = listCode.map((item, i) => {
      return (
        <li className="author-item left" key={i}>
          <div className="author-name">{item.name}</div>
          <img src={item.pic} className="author-photo"/>
          <div className="author-delete">
            <div className="author-del-btn" onClick={() => this.deleteAuthor(item.id)}>删除</div>
          </div>
        </li>
      )
    })
    return (
      <div className="BookAuthor">
        <ul className="author-area clearfix">
          {
            listCode
          }
        </ul>
        <div className="add-author-box">
          <div className="add-author-btn" onClick={::this.addAuthorModal}>【增加关联作者】</div>
        </div>
        {
          showAuthorLayer &&
          <Modal>
            <ShowPage {...pagedata} submitChange={::this.addAuthorModal}>
              <ul className="author-list clearfix">
                {
                  this.dataForShow.map((item, i) => {
                    return (
                      <li className="add-author-item left clearfix" key={i}>
                        <CheckBox title={item.name} checked={authorList.indexOf(item.id) >= 0} index={item.id}
                                                        value={item.id} checkBoxOnClick={::this.selectAuthor}/>
                      </li>
                    )
                  })
                }

              </ul>
              <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}
BookAuthor.propTypes = {
  authorListData: PropTypes.array
};
export default BookAuthor;
