import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login'
import Register from './Register'

const User = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
      <Route
        path={`${match.url}/login`}
        render={props => <Login {...props} />}
      />
      <Route
        path={`${match.url}/register`}
        render={props => <Register {...props} />}
      />
    </Switch>
  );
};

export default User;
