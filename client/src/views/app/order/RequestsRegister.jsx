import { Component } from "react";
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";
import { regSolOrder } from '../../../redux/solOrder/actions'
import DefaultImage from '../../../assets/telar.png'
import { createRef } from "react";
class Register extends Component {
    ref = createRef()
    constructor(props){
        super(props)
        this.state = {
          provider: '',
          code: '',
          description: '',

          viewImage: DefaultImage,
        }
        

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
      let payload = {
        code: this.state.code,
        description: this.state.description,
        image: this.state.file,
        provider: this.state.provider,
        accepted: "pendiente",
        detail: "",
        cartulina: null,
        solicitante_name: localStorage.getItem('user_name'),
        solicitante_id: localStorage.getItem('user_id')
      }
      this.props.regSolOrder(payload, this.props.history);
      
    }
    loadImage(file){
        this.setState({
            viewImage: URL.createObjectURL(file),
            file
        })
    }
    render(){
        const { id } = this.props.match.params
        const { name } = this.state
        return (
          <Widget className="widget-auth widget-p-lg">
            <div className="d-flex align-items-center justify-content-between py-3">
              <p className="auth-header mb-0">{id?'EDITAR ':'REGISTRAR '} SOLICITUD</p>
              <div className="logo-block">
                <p className="mb-0">DINEVA</p>
              </div>
            </div>
            <div className="auth-info my-2">
              { id && <p>Esta por editar la información de un usuario <b>"{name}"</b></p> }
              { !id && <p>Esta registrando un nuevo usuario</p> }
            </div>
            <form onSubmit={(event => this.doRegister(event))}>
                
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Proveedor</FormText>
                </div>
                <Input
                  id="provider"
                  className="input-transparent pl-3"
                  value={this.state.provider}
                  onChange={(event => this.setState({ provider: event.target.value }))}
                  type="select"
                  required
                  name="provider"
                  placeholder="Ingrese el proveedor"
                >
                    <option value={"Corea"}>Corea</option>
                    <option value={"Tailandia"}>Tailandia</option>
                </Input>
              </FormGroup>
              <FormGroup className="my-3">
                <FormText>Codigo</FormText>
                <Input
                  id="code"
                  className="input-transparent pl-3"
                  value={this.state.code}
                  onChange={(event) => this.changeCred(event)}
                  type="text"
                  required
                  name="code"
                  placeholder="Ingrese un código de identificación"
                />
              </FormGroup>


              <FormGroup className="my-3" onClick={()=>this.ref.current.click()} style={{ cursor: 'pointer'}}>
                <div className="d-flex justify-content-between">
                  <FormText>Documento</FormText>
                </div>
                <div style={{ display: 'flex' }}>
                <div 
                    className="div-image"
                    style={{ backgroundImage: `url(${this.state.viewImage})`, width: '50px', height: '50px', backgroundSize: 'contain', borderRadius: '50%'}}
                ></div>
                    <FormText style={{ fontSize: '18px', padding: '9px'}}>{'Imagen de solicitud'}</FormText>
                </div>
              </FormGroup>
              <input hidden type="file" ref={this.ref} accept=".png,.jpg" onChange={(event) => {
                    this.loadImage(event.currentTarget.files[0])
              }} />


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
              <div className="bg-widget d-flex justify-content-center">
                <Button className="rounded-pill my-3" type="submit" color="secondary-red">{!id?'Registrar':'Editar'}</Button>
              </div>
            </form>
          </Widget>
        )
    }
}
const mapStateToProps = (data) =>{
  return data
}
const mapDispatchToProps = (dispatch) => {
  return {
    regSolOrder: (value, history) => dispatch(regSolOrder(value, history))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)