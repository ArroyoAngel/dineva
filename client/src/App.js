// -- React and related libs
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter, BrowserRouter as Router } from "react-router-dom";

// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


// -- Redux Actions
import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Component Styles
import "./styles/app.scss";

const ViewUser = React.lazy(() => import('./views/user'));
const ViewApp = React.lazy(() => import('./views/app'));
const ViewMain = React.lazy(() => import('./views'));
const PrivateRoute = ({ component, ...rest }) => {
  if (!localStorage.getItem("user_id")) {
    return (<Redirect to="/login" />)
  } else {
    return (
      <Route { ...rest } render={props => (React.createElement(component, props))} />
    );
  }
};

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if(authUser && authUser!=="null"){
          return <Component {...props} />
        }else{
          return <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        }
      }
      }
    />
  );
}

const App = (props) => {
  const loginUser = localStorage.getItem('user_id')
  return (
    <div>
      <ToastContainer/>
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>

            <AuthRoute
              path="/app"
              authUser={loginUser}
              component={ViewApp}
            />
            <Route path="/user" render={props => <ViewUser {...props} />} />
            <Route path="/" exact render={props => <ViewMain {...props} />} />

            <Route component={ErrorPage}/>
            <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { loginUser } = state.user
  return { loginUser };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
