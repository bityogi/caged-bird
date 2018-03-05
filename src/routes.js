import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'containers/login';
import Transactions from 'containers/transactions';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/transactions" component={Transactions} />
    </Switch>
  )

}
