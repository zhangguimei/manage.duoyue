import React, {PropTypes}  from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';
import {nodeDraggable, removeDraggable} from '../../../utils/nodeDraggable';
import {nodeResizable, removeResizable} from '../../../utils/nodeResizable';

import styles from './ShowPage.scss';

class ShowPage extends React.Component {

  static defaultProps = {
    width: '90%',
    height: '90%',
    title: '新增',
    className: '',
    newPageHref: 'javascript:void(0)',
    showFooter: true
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      fullScreen: false
    };
    this.defaultStyle = {}
  }

  closePage() {
    const {closeShowPage} = this.props;
    closeShowPage && closeShowPage();
  }

  submitForm() {
    const {submitForm} = this.props;
    submitForm && submitForm();
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

  toggleFullScreen() {
    let showPage = this.refs.ShowPage;
    if (!this.state.fullScreen) {
      this.defaultStyle = {
        left: showPage.style.left,
        top: showPage.style.top
      };
    }
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  }

  componentWillUnmount() {
    removeDraggable(this.refs.ShowPage, this.refs.Header);
    removeResizable(this.refs.ShowPage);
  }

  render() {
    const {width, height, title, className, showFooter, ftChildren, children} = this.props,
      {fullScreen} = this.state,
      {top, left} = this.defaultStyle;
    let contentStyle = {
      width: fullScreen ? '100%' : width,
      height: fullScreen ? '100%' : height,
      left: fullScreen ? 0 : left,
      top: fullScreen ? 0 : top
    };
    return (
      <div className={`ShowPage${ className}${fullScreen?' full-screen':''}`} style={contentStyle} ref="ShowPage">
        <header className="header clearfix" ref="Header">
          <span className="title left">{title}</span>
          <i className="ic ic-close right" onClick={::this.closePage}/>
          <i className={`ic ${fullScreen?'ic-backFullScreen':'ic-fullScreen'} right`} onClick={::this.toggleFullScreen}/>
        </header>
        <div className={`content${showFooter||ftChildren?' show-footer':''}`}>
          {/*<Scrollbars autoHide={true} style={{height:'100%'}}>*/}
          {children}
          {/*</Scrollbars>*/}
        </div>
        {
          showFooter &&
          <footer className="footer">
            {
              ftChildren ?
                ftChildren :
                <div className="btn-wrap">
                  <span className="submit-btn btn" onClick={::this.submitForm}>确定新增</span>
                  <span className="cancel-btn btn" onClick={::this.closePage}>返回关闭</span>
                </div>
            }
          </footer>
        }
      </div>
    );
  }
}

/**
 * @param 组件参数介绍
 * @type {{
 * width: '弹出层页面宽度,默认90%可不传',
 * height: '弹出层页面高度，默认90%可不传', 
 * title: '弹出层页面标题', 
 * closeShowPage: '关闭弹层函数', 
 * submitForm: '提交表单方法',
 * children: '页面内容', 
 * className: '顶层ShowPage样式类名称', 
 * showFooter: '是否显示底部', 
 * ftChildren: '底部内容'
 * }}
 */
ShowPage.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  closeShowPage: PropTypes.func.isRequired,
  submitForm: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  showFooter: PropTypes.bool,
  ftChildren: PropTypes.any
};

export default ShowPage;