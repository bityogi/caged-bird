import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'containers/login';
import Transactions from 'containers/transactions';
import Landing from 'components/landing';
import Broadcast from 'containers/broadcast';
// import NotFound from 'components/notFound';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/transactions" component={Transactions} />
      <Route exact path="/broadcast" component={Broadcast} />
      <Route path="*" component={Login} />
    </Switch>
  )

}
