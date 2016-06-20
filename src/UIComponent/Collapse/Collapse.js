'use strict';

import React, {PropTypes} from 'react';
import CollapseItem from './CollapseItem';
import styles from './Collapse.scss';

class Collapse extends React.Component {
  static defaultProps={
    mutex:false,
    openFirst:true,
    skin:'default'
  }

  constructor(props) {
    super(props);
    if (this.props.mutex) {
      this.state = {
        openCollapseIndex: this.props.openFirst ? 0 : -1
      }
    }
  }

  toggleOne(id) {
    if (this.state.openCollapseIndex === id) {
      this.setState({openCollapseIndex: -1});
    } else {
      this.setState({openCollapseIndex: id});
    }
  }

  render() {
    let {data,mutex,openFirst,skin} = this.props;
    return (
      <div className="Collapse">
        {
          data.map((collapse, index)=> {
            if (!mutex) {
              return <CollapseItem key={index} data={collapse} mutex={mutex} skin={skin}
                                   open={index===0?openFirst:false}/>
            } else {
              var openStatus = (index === this.state.openCollapseIndex);
              return <CollapseItem key={index} typeIndex={index} data={collapse} toggleOne={::this.toggleOne}
                                   open={openStatus} mutex={mutex} skin={skin}/>
            }
          })
        }
      </div>
    );
  }
}

Collapse.propTypes = {
  data: PropTypes.array.isRequired,
  skin: PropTypes.oneOf(['default', 'primary', 'success']),//设置皮肤skin，默认值为default
  mutex: PropTypes.bool,//设置互斥mutex，为true时点击item只展开当前的item，默认值为false
  openFirst: PropTypes.bool//openFirst位true时展开第一个item，默认值是true
}

export default Collapse;