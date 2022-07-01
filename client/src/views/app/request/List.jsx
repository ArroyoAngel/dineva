import { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { getAllRequest } from '../../../redux/request/actions'
import Table from '../../../components/Table'
import { Modal, ModalBody, ModalHeader } from "reactstrap";
class List extends Component {
    constructor(props){
        super(props)
        this.props.getAllRequest()

        this.state = {
          isOpen: false,
          request: {
            carrito: []
          }
        }
    }
    showmore(request){
      this.setState({
        isOpen: true,
        request,
      })
    }
    render(){
        return (
            <Fragment>
              <Table 
                  data={this.props.requests} 
                  cols={[ 
                      { header: 'Nombre', field: 'name' },
                      { header: 'Teléfono', field: 'phone' },
                      { header: 'Departamento', field: 'departament' },
                      { header: 'Direccion', field: 'direction' },
                      { header: 'Ver Más', field: '', DOM: (value) => <button onClick={()=>this.showmore(value)}>Ver más</button>},
                  ]}
                  count={5}
              />
              <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({ isOpen: !this.state.isOpen})} size="lg">
                <ModalHeader>
                  <h2>Productos comprados</h2>
                </ModalHeader>
                <ModalBody>
                  <Table 
                      data={this.state.request.carrito} 
                      cols={[ 
                          { header: 'Alias', field: 'alias' },
                          { header: 'Almacen', field: 'almacen' },
                          { header: 'Color', field: 'color' },
                          { header: 'Metraje', field: 'mtr' },
                      ]}
                      count={5}
                  />
                </ModalBody>
              </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return ({
      requests: state.request
    })
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getAllRequest: () => dispatch(getAllRequest()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(List)