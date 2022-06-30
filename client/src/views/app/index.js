import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import s from "../../components/Layout/Layout.module.scss";
const Menu = React.lazy(() => import('./Menu'));
const ViewOrder = React.lazy(() => import('./order'));
const ViewStorehouse = React.lazy(() => import('./storehouse'));
const ViewUser = React.lazy(() => import('./user'));
const ViewRequest = React.lazy(() => import('./request'));
const App = ({ match }) => {
  return (
      <Fragment>
        <div className={s.root}>
          <div className={s.wrap}>
            <Sidebar />
            <Header/>
            <Switch>
                
              <Redirect exact from={`${match.url}/`} to={`${match.url}/menu`} />
              <Route
                path={`${match.url}/menu`}
                render={props => <Menu {...props} />}
              />
              <Route
                path={`${match.url}/order`}
                render={props => <ViewOrder {...props} />}
              />
              <Route
                path={`${match.url}/storehouse`}
                render={props => <ViewStorehouse {...props} />}
              />
              <Route
                path={`${match.url}/user`}
                render={props => <ViewUser {...props} />}
              />
              <Route
                path={`${match.url}/request`}
                render={props => <ViewRequest {...props} />}
              />
              </Switch>
          </div>
        </div>
        </Fragment>
    
  );
};

export default App;