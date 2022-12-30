import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../redux/user/actions";
import hasToken from "../../services/authService";

import loginImage from "../../assets/loginImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import { Component } from "react";

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: 'admin@flatlogic.com',
      password: 'password',
      test: 'asdas'
    }
  }

  doLogin(e){
    e.preventDefault();
    debugger
    //this.props.loginUser({ password: this.state.password, user: this.state.email })
  }

  changeCreds(event){
    let body = {};
    body[event.target.name] = event.target.value
    this.setState(body)
  }

  render(){
    return (
      <Widget className="widget-auth widget-p-lg">
        <div className="d-flex align-items-center justify-content-between py-3">
          <p className="auth-header mb-0">Login</p>
          <div className="logo-block">
            <SofiaLogo />
            <p className="mb-0">SOFIA</p>
          </div>
        </div>
        <div className="auth-info my-2">
          <p>This is a real app with Node.js backend - use <b>"admin@flatlogic.com / password"</b> to login!</p>
        </div>
        <form onSubmit={(event) => this.doLogin(event)}>
          <FormGroup className="my-3">
            <FormText>Email</FormText>
            <Input
              id="email"
              className="input-transparent pl-3"
              value={this.state.email}
              onChange={(event) => this.changeCreds(event)}
              type="email"
              required
              name="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup  className="my-3">
            <div className="d-flex justify-content-between">
              <FormText>Password</FormText>
              <Link to="/error">Forgot password?</Link>
            </div>
            <Input
              id="password"
              className="input-transparent pl-3"
              value={this.state.password}
              onChange={(event) => this.changeCreds(event)}
              type="password"
              required
              name="password"
              placeholder="Password"
            />
            
          </FormGroup>
          <FormGroup  className="my-3">
            <div className="d-flex justify-content-between">
              <FormText>INPUT TEST</FormText>
              <Link to="/error">Forgot password?</Link>
            </div>
            <Input
              id="test"
              className="input-transparent pl-3"
              value={this.state.test}
              onChange={(event) => this.changeCreds(event)}
              type="text"
              required
              name="test"
              placeholder="Test"
            />
          </FormGroup>
          <div className="bg-widget d-flex justify-content-center">
            <Button className="rounded-pill my-3" type="submit" color="secondary-red">Login</Button>
          </div>
        </form>
      </Widget>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.user;
  return { user, loading, error };
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (value) => dispatch(loginUser(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
