'use strict';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

class CollapseItem extends React.Component {
  constructor(props) {
    super(props);
    if(!this.props.mutex){
      this.state = {
        open: this.props.open
      }
    }
  }

  toggleContent() {
    if (!this.props.mutex) {
      this.setState({
        open: !this.state.open
      })
    } else {
      this.props.toggleOne(this.props.typeIndex);
    }
  }

  render() {
    let {data:{title, content},mutex,skin} = this.props;
    let open = !mutex ? this.state.open : this.props.open;
    return (
      <div className={`panel panel-${skin}`}>
        <div className="panel-heading">
          <h4 className="panel-title">
            <a onClick={::this.toggleContent}>{title}</a>
          </h4>
        </div>
        <div className={classNames('panel-collapse collapse',{'in':open})}>
          <div className="panel-body">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

CollapseItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired,
  skin: PropTypes.oneOf(['default','primary', 'success']),
  mutex:PropTypes.bool,
  openFirst:PropTypes.bool
}

export default CollapseItem;