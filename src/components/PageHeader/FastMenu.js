'use strict';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import options from './ConstantOfFast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, is, fromJS} from 'immutable';
import * as actions from '../../actions/LoginActions';
import {animations} from '../../utils/animation';

class FastMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleLogout(){
    let {actions:{logOut}} = this.props;
    logOut();
    if(confirm('确定退出管理平台吗？')){
      this.context.router.push('/login');
    }
  }

  render() {
    let {fastData, changeRoute} = this.props;
    return (
      <div className="FastMenu">
        <a className="title" href="javascript:;">三</a>
        <div className="cont animated fadeInRight">
          <div className="icon-caret"><em/><i/></div>
          <h5>快速操作</h5>
          <div className="list">
            {
              fastData.map((item, i) => {
                let {name, url, icon_max} = item;
                return (
                  <Link to={`${url}`} key={i} onClick={() => changeRoute(options[item.id])}>
                    <img src={icon_max} alt={name} className="hvr-pop"/>
                    <span>{name}</span>
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
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon_max: PropTypes.string.isRequired
  })).isRequired
}

FastMenu.contextTypes = {
  router: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  let {login:{username}} = fromJS(state).toJS();
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