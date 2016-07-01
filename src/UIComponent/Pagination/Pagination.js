"use strict";
/*
* example:
* <Pagination index={pageIndex} totalPages={5} requireSelect={true} requireTurn={true} onPageClick={::this.onPageClick} />
* */
import React, {PropTypes} from 'react';
import classnames from 'classnames';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

import styles from './Pagination.scss';

class Pagination extends React.Component {
  static defaultProps = {
    pageNumLists: [5, 20, 50],
    requireSelect: false,         //是否需要下拉框
    requireTurn: false            //是否需要跳转页面
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      showPanel: false            //跳转panel是否显示
    };
  }

  onChangePage(type, i) {
    let {index, totalPages, onPageClick} = this.props;
    switch (type) {
      case "prev":
        (index > 1) && onPageClick(index - 1);
        break;

      case "index":
        onPageClick(i);
        break;

      case "next":
        (index < totalPages) && onPageClick(index + 1);
        break;

      default:
        return null;
    }
  }

  togglePanel() {
    this.setState({
      showPanel: !this.state.showPanel
    });
  }

  btnClick() {
    const { totalPages } = this.props;
    let turnIndex = parseInt(this.refs.panel.querySelector(".FormItem").getAttribute("data-value"), 10);
    if(!turnIndex) {
      turnIndex = 1;
    } else if(turnIndex < 1) {
      turnIndex = 1;
    } else if(turnIndex > totalPages) {
      turnIndex = totalPages;
    }
    this.onChangePage("index", turnIndex);
    ::this.togglePanel();
  }

  render() {
    const { index, totalPages, selectOnChange, requireSelect, pageNumLists, requireTurn } = this.props,
          screenWidth = window.screen.width;
    const { showPanel } = this.state;
    if(parseInt(totalPages, 10) <= 0) return null;
    let array = new Array(totalPages + 2), node = null;
    for (let i = 0; i < totalPages + 2; i++) {
      array[i] = 0;
    }
    let pageCode = array.map((item, i) => {
      node = null;
      if(i == 0) {
        node = <li className={classnames("prev-button", index == 1 ? "disabled":"")}
                   onClick={() => this.onChangePage("prev")} key={i}>上一页</li>;
        return node;
      } else if(i == totalPages + 1) {
        node = <li className={classnames("next-button", index == totalPages ? "disabled":"")}
                   onClick={() => this.onChangePage("next")} key={i}>下一页</li>;
        return node;
      }
      if(i == 1 || i == totalPages) {
        node = <li className="flag-button" key={i} onClick={() => ::this.onChangePage("index", i)}>{i}</li>;
        if(totalPages == 1) {
          return <li className="flag-button flag-button-on" key={i}>{i}</li>;
        }
      }

      if(screenWidth < 1048) {
        if(i > index - 2 && i < index + 2) {
          if(i == index) {
            node = <li className="flag-button flag-button-on" key={i}>{i}</li>
          } else {
            node = <li className="flag-button" key={i} onClick={() => ::this.onChangePage("index", i)}>{i}</li>
          }
        }

        if(i == index - 2 && index > 3) {
          node = <li className="page-dot" key={i}>...</li>
        }
        if(i == totalPages - 1 && index < totalPages - 2) {
          node = <li className="page-dot" key={i}>...</li>
        }
      } else {
        if(i > index - 4 && i < index + 6) {
          if(i == index) {
            node = <li className="flag-button flag-button-on" key={i}>{i}</li>
          } else {
            node = <li className="flag-button" key={i} onClick={() => ::this.onChangePage("index", i)}>{i}</li>
          }
        }

        if(i == 2 && index > 4) {
          node = <li className="page-dot" key={i}>...</li>
        }
        if(i == totalPages - 1 && index < totalPages - 4) {
          node = <li className="page-dot" key={i}>...</li>
        }
      }
      return node;
    });
    //下拉选择部分
    let selectCode = (
      <div className="rows-set left">
        每页显示：
        <select name="rowsForOnePage" className="select" onChange={selectOnChange}>
          {
            pageNumLists.map((option, index) => {
              return <option value={option} key={index}>{option}</option>
            })
          }
        </select>
      </div>
    );
    //跳转页面部分
    let turnCode = (
      <div className="turn-wrapper">
        <li className="flag-button turn-button" onClick={::this.togglePanel}>指定跳转</li>
        <div ref="panel" className={`turn-panel ${showPanel ? "show" : ""}`}>
          <span>跳转到第</span>
          <FormItem type="number" className="page-input" />
          <span>页</span>
          <button className="btn confirm-btn" onClick={::this.btnClick}>确定</button>
        </div>
      </div>
    );

    return (
      <div className="Pagination">
        { requireSelect && selectCode }
        <ul className="pagination-list">
          { pageCode }
          { requireTurn && turnCode }
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  index: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func,
  requireSelect: PropTypes.bool,
  selectOnChange: PropTypes.func,
  pageNumLists: PropTypes.array,
  requireTurn: PropTypes.bool
};

export default Pagination;