import React, {PropTypes}  from 'react';
import {Map, is, fromJS} from 'immutable';
import {Scrollbars} from 'react-custom-scrollbars';
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';
import { nodeDraggable, removeDraggable } from '../../../utils/nodeDraggable';
import { nodeResizable, removeResizable } from '../../../utils/nodeResizable';

import styles from './ShowPage.scss';

class ShowPage extends React.Component {

  static defaultProps = {
    width: '90%',
    height: '90%',
    title: '新增',
    newPageHref: 'javascript:void(0)'
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

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
      browserWidth = document.body.clientWidth || document.documentElement.clientWidth,
      browserHeight = document.body.clientHeight || document.documentElement.clientHeight,
      left = (browserWidth - showPageNode.offsetWidth) / 2,
      top = (browserHeight - showPageNode.offsetHeight) / 2;
    showPageNode.style.left = left / browserWidth * 100 + '%';
    showPageNode.style.top = top / browserHeight * 100 + '%';
  }

  componentDidMount() {
    this.centerNode('ShowPage');
    nodeDraggable(this.refs.ShowPage, this.refs.Header);
    nodeResizable(this.refs.ShowPage, true, true);
  }

  componentWillUnmount() {
    removeDraggable(this.refs.ShowPage, this.refs.Header);
    removeResizable(this.refs.ShowPage);
  }

  render() {
    const {width, height, title, newPageHref} = this.props;
    const contentStyle = {
      width: width,
      height: height
    };
    return (
      <div className="ShowPage" style={contentStyle} ref="ShowPage">
        <header className="header clearfix" ref="Header">
          <span className="title left">{title}</span>
          <i className="ic ic-close right" onClick={::this.closePage} />
          <a className="ic ic-openinnewwindow right" href={newPageHref} target="_blank" />
        </header>
        <div className="content">
          <Scrollbars style={{height:'100%'}}>
            {this.props.children}
          </Scrollbars>
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