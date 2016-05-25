import React, {PropTypes} from 'react';
import classnames from 'classnames';

import styles from './NewClickPage.scss';

class ClickPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index || 1
    }
  }

  onChangePage(type, i) {
    let {index} = this.state, {count, onPageClick} = this.props;
    switch (type) {
      case "prev":
        index > 1 &&
        this.setState({
          index: index - 1
        }, onPageClick(index - 1));
        break;
      case "index":
        this.setState({
          index: i
        }, onPageClick(i));
        index = i;
        break;
      case "next":
        index < count &&
        this.setState({
          index: index + 1
        }, onPageClick(index + 1));
        break;
      default:
        return null;
    }

  }

  render() {
    const {index} = this.state, {count}=this.props,
          screenWidth = window.screen.width;
    if(parseInt(count, 10) <= 1) return null;
    let array = new Array(count + 2), node = null;
    for (let i = 0; i < count + 2; i++) {
      array[i] = 0;
    }
    let pageCode = array.map((item, i) => {
      node = null;
      if(i == 0) {
        node = <li className={classnames("prev-button", index == 1 ? "disabled":"")}
                   onClick={() => ::this.onChangePage("prev")} key={i}><i className="ic  ic-back"></i></li>;
        return node;
      } else if(i == count + 1) {
        node = <li className={classnames("next-button", index == count ? "disabled":"")}
                   onClick={() => ::this.onChangePage("next")} key={i}><i className="ic ic-right"></i></li>;
        return node;
      }
      if(i == 1 || i == count) {
        node = <li className="flag-button" key={i} onClick={() => ::this.onChangePage("index", i)}>{i}</li>;
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
          node = <li className="page-dot" key={i}>..</li>
        }
        if(i == count - 1 && index < count - 2) {
          node = <li className="page-dot" key={i}>..</li>
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
          node = <li className="page-dot" key={i}>..</li>
        }
        if(i == count - 1 && index < count - 4) {
          node = <li className="page-dot" key={i}>..</li>
        }
      }
      return node;
    });

    return (
        <ul className="ClickPage">
          {pageCode}
        </ul>
    )
  }
}

ClickPage.propTypes = {
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onPageClick: PropTypes.func
};

export default ClickPage;