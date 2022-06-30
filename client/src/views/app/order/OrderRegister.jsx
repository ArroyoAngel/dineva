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
import { regOrder } from '../../../redux/order/actions'
import { getStorehouse } from '../../../redux/storehouse/actions'
import DefaultImage from '../../../assets/xlsx.png'

import { loadExcel } from '../../../helpers/load_excel'
import { createRef } from "react";

class Register extends Component {
    ref = createRef()
    constructor(props){
        super(props)
        this.state = {
          cargo: '',
          ci: '',
          name: '',
          phone: '',
          file_name: 'Click para cargar archivo.',
          storehouse: 'null'
        }
        
        this.props.getStorehouse()

        this.changeCred = this.changeCred.bind(this)
    }
    componentDidUpdate(prevProps){
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
        phone: this.state.phone,
      }
      if(id){
        this.props.updateUser(id, payload, history)
      }else{
        this.props.regUser(payload, history)
      }
    }
    loadFile(field, value){
        const result = {}
        result[field] = value
        this.setState(result)
    }
    render(){
        const { id } = this.props.match.params
        const { name } = this.state
        return (
          <Widget className="widget-auth widget-p-lg">
            <div className="d-flex align-items-center justify-content-between py-3">
              <p className="auth-header mb-0">Nueva órden</p>
              <div className="logo-block">
                <p className="mb-0">DINEVA</p>
              </div>
            </div>
            <div className="auth-info my-2">
                <p>Esta por registrar la información de una nueva órden</p> 
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
                  <FormText>Proveedor</FormText>
                </div>
                <Input
                  id="provider"
                  className="input-transparent pl-3"
                  value={this.state.provider}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="provider"
                  placeholder="Ingrese el proveedor"
                />
              </FormGroup>
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                    <FormText>Detalle</FormText>
                </div>
                    <Input
                        id="storehouse"
                        className="input-transparent pl-3"
                        value={this.state.storehouse}
                        onChange={(event => this.setState({ storehouse: event.target.value }))}
                        type="select"
                        required
                        name="storehouse"
                        placeholder="Estado"
                    >
                        {
                            this.props.storehouses.map((item,key)=>{
                                return <option key={key} value={item.id}>{ item.name }</option>
                            })
                        }
                        <option value={'null'}>{ 'No asignado' }</option>
                    </Input>
              </FormGroup>
              <FormGroup  className="my-3">
                <div className="d-flex justify-content-between">
                  <FormText>Alias</FormText>
                </div>
                <Input
                  id="alias"
                  className="input-transparent pl-3"
                  value={this.state.alias}
                  onChange={(event => this.changeCred(event))}
                  type="text"
                  required
                  name="alias"
                  placeholder="Ingrese el alias"
                />
              </FormGroup>
              <FormGroup className="my-3" onClick={()=>this.ref.current.click()} style={{ cursor: 'pointer'}}>
                <div className="d-flex justify-content-between">
                  <FormText>Documento</FormText>
                </div>
                <div style={{ display: 'flex' }}>
                <div 
                    className="div-image"
                    style={{ backgroundImage: `url(${DefaultImage})`, width: '50px', height: '50px', backgroundSize: 'contain', borderRadius: '50%'}}
                ></div>
                    <FormText style={{ fontSize: '18px', padding: '9px'}}>{this.state.file_name}</FormText>
                </div>
              </FormGroup>
              <input hidden type="file" ref={this.ref} accept=".xls,.xlsx" onChange={(event) => {
                        loadExcel(event.currentTarget.files[0], this.loadFile)
              }} />
              <div className="bg-widget d-flex justify-content-center">
                <Button className="rounded-pill my-3" type="submit" color="secondary-red">{'Registrar'}</Button>
              </div>
            </form>
          </Widget>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      storehouses: state.storehouse
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    regOrder: (value) => dispatch(regOrder(value)),
    getStorehouse: () => dispatch(getStorehouse()),
  })
  
  export default connect( mapStateToProps, mapDispatchToProps)(Register);