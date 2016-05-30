/*
 * Created on 2016-05-30 14:26
 *
 * By Susan Su
 */

'use strict';

import React from 'react';
import { Map, fromJS, is } from 'immutable';

export default function shouldUpdateDecorator(){

  return DecoratedComponent =>

    class FetchOnUpdateDecorator extends React.Component {

      shouldComponentUpdate(nextProps, nextState) {
        const IthisProps = Map(this.props),
            IthisState = fromJS(this.state),
            InextProps = Map(nextProps),
            InextState = fromJS(nextState);
        return (!is(IthisState, InextState) || !is(IthisProps, InextProps));
      }

      render() {
        return(
          <DecoratedComponent {...this.props} />
        )
      }
    }
}