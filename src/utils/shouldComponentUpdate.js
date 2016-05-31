import {Map, fromJS, is} from 'immutable';

export default function shouldComponentUpdate(nextProps, nextState) {
  const IthisProps = fromJS(this.props),
    IthisState = fromJS(this.state),
    InextProps = fromJS(nextProps),
    InextState = fromJS(nextState);
  return (!is(IthisState, InextState) || !is(IthisProps, InextProps));
}