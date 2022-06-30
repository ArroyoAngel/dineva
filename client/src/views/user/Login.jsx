import { Component } from "react";
import { connect } from 'react-redux'
import { Button, Col, Container, FormGroup, FormText, Input, Row } from "reactstrap";
import Footer from "../../components/Footer/Footer";
import Widget from "../../components/Widget/Widget";
import loginImage from "../../assets/loginImage.svg";
import { loginUser } from '../../redux/user/actions'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: 'mauro@gmail.com',
            password: 'mauro123'
        }
        this.doLogin = this.doLogin.bind(this)
        this.changeCreds = this.changeCreds.bind(this)
    }
    doLogin = (e) => {
        e.preventDefault();
        debugger
        this.props.loginUser({ password: this.state.password, user: this.state.user })
    }
    
    changeCreds = (event) => {
        let obj = {}
        obj[event.target.name] = event.target.value
        this.setState({ ...this.state, ...obj})
    }
    
    
    render(){
        /*const { from } = this.props.location.state || { from: { pathname: '/template' }};
        if (hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
            <Redirect to={from} />
            )
        }*/
        return (
            <div className="auth-page">
              <Container className="col-12">
                <Row className="d-flex align-items-center">
                  <Col xs={12} lg={6} className="left-column">
                    <Widget className="widget-auth widget-p-lg">
                      <div className="d-flex align-items-center justify-content-between py-3">
                        <p className="auth-header mb-0">DINEVA</p>
                      </div>
                      <div className="auth-info my-2">
                        <p>Inicio de sesion para acceder a los servicios de administrador de DINEVA importaciones</p>
                      </div>
                      <form onSubmit={(event) => this.doLogin(event)}>
                        <FormGroup className="my-3">
                          <FormText>Email</FormText>
                          <Input
                            id="user"
                            className="input-transparent pl-3"
                            value={this.state.user}
                            onChange={(event) => this.changeCreds(event)}
                            type="user"
                            required
                            name="user"
                            placeholder="user"
                          />
                        </FormGroup>
                        <FormGroup  className="my-3">
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
                        <div className="bg-widget d-flex justify-content-center">
                          <Button className="rounded-pill my-3" type="submit" color="secondary-red">Entrar</Button>
                        </div>
                      </form>
                    </Widget>
                  </Col>
                  <Col xs={0} lg={6} className="right-column">
                    <div>
                      <img src={loginImage} alt="Error page" />
                    </div>
                  </Col>
                </Row>
              </Container>
              <Footer />
            </div>
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
  