
import React from 'react';
import {Map, fromJS, is} from 'immutable';

const shouldUpdate = () => {
  return connect => {
    if(!connect) return connect;

    class ShouldUpdateComponent extends React.Component {
      constructor(props) {
        super(props);
      }

      shouldComponentUpdate (nextProps, nextState) {
        const IthisProps = fromJS(this.props),
          IthisState = fromJS(this.state),
          InextProps = fromJS(nextProps),
          InextState = fromJS(nextState);
        return (!is(IthisState, InextState) || !is(IthisProps, InextProps));
      }

      render() {
        return (<div></div>)
      }
    }
    return hoistStatics(ShouldUpdateComponent, connect)
  }
};

const hoistStatics = (source, target) => {
  if(target.prototype ) {
    target.prototype.shouldComponentUpdate = source.prototype.shouldComponentUpdate
  }
  return target;
};

export default shouldUpdate;