import React, {PropTypes}  from 'react';
import {Map, is, fromJS} from 'immutable';

import styles from './ShowPage.scss';

class ShowPage extends React.Component {

  static defaultProps = {
    width: '90%',
    height: '90%',
    title: '新增',
    newPageHref: 'javascript:void(0)'
  };

  closePage() {
    const {closeShowPage} = this.props;
    closeShowPage && closeShowPage();
  }

  submitChange() {
    const {submitChange} = this.props;
    submitChange && submitChange();
  }

  centerNode(node) {
    let showPageNode = this.refs[node],
      width = showPageNode.offsetWidth,
      height = showPageNode.offsetHeight;
    showPageNode.style.marginLeft = -(width / 2) + 'px';
    showPageNode.style.marginTop = -(height / 2) + 'px';
  }

  componentDidMount() {
    this.centerNode('ShowPage');
  }

  shouldComponentUpdate(nextProps, nextState) {
    const IthisProps = fromJS(this.props),
      IthisState = fromJS(this.state),
      InextProps = fromJS(nextProps),
      InextState = fromJS(nextState);
    return (!is(IthisState, InextState) || !is(IthisProps, InextProps));
  }

  render() {
    const {width, height, title, newPageHref} = this.props;
    const contentStyle = {
      width: width,
      height: height
    };
    return (
      <div className="ShowPage" style={contentStyle} ref="ShowPage">
        <header className="header clearfix">
          <span className="title left">{title}</span>
          <i className="ic ic-close right" onClick={::this.closePage}></i>
          <a className="ic ic-openinnewwindow right" href={newPageHref} target="_blank"></a>
        </header>
        <div className="content" ref='content'>
          {this.props.children}
        </div>
        <footer className="footer">
          <span className="submit-btn btn" onClick={::this.submitChange}>确定新增</span>
          <span className="cancel-btn btn" onClick={::this.closePage}>返回关闭</span>
        </footer>
      </div>
    );
  }
}

ShowPage.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  closeShowPage: PropTypes.func.isRequired,
  newPageHref: PropTypes.string.isRequired,
  submitChange: PropTypes.func,
  children: PropTypes.any
};
export default ShowPage;