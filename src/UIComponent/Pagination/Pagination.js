"use strict";
import React, {PropTypes} from 'react';
import classnames from 'classnames';

import shouldComponentUpdate from '../../utils/shouldComponentUpdate';

import styles from './Pagination.scss';

class Pagination extends React.Component {
  static defaultProps = {
    pageNumLists: [5, 20, 50]
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
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

  render() {
    const { index, totalPages, selectOnChange, requireSelect, pageNumLists } = this.props,
          screenWidth = window.screen.width;
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

    return (
      <div className="Pagination">
        {
          requireSelect &&
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
        }
        <ul>
          {pageCode}
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
  pageNumsLists: PropTypes.array
};

export default Pagination;