import { createRef } from "react";
import { useRef } from "react";
import { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { Button, Col, FormGroup, FormText, Input, Modal, ModalBody, Row, UncontrolledCarousel  } from "reactstrap";
import Table from '../../../components/Table'
import { getAllReq, updSolOrder } from '../../../redux/solOrder/actions'
import DefaultImage from '../../../assets/telar.png'
import Widget from "../../../components/Widget/Widget.js";
import './order.scss'


import "react-color-palette/lib/css/styles.css";


class List extends Component {
    ref = createRef()
    refCartulina = createRef()
    constructor(props){
        super(props)
        this.props.getAllReq()
        this.state = {
            request: {
                cartulina: [],
                accepted: 'pendiente',
            },
            isOpen: false,
            image: DefaultImage,
            AddsCartulina: [],
            AddFiles: [],
            solOrders: [],
        }
        this.edit = this.edit.bind(this)
        this.changeCred = this.changeCred.bind(this)
        this.doRegister = this.doRegister.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.changeColor = this.changeColor.bind(this)
        
    }
    
    edit(element){
        if(!element.cartulina)element.cartulina = []
        this.setState({
            isOpen: true,
            request: element,
            image: element.image
        })
    }
    showImage(){
        
    }
    loadImages(files){
        const images = []
        for(let i=0; i<files.length; i++){
            images.push(URL.createObjectURL(files[i]))
        }
        this.setState({
            AddsCartulina: [ ...this.state.AddsCartulina, ...images],
            AddFiles: [ ...this.state.AddFiles, ...files ]
        })
    }
    removeImage(key){
        const images = this.state.AddsCartulina.filter((e,i)=>i!==key)
        const files = this.state.AddFiles.filter((e,i)=>i!==key)
        this.setState({
            AddsCartulina: images,
            AddFiles: files,
        })
    }
    doRegister(event){
        event.preventDefault();
        let payload = {
          detail: this.state.request.detail,
          cartulina: this.state.request.cartulina,
          code: this.state.request.id,
          accepted: this.state.request.accepted,
          create: new Date().getTime(),
          limit: this.state.request.limit
        }
        this.props.updSolOrder(payload, this.props.history)
        this.setState({
            isOpen: false
        })
    }
    changeCred (event) {
        const temp = {}
        temp[event.target.name] = event.target.value
        this.setState({
          request: { ...this.state.request, ...temp }
        })
    }
    addColor(){
        const colors = this.state.request.cartulina
        colors.push('#6ed165')
        this.setState({
            request: {
                ...this.state.request,
                cartulina: colors
            }
        })
    }
    removeColor(){
    }
    changeColor(index, event){
        let colors = this.state.request.cartulina
        colors[index] = event.target.value
        this.setState({
            request: {
                ...this.state.request,
                cartulina: colors
            }
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.solOrders !==this.props.solOrders){
            const solOrders = this.props.solOrders.map((solOrder)=>{
                if(solOrder.accepted==='pendiente')solOrder.accepted='Pendiente'
                if(solOrder.accepted==='success')solOrder.accepted='Enviado'
                return solOrder
            })
            this.setState({
                solOrders: solOrders
            })
        }
    }

    getLimit(limit){
        const diff = limit - new Date().getTime()
        const month = 3600*1000*24*30
        const day = 3600*1000*24
        if(diff>month){
            const t = (diff/month).toFixed(0)
            return {
                label: t>1?'Meses':'Mes',
                time: (diff/month).toFixed(0),
                color: '#77d877'
            }
        }else if(diff>day){
            const t = diff/(3600*1000).toFixed(0)
            return {
                label: t>1?'Días':'día',
                time: diff/(3600*1000).toFixed(0),
                color: 'orange'
            }
        }else{
            const t = (diff/day).toFixed(0)
            return {
                label: t>1?'Horas':'Hora',
                time: t,
                color: '#ff6e65'
            }
        }
    }

    addTimeLimit(timelimit){
        const orginRequest = this.props.solOrders.find(e=>e.id===this.state.request.id)

        const request = this.state.request

        const today = new Date()
        const diff = timelimit - today.getTime()
        
        const month = 3600*1000*24*30

        if((diff+month)>month*6){
            request.limit = orginRequest.limit
        }else{
            request.limit += month
        }
        this.setState({
            request,
        })
    }
    resTimeLimit(timelimit){
        const orginRequest = this.props.solOrders.find(e=>e.id===this.state.request.id)

        const request = this.state.request

        const today = new Date()
        const diff = timelimit - today.getTime()
        
        const month = 3600*1000*24*30

        if((diff-month)<month){
            request.limit = orginRequest.limit
        }else{
            request.limit -= month
        }
        this.setState({
            request,
        })
    }
    
    render(){
        return (
            <Fragment>
                <Table 
                    data={this.state.solOrders} 
                    cols={[ 
                        { header: 'Cerrar', field: 'limit', DOM: (value)=>{
                            const dataTimeLimit = this.getLimit(value);
                            return <div className="circle-limit" style={{ background: dataTimeLimit.color}}>{`${dataTimeLimit.time} ${dataTimeLimit.label}`}</div>
                        } },
                        { header: 'Proveedor', field: 'provider' },
                        { header: 'Solicitante', field: 'solicitante_name' },
                        { header: 'Imagen', field: 'image', type: 'image' },
                        { header: 'Detalle', field: 'description' },
                        { header: 'Aprobación', field: 'accepted' },
                        { header: 'Aprobar', field: '', DOM: (value) => <button onClick={()=>this.edit(value)}>Aprobar</button> },
                    ]}
                    count={5}
                />
                <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({ isOpen: !this.state.isOpen})}>
                    <ModalBody>
                        <div 
                            onClick={()=>this.ref.current.click()}
                            style={{ backgroundImage: `url(${this.state.image})`, width: '100%', height: '100px', backgroundSize: 'contain'}}
                        ></div>
                        <input id="image" name="image" type="file" ref={this.ref} hidden={true} accept=".jpg,.png" onChange={(event) => {
                            const file = event.target.files[0]
                            this.setState({ image:  URL.createObjectURL(file)})
                        }} />
                    <Widget className="widget-auth widget-p-lg">
                        <div className="d-flex align-items-center justify-content-between py-3">
                            <p className="auth-header mb-0">EDITAR SOLICITUD</p>
                            <div className="logo-block">
                                <p className="mb-0">DINEVA</p>
                            </div>
                            </div>
                            <div className="auth-info my-2">
                            <p>Esta por editar la información de <b>"{this.state.request.provider}"</b></p>
                            </div>
                            <form onSubmit={(event => this.doRegister(event))}>
                            <FormGroup  className="my-3">
                                <div className="d-flex justify-content-between">
                                <FormText>Estado</FormText>
                                </div>
                                <Input
                                id="accepted"
                                className="input-transparent pl-3"
                                value={this.state.request.accepted}
                                onChange={(event => this.changeCred(event))}
                                type="select"
                                required
                                name="accepted"
                                placeholder="Estado"
                                >
                                    <option value={"success"}>Enviado</option>
                                    <option value={"pendiente"}>En espera</option>
                                </Input>
                            </FormGroup>
                            <FormGroup  className="my-3">
                                <div className="d-flex justify-content-between">
                                <FormText>Detalle</FormText>
                                </div>
                                <Input
                                id="detail"
                                className="input-transparent pl-3"
                                value={this.state.request.detail}
                                onChange={(event => this.changeCred(event))}
                                type="text"
                                name="detail"
                                placeholder="Detalles de confirmación"
                                />
                            </FormGroup>
                            
                            <FormGroup  className="my-3">
                                <div className="d-flex justify-content-between">
                                <FormText>Paleta de colores</FormText>
                                </div>
                                <div style={{ display: 'flex'}}>
                                    {
                                        this.state.request.cartulina.map((color, index)=>{
                                            return <Input type="color" className="color-picker" key={index}  name="color" value={color} onChange={(e)=>this.changeColor(index,e)}  />
                                        })
                                    }
                                    <div className="add-color-contain" onClick={()=>this.addColor()}>
                                        <div className="color">+</div>
                                    </div>
                                </div>
                            </FormGroup>
                            
                            <Row>
                                <Col xl='6'>
                                    
                                    <FormGroup  className="my-3">
                                        <div className="d-flex justify-content-between">
                                        <FormText>Reducir tiempo límite</FormText>
                                        </div>
                                        <Button onClick={()=>this.resTimeLimit(this.state.request.limit)}>{`Aumentar`}</Button>
                                    </FormGroup>
                                </Col>
                                
                                <Col xl='6'>
                                    <FormGroup  className="my-3">
                                        <div className="d-flex justify-content-between">
                                        <FormText>Aumentar tiempo límite</FormText>
                                        </div>
                                        <Button onClick={()=>this.addTimeLimit(this.state.request.limit)}>{`Aumentar`}</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            {/*<div className="container-images">
                            {
                                this.state.AddsCartulina.map((image, key)=>{
                                    return <div 
                                                key={key}
                                                onClick={()=>this.removeImage(key)}
                                                className="div-image"
                                                style={{ cursor: 'pointer', backgroundImage: `url(${image})`}}
                                            >
                                                {
                                                    <h1 class={'delete-icon'}>X</h1>
                                                }
                                            </div>
                                })
                            }
                            </div>
                            <FormGroup className="my-3" onClick={()=>this.refCartulina.current.click()} style={{ cursor: 'pointer'}}>
                                <div className="d-flex justify-content-between">
                                    <FormText>Click para agregar cartulina</FormText>
                                </div>
                                <FormText style={{ fontSize: '18px', padding: '9px' }}>{'Click para cargar imagenes'}</FormText>
                            </FormGroup>
                            <input hidden multiple type="file" ref={this.refCartulina} accept=".png,.jpg" onChange={(event) => {
                                    this.loadImages(event.currentTarget.files)
                            }} />
                        <UncontrolledCarousel items={this.state.request.cartulina.map((image, key)=>({ src: image, header: key, caption: key }))} />*/}
                            <div className="bg-widget d-flex justify-content-center">
                                <Button className="rounded-pill my-3" type="submit" color="secondary-red">Editar</Button>
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
      solOrders: state.solOrder
    })
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getAllReq: () => dispatch(getAllReq()),
      updSolOrder: (values, history) => dispatch(updSolOrder(values, history)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(List)