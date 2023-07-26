import { Component, Fragment } from "react";
import { connect } from 'react-redux'

import { getWorkflow } from '../../redux/workflow/actions'

import Table from '../../components/Table'
import './Menu.scss'
import { Col, FormGroup, FormText, Input, Modal, ModalBody, Row } from "reactstrap";
class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            workflow: [],
            show: {
                labels_backup: [],
                labels_payload: [],
                data: {}
            }
        }
        this.props.getWorkflow()
        this.showMore = this.showMore.bind(this)
    }
    
    getAction(collection){
        switch(collection){
            case 'users':
                return {
                    create: 'ha Registrado un',
                    update: 'ha Editado un',
                    delete: 'ha eliminado un',
                    put: 'ha Editado un'
                }
            case 'solOrder':
                return {
                    create: 'ha realizado una',
                    update: 'ha actualizado una',
                    delete: 'ha eliminado una',
                    put: 'ha actualizado una'
                }
            case 'store':
                return {
                    create: 'ha vendido',
                    update: 'ha Editado un',
                    delete: 'ha eliminado un',
                    put: 'ha Editado un'
                }
            case 'request':
                return {
                    create: 'ha vendido una',
                    update: 'ha Editado un',
                    delete: 'ha eliminado un',
                    put: 'ha Editado un'
                }
            default: 
                return {
                    create: 'ha Creado un',
                    update: 'ha Editado un',
                    delete: 'ha eliminado un',
                    put: 'ha Editado un'
                }
        }
    }
    componentDidUpdate(prevProps){
        let { workflow } = this.props
        if(prevProps.workflow !== workflow){

            const collection = {
                'users': 'Usuario',
                'storehouse': 'Almacen',
                'orders': 'Orden',
                'solOrder': 'solicitud a proveedor',
                'store': 'producto',
                'request': 'colección de telas'
            }
            const fullWorkFlow = workflow.map(element=>{
                const state = this.getAction(element.collection)
                const date = new Date(element.date)
                return {
                    ...element,
                    backup: JSON.parse(element.backup),
                    payload: JSON.parse(element.payload),
                    actor: JSON.parse(element.actor),
                    action: state[element.action],
                    collection: collection[element.collection],
                    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                }
            })
            this.setState({
                workflow: fullWorkFlow,
            })
        }
    }

    showMore(element){
        if(element.collection==='product'){
            
        }
        const labels_backup = []
        const labels_payload = []
        for(let i in element.backup){
            labels_backup.push(i)
        }
        for(let i in element.payload){
            labels_payload.push(i)
        }
        const contain = {
            labels_backup,
            backup: element.backup,
            labels_payload,
            payload: element.payload,
        }
        this.setState({
            isOpen: true,
            show: contain,
        })
    }

    render(){
        return (
            <Fragment>
                {
                    /*<Table 
                        data={ this.state.workflow }
                        cols={[ 
                            { header: 'Responsable', field: 'actor.name' },
                            { header: 'Acción', field: 'action' },
                            { header: 'Colección', field: 'collection' },
                            { header: 'Documento', field: 'document' },
                            { header: 'Fecha', field: 'date' },
                            { header: 'Ver mas', field: '', DOM: ( value )=>this.showMore( value ) },
                        ]}
                        count={5}
                    />*/
                }
                {
                    this.state.workflow.map(item => {
                       return  <div onClick={()=>this.showMore( item )} className="item-workflow">{`${item.actor.name} ${item.action} ${item.collection} el ${item.date}`}</div>
                    })
                }
                <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({ isOpen: !this.state.isOpen})}>
                    <ModalBody>
                        <Row>
                            <Col>
                                <h2>Documento Previo</h2>
                                {
                                    this.state.show.labels_backup.map((label, key)=>{
                                        return <FormGroup  className="my-3" key={key}>
                                            <div className="d-flex justify-content-between">
                                            <FormText>{label.toUpperCase()}</FormText>
                                            </div>
                                            <Input
                                                className="input-transparent pl-3" disabled
                                                value={this.state.show.backup[label]}
                                            />
                                        </FormGroup>
                                    })
                                }
                            </Col>
                            <Col>
                                <h2>Documento actual</h2>
                                {
                                    this.state.show.labels_payload.map((label, key)=>{
                                        return <FormGroup  className="my-3" key={key}>
                                            <div className="d-flex justify-content-between">
                                            <FormText>{label.toUpperCase()}</FormText>
                                            </div>
                                            <Input
                                                className="input-transparent pl-3" disabled
                                                placeholder="Correo electronico" value={this.state.show.payload[label]}
                                            />
                                        </FormGroup>
                                    })
                                }
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = ({ workflow }) => {
    console.log(workflow)
    return { 
        workflow,
     }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getWorkflow: () => dispatch(getWorkflow()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)