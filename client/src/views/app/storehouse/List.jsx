import { Component } from "react";
import { connect } from 'react-redux'
import Table from '../../../components/Table'
import { getStorehouse } from '../../../redux/storehouse/actions'
class List extends Component {
    constructor(props){
        super(props)
        this.props.getStorehouse()

        this.edit = this.edit.bind(this)
    }
    edit(id){
        this.props.history.push(`/app/storehouse/edit/${id}`)
    }
    render(){
        return (
            <Table  
                    data={this.props.storehouse.map(item=>({...item, edit: this.edit}))} 
                    count={5}
                    cols={[ 
                        { header: 'Nombre', field: 'name' },
                        { header: 'Dirección', field: 'address' },
                        { header: 'Descripción', field: 'description' },
                        { header: 'Telefono', field: 'phone' },
                    ]}
            />
        )
    }
}
const mapStateToProps = ({ storehouse}) => {
    return { storehouse }
}
const mapDispatchToProps = (dispatch) => {
    return {
      getStorehouse: () => dispatch(getStorehouse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)