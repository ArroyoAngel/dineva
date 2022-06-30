import { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";
import { updateUser, regUser, getUsers } from '../../../redux/user/actions'
class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
          cargo: 'bodeguero',
          ci: '',
          name: '',
          phone: '',
          lastname: '',
          email: '',
          password: ''
        }
        
        this.props.getUsers()

        this.isEdit = this.isEdit.bind(this)
        this.changeCred = this.changeCred.bind(this)
    }
    isEdit(){
      const { id } = this.props.match.params
      const user = this.props.users.find(item=>item.id===id)
      this.setState({
        ...user
      })
    }
    componentDidUpdate(prevProps){
      const { users } = this.props
      const { id } = this.props.match.params
      if(prevProps.users !== users){
        if(id)this.isEdit()
      }
    }
    changeCred (event) {
      const temp = {}
      temp[event.target.name] = event.target.value
      
      this.setState({
        ...temp
      })
    }
    doRegister(event) {
      event.preventDefault();
      const { id } = this.props.match.params
      const { history } = this.props
      const payload = {
        cargo: this.state.cargo,
        ci: this.state.ci,
        name: this.state.name,
        lastname: this.state.lastname,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password
      }
      if(id){
        this.props.updateUser(id, payload, history)
      }else{
        this.props.registerUser(payload, history)
      }
    }
    render(){
        const { id } = this.props.match.params
        const { name } = this.state
        return (
          <Widget className="widget-auth widget-p-lg">
            <div className="d-flex align-items-center justify-content-between py-3">
              <p className="auth-header mb-0">{id?'EDITAR ':'REGISTRAR '} USUARIO</p>
              <div className="logo-block">
                <p className="mb-0">DINEVA</p>
              </div>
            </div>
            <div className="auth-info my-2">
              { id && <p>Esta por editar la información de un usuario <b>"{name}"</b></p> }
              { !id && <p>Esta registrando un nuevo usuario</p> }
            </div>
            <form onSubmit={(event => this.doRegister(event))}>
              <FormGroup className="my-3">
                <FormText>Nombre</FormText>
                <Input
                  id="name"
                  className="input-transparent pl-3"
                  value={this.state.name}
                  onChange={(event) => this.changeCred(event)}
                  type="text"
                  required
                  name="name"
                  placeholder="Ingrese un nombre"
                />
              </FormGroup>
              <FormGroup className="my-3">
                <FormText>Apellido</FormText>
                <Input
                  id="lastname"
                  className="input-transparent pl-3"
                  value={this.state.lastname}
                  onChange={(event) => this.changeCred(event)}
                  type="text"
                  required
                  name="lastname"
                  placeholder="Ingrese los apellidos"
                />
              </FormGroup>
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Cargo</FormText>
                </div>
                <Input
                  id="cargo"
                  className="input-transparent pl-3"
                  value={this.state.cargo}
                  onChange={(event => this.changeCred(event))}
                  type="select"
                  required
                  name="cargo"
                  placeholder="Ingerse el cargo"
                >
                    <option value={"bodeguero"}>Bodeguero</option>
                    <option value={"Secretario"}>Secretario</option>
                </Input>
              </FormGroup>
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Carnet de Identidad</FormText>
                </div>
                <Input
                  id="ci"
                  className="input-transparent pl-3"
                  value={this.state.ci}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="ci"
                  placeholder="Ingrese una numero de identifiacion"
                />
              </FormGroup>
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Teléfono</FormText>
                </div>
                <Input
                  id="phone"
                  className="input-transparent pl-3"
                  value={this.state.phone}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="phone"
                  placeholder="Ingrese el número de teléfono"
                />
              </FormGroup>
              {
                !id &&
                <Fragment>
                  <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Email</FormText>
                </div>
                <Input
                  id="email"
                  className="input-transparent pl-3"
                  value={this.state.email}
                  onChange={(event => this.changeCred(event))}
                  type="email"
                  required
                  name="email"
                  placeholder="Correo electronico"
                />
              </FormGroup>
              
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Contrasena</FormText>
                </div>
                <Input
                  id="password"
                  className="input-transparent pl-3"
                  value={this.state.password}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="password"
                  placeholder="Ingrese una clave de seguridad temporal"
                />
              </FormGroup>
                </Fragment>
              }
              <div className="bg-widget d-flex justify-content-center">
                <Button className="rounded-pill my-3" type="submit" color="secondary-red">{!id?'Registrar':'Editar'}</Button>
              </div>
            </form>
          </Widget>
        )
    }
}
const mapStateToProps = ({user}) => {
    return {
      users: user
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch(getUsers()),
      updateUser: (id, payload, history) => dispatch(updateUser(id, payload, history)),
      registerUser: (payload, history) => dispatch(regUser(payload, history))
    }
  }
  
  export default connect( mapStateToProps, mapDispatchToProps)(Register);