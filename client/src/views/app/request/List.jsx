import { Component } from "react";
import { connect } from 'react-redux'
import { getAllRequest } from '../../../redux/request/actions'
import Table from '../../../components/Table'
class List extends Component {
    constructor(props){
        super(props)
        this.props.getAllRequest()

    }
    render(){
        return (
            <Table 
                    data={this.props.requests} 
                    cols={[ 
                        { header: 'Nombre', field: 'name' },
                        { header: 'Teléfono', field: 'phone' },
                        { header: 'Departamento', field: 'departament' },
                        { header: 'Direccion', field: 'direction' },
                    ]}
                    count={5}
            />
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