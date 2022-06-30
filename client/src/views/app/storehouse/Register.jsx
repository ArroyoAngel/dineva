import { Component } from "react";
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";

import loginImage from "../../../assets/registerImage.svg";
import SofiaLogo from "../../../components/Icons/SofiaLogo.js";
import GoogleIcon from "../../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../../components/Icons/AuthIcons/LinkedinIcon.js";

import { getStorehouse } from '../../../redux/storehouse/actions'
import Widget from "../../../components/Widget/Widget.js";
import { regStorehouse, updateStorehouse } from '../../../redux/storehouse/actions'
class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
          name: '',
          address: '',
          phone: '',
          description: '',
        }
        
        this.props.getStorehouse()

        this.isEdit = this.isEdit.bind(this)
        this.changeCred = this.changeCred.bind(this)
    }
    componentDidMount(){
    }
    isEdit(){
      const { id } = this.props.match.params
      const storehouse = this.props.storehouse.find(item=>item.id===id)
      this.setState({
        ...storehouse
      })
    }
    componentDidUpdate(prevProps){
      const { storehouse } = this.props
      const { id } = this.props.match.params
      if(prevProps.storehouse !== storehouse){
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
        address: this.state.address,
        description: this.state.description,
        name: this.state.name,
        phone: this.state.phone,
      }
      if(id){
        this.props.updateStorehouse(payload, id, history)
      }else{
        this.props.regStorehouse(payload, history)
      }
    }
    render(){
        const { id } = this.props.match.params
        const { name } = this.state
        return (
          <Widget className="widget-auth widget-p-lg">
            <div className="d-flex align-items-center justify-content-between py-3">
              <p className="auth-header mb-0">{id?'EDITAR ':'REGISTRAR '} ALMACÉN</p>
              <div className="logo-block">
                <p className="mb-0">DINEVA</p>
              </div>
            </div>
            <div className="auth-info my-2">
              { id && <p>Esta por editar la información de un almacén <b>"{name}"</b></p> }
              { !id && <p>Esta registrando un nuevo almacén</p> }
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
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Dirección</FormText>
                </div>
                <Input
                  id="address"
                  className="input-transparent pl-3"
                  value={this.state.address}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="address"
                  placeholder="Ingerse la dirección"
                />
              </FormGroup>
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Descripción</FormText>
                </div>
                <Input
                  id="description"
                  className="input-transparent pl-3"
                  value={this.state.description}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="description"
                  placeholder="Ingrese una descripción"
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
              <div className="bg-widget d-flex justify-content-center">
                <Button className="rounded-pill my-3" type="submit" color="secondary-red">{!id?'Registrar':'Editar'}</Button>
              </div>
            </form>
          </Widget>
        )
    }
}
const mapStateToProps = ({ storehouse}) => {
  return { storehouse }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getStorehouse: () => dispatch(getStorehouse()),
    regStorehouse: (value, history) => dispatch(regStorehouse(value, history)),
    updateStorehouse: (payload, id, history) => dispatch(updateStorehouse(payload, id, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)