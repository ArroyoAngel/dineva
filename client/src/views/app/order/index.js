import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import List from './OrderList'
import Register from './OrderRegister'
import Request from './RequestsRegister'
import RequestList from './RequestsList'
const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/order-list`}
        render={props => <List {...props} />}
      />
      <Route
        path={`${match.url}/request`}
        render={props => <Request {...props} />}
      />
      <Route
        path={`${match.url}/register`}
        render={props => <Register {...props} />}
      />
      <Route
        path={`${match.url}/request-list`}
        render={props => <RequestList {...props} />}
      />
    </Switch>
  );
};

export default App;