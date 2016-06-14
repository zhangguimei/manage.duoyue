'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PageHeader from '../PageHeader/PageHeader';
import PageSidebar from '../PageSidebar/PageSidebar';
import {Map, is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/LoginActions';
import {getTitle, getChildren} from '../UIComponent/Menu/ShowRoute';
import {Scrollbars} from 'react-custom-scrollbars';
import Modal from '../UIComponent/Modals/Modal';
import LoadingRect from '../UIComponent/Loading/LoadingRect';
import {animations} from '../../utils/animation';
import shouldComponentUpdate from '../../utils/shouldComponentUpdate';
import styles from './Manage.scss';

class Manage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showWaitModal: false
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.tree = null
  }

  tempCloseWaitModal() {
    let that = this,
      randtime = Math.random() * 1000;
    randtime = randtime > 990 ? randtime : 0;
    if (!randtime) {
      return
    }
    ;
    this.setState({
      showWaitModal: true
    });
    this.timer = setTimeout(() => {
      that.setState({
        showWaitModal: false
      });
    }, randtime);
  }

  componentWillMount() {
    const {username, actions:{fetchTreedata}} = this.props;
    if (!username) {
      this.context.router.push('/login');
    }
    //console.log(actions);
    this.tree = fetchTreedata(username).tree;
  }

  componentWillReceiveProps(nextProps) {
    const Ithis = fromJS(this.props), Inext = fromJS(nextProps);
    if (!is(Ithis, Inext)) {
      this.tempCloseWaitModal();
    }
  }

  componentDidUpdate() {
    animations(this.refs.headerText, 'bounceInLeft');
  }

  render() {
    const {children, route, path} = this.props,
      {showWaitModal} = this.state;
    const treeData = this.tree;
    let sidebarLeft = route.length === 3 && getChildren(treeData.menu, route).length > 0 || route.length === 4 ? '360px' : '180px';

    return (
      <div className="Manage">
        <PageHeader treeData={treeData}/>
        <PageSidebar treeData={treeData} path={path}/>
        <div className="PageMain" style={{left : sidebarLeft}}>
          <Scrollbars style={{height:'100%'}}>
            <header className="page-title">
              <span ref="headerText">{getTitle(treeData.menu, route)}</span>
            </header>
            <section className="page-body">
              {children && React.cloneElement(children)}
            </section>
          </Scrollbars>
          {
            showWaitModal &&
            <Modal className="topModal">
              <LoadingRect/>
            </Modal>
          }
        </div>
      </div>
    )
  }
}

Manage.propTypes = {
  children: PropTypes.node,
  route: PropTypes.array.isRequired,
  username: PropTypes.string
};

Manage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let {login:{username}, menu} = fromJS(state).toJS();
  return {
    path: ownProps.location.pathname,
    route: menu,
    username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(Manage);