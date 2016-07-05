'use strict';
import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from 'ActionsFolder/LoginActions';
import {animations} from 'UtilsFolder/animation';
import auth from 'APIFolder/auth';

@withRouter
class FastMenu extends React.Component {

  handleLogout(){
    let {actions:{logOut}} = this.props;
    auth.logout();
    logOut();
    if(confirm('确定退出管理平台吗？')){
      this.props.router.replace('/login');
    }
  }

  render() {
    let {fastData} = this.props;
    return (
      <div className="FastMenu">
        <a className="title" href="javascript:;">三</a>
        <div className="cont animated fadeInRight">
          <div className="icon-caret"><em/><i/></div>
          <h5>快速操作</h5>
          <div className="list">
            {
              fastData.map((item, i) => {
                let {permissionName, accessPath, icon_max} = item;
                return (
                  <Link to={accessPath} key={i}>
                    <img src={icon_max} alt={permissionName} className="hvr-pop"/>
                    <span>{permissionName}</span>
                  </Link>
                );
              })
            }
          </div>
          <a className="logout" href="javascript:;" onClick={::this.handleLogout}>退出系统</a>
        </div>
      </div>
    );
  }
}

FastMenu.propTypes = {
  fastData: PropTypes.arrayOf(PropTypes.shape({
    permissionName: PropTypes.string.isRequired,
    accessPath: PropTypes.string.isRequired,
    icon_max: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state) {
  let {login:{username}} = state;
  return {
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
  mapDispatchToProps
)(FastMenu);