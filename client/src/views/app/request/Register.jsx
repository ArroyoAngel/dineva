import { Fragment } from "react";
import { Component } from "react";
import { connect } from 'react-redux'
import { Button, FormGroup, FormText, Input, Modal, ModalBody } from "reactstrap";
import Table from '../../../components/Table'
import Widget from "../../../components/Widget/Widget";
import { filter, filterStoreByCondition } from '../../../helpers/filters'

import { getAllOrder } from '../../../redux/order/actions'
import { regRequest } from '../../../redux/request/actions'
class Register extends Component {
    constructor(props){
        super(props)
        let cart = localStorage.getItem('cart')
        if(!cart || cart==='undefined' ||cart==='null')cart='[]'
        cart = JSON.parse(cart)

        this.state = {
          orders: [],
          cart,

          color: 0,
          alias: '',
          filter_color: [],
          filter_alias: [],

          isOpen: false,
          openPayload: false,
          product: {
            specification: []
          },
          client: {
            name: '',
            departament: '',
            direction: '',
            phone: '',
            detail: '',
          }
        }

        this.props.getAllOrder()

        this.edit = this.edit.bind(this)
        this.changeCred = this.changeCred.bind(this)
        this.addCart = this.addCart.bind(this)
        this.dropCart = this.dropCart.bind(this)
    }
    async componentWillReceiveProps(nextProps){
      await this.setState({
        orders: nextProps.orders,
      })
  
      let filterColor = await filter(this.props.orders, "color").map(e=>{ return { label: e, value: e, } })
      let filterAlias = await filter(this.props.orders, "alias").map(e=>{ return { label: e, value: e, } })
      this.setState({
        filter_color: filterColor,
        filter_alias: filterAlias,
        color: filterColor[0].value,
        alias: filterAlias.value,
        orders: nextProps.orders,
      })
    }
    edit(element){
      element.specification_selected = element.specification[0]
      this.setState({
        isOpen: true,
        product: element
      })
    }
    changeCred (event) {
      const temp = {}
      temp[event.target.name] = event.target.value
      this.setState({
        product: {
          ...this.state.product,
          ...temp,
        }
      })
    }
    changeCredClient (event) {
      const temp = {}
      temp[event.target.name] = event.target.value
      this.setState({
        client: {
          ...this.state.client,
          ...temp,
        }
      })
    }

    async addCart(event){
      event.preventDefault()
      const body = {
        alias: this.state.product.alias,
        almacen: this.state.product.almacen,
        bale: this.state.product.bale,
        color: this.state.product.color,
        edit: this.state.product.edit,
        lot: this.state.product.lot,
        mtr: this.state.product.mtr,
        order: this.state.product.order,
        pcs: this.state.product.pcs,
        specification: this.state.product.specification_selected,
      }
      let posCart = this.state.cart.findIndex(e=>e.bale===body.bale)
      if(posCart<0){
        await this.setState({
          cart: [ ...this.state.cart, {} ]
        })
        posCart=this.state.cart.length-1
      }
      let cart = this.state.cart
      cart[posCart] = body

      localStorage.setItem('cart', JSON.stringify(cart))
      this.setState({
        isOpen: false,
        cart
      })
    }
    dropCart(element){
      let cart = this.state.cart.filter(e=>element.bale!==e.bale)
      localStorage.setItem('cart', JSON.stringify(cart))
      this.setState({
        cart
      })
    }

    payment(event){
      event.preventDefault();
      let payload = {
        name: this.state.client.name,
        phone: this.state.client.phone,
        direction: this.state.client.direction,
        departament: this.state.client.departament,
        detail: this.state.client.detail,
        carrito: this.state.cart
      }
      this.props.regRequest(payload, this.props.history)
    }

    render(){
        return (
            <Fragment>
                <FormGroup  className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Filtrar por color</FormText>
                  </div>
                  <Input
                    id="color"
                    className="input-transparent pl-3"
                    value={this.state.color}
                    onChange={(event => this.setState({ color: event.target.value }))}
                    type="select"
                    name="color"
                    placeholder="Ingrese el proveedor"
                  >
                      {
                        this.state.filter_color.map((color, key)=><option key={key} value={Number(color.value)}>{color.label}</option>)
                      }
                  </Input>
                </FormGroup>
                <FormGroup  className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Filtrar por Alias</FormText>
                  </div>
                  <Input
                    id="alias"
                    className="input-transparent pl-3"
                    value={this.state.alias}
                    onChange={(event => this.setState({ alias: event.target.value }))}
                    type="select"
                    name="alias"
                    placeholder="Ingrese el proveedor"
                  >
                      {
                        this.state.filter_alias.map((alias, key)=><option key={key} value={alias.value}>{alias.label}</option>)
                      }
                  </Input>
                </FormGroup>
                <Table 
                    data={filterStoreByCondition(this.state.orders, this.state.color, this.state.alias)} 
                    cols={[ 
                        { header: 'Alias', field: 'alias' },
                        { header: 'Especificaciones', field: 'specification' },
                        { header: 'Piesas', field: 'pcs' },
                        { header: 'Metraje', field: 'mtr' },
                        { header: 'Color', field: 'color' },
                        { header: 'Quitar', field: '', DOM: (value) => <button onClick={()=>this.edit(value)}>Agregar</button> },
                    ]}
                    count={5}
                />
                {
                  this.state.cart.length > 0 && 
                  <Table 
                    data={this.state.cart} 
                    cols={[ 
                        { header: 'Alias', field: 'alias' },
                        { header: 'Especificaciones', field: 'specification' },
                        { header: 'Piesas', field: 'pcs' },
                        { header: 'Metraje', field: 'mtr' },
                        { header: 'Color', field: 'color' },
                        { header: 'Quitar', field: '', DOM: (value) => <button onClick={()=>this.dropCart(value)}>Quitar</button> },
                    ]}
                    count={5}
                  />
                }
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red" onClick={()=>this.setState({ openPayload: true })}>REGISTRAR COMPRA</Button>
                </div>
                <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({ isOpen: !this.state.isOpen})}>
                    <ModalBody>
                      <Widget className="widget-auth widget-p-lg">
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <p className="auth-header mb-0">CARGAR CARRITO</p>
                          <div className="logo-block">
                            <p className="mb-0">DINEVA</p>
                          </div>
                        </div>
                        <form onSubmit={(event => this.addCart(event))}>
                            
                          <FormGroup  className="my-3">
                            <div className="d-flex justify-content-between">
                              <FormText>Especificaciones</FormText>
                            </div>
                            <Input
                              id="specification_selected"
                              className="input-transparent pl-3"
                              value={this.state.product.specification_selected}
                              onChange={(event => this.changeCred(event) )}
                              type="select"
                              required
                              name="specification_selected"
                              placeholder="Ingrese el proveedor"
                            >
                                { this.state.product.specification.map((element, key)=>{
                                  return <option key={key} value={element}>{element}</option>
                                })}
                            </Input>
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Bale</FormText>
                            <Input id="bale" disabled className="input-transparent pl-3" value={this.state.product.bale} name="bale" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Alias</FormText>
                            <Input id="alias" disabled className="input-transparent pl-3" value={this.state.product.alias} name="alias" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Color</FormText>
                            <Input id="color" disabled className="input-transparent pl-3" value={this.state.product.color} name="color" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Metraje</FormText>
                            <Input id="mtr" disabled className="input-transparent pl-3" value={this.state.product.mtr} name="mtr" />
                          </FormGroup>
                          <div className="bg-widget d-flex justify-content-center">
                            <Button className="rounded-pill my-3" type="submit" color="secondary-red">CARGAR</Button>
                          </div>
                        </form>
                      </Widget>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.openPayload} toggle={()=>this.setState({ isOpen: !this.state.openPayload})}>
                    <ModalBody>
                      <Widget className="widget-auth widget-p-lg">
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <p className="auth-header mb-0">CONFIRMAR COMPRA</p>
                          <div className="logo-block">
                            <p className="mb-0">DINEVA</p>
                          </div>
                        </div>
                        <form onSubmit={(event => this.payment(event))}>
                            
                          <FormGroup className="my-3">
                            <FormText>nombre</FormText>
                            <Input id="name" className="input-transparent pl-3" value={this.state.client.name} onChange={(event)=>this.changeCredClient(event)} name="name" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Departamento</FormText>
                            <Input id="departament" className="input-transparent pl-3" value={this.state.client.departament} onChange={(event)=>this.changeCredClient(event)} name="departament" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Direccion</FormText>
                            <Input id="direction" className="input-transparent pl-3" value={this.state.client.direction} onChange={(event)=>this.changeCredClient(event)} name="direction" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Telefono</FormText>
                            <Input id="phone" className="input-transparent pl-3" value={this.state.client.phone} onChange={(event)=>this.changeCredClient(event)} name="phone" />
                          </FormGroup>
                          <FormGroup className="my-3">
                            <FormText>Detalle</FormText>
                            <Input type="textarea" id="detail" className="input-transparent pl-3" value={this.state.client.detail} onChange={(event)=>this.changeCredClient(event)} name="detail" />
                          </FormGroup>
                          <div className="bg-widget d-flex justify-content-center">
                            <Button className="rounded-pill my-3" type="submit" color="secondary-red">Confirmar</Button>
                          </div>
                        </form>
                      </Widget>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
  return ({
    orders: state.order,
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrder: () => dispatch(getAllOrder()),
    regRequest: (value, history) => dispatch(regRequest(value, history))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)