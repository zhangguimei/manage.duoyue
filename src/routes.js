import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Manage from './components/Manage/Manage';
import UserPage from './pages/PageUser/PageUser';
import Rays from './components/Rays2.0/index';
import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={Manage}>
    <IndexRoute component={UserPage}/>
    <Route path="user" component={UserPage}>
    </Route>

    <Route path="rays" component={Rays} />
    <Route path="*" component={NotFound} status={404}/>
  </Route>
)