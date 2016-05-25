import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PageHeader from '../PageHeader/PageHeader';
import PageSidebar from '../PageSidebar/PageSidebar';
import styles from './Manage.scss';

class Manage extends React.Component {

  render() {
    const {children} = this.props;
    const headerData = require("../../assets/MockData/header_data.json");
    return (
      <div className="Manage">
        <PageHeader data={headerData}/>
        <PageSidebar data={headerData} route={[0, 1, 0]}/>
        <div className="PageMain">
          {children && React.cloneElement(children)}
        </div>
      </div>
    )
  }
}

Manage.propTypes = {
  children: PropTypes.node,
  defaultPath: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    defaultPath: ownProps.location.pathname
  }
}
export default connect(mapStateToProps)(Manage);