import { Component } from "react";
import { connect } from 'react-redux'
import { getUsers } from '../../../redux/user/actions'
import Table from '../../../components/Table'
class List extends Component {
    constructor(props){
        super(props)
        this.props.getUsers()

        this.edit = this.edit.bind(this)
    }
    
    edit(id){
        this.props.history.push(`/app/user/update/${id}`)
    }
    render(){
        return (
            <Table 
                    data={this.props.users.map(item=>({...item, edit: this.edit}))} 
                    cols={[ 
                        { header: 'Cargo', field: 'cargo' },
                        { header: 'Carnet de identidad', field: 'ci' },
                        { header: 'Nombre', field: 'name' },
                        { header: 'Telefono', field: 'phone' },
                    ]}
                    count={5}
            />
        )
    }
}
const mapStateToProps = (state) =>{

    return ({
      users: state.user
    })
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch(getUsers()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(List)