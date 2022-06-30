import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
const List = React.lazy(() => import('./List'));
const Register = React.lazy(() => import('./Register'));

const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <List {...props} />}
      />
      <Route
        path={`${match.url}/register`}
        render={props => <Register {...props} />}
      />
      <Route
        path={`${match.url}/edit/:id`}
        render={props => <Register {...props} />}
      />
    </Switch>
  );
};

export default App;
