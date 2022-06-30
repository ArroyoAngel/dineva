import { Component } from "react";
import { connect } from 'react-redux'
import Table from '../../../components/Table'
import { getAllOrder } from '../../../redux/order/actions'
import { getStorehouse } from '../../../redux/storehouse/actions'
class List extends Component {
    constructor(props){
        super(props)
        this.props.getAllOrder()
        this.props.getStorehouse()
        this.state = {
            orders: []
        }
    }

    componentDidUpdate(prevPros, prevState){
        const { order, storehouse }= this.props
        if(order!==prevPros.order){
          const newOrder = order.map(element=>{
            const date = new Date(element.create)
            return {
              ...element,
              create: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
            }
          })
          this.setState({orders: newOrder})
        }
        if(storehouse!==prevPros.storehouse){
            const newOrders = order.map(element=>{
                const store = storehouse.find(e=>e.id === element.storehouse)
                return {
                    ...element,
                    storehouse: store
                }
            })
            this.setState({
                orders: newOrders,
                storehouse: storehouse
            })
        }
    }
    
    render(){
        return (
            <Table 
                    data={this.state.orders} 
                    cols={[ 
                        { header: 'Nombre', field: 'order' },
                        { header: 'Fecha de registro', field: 'create' },
                        { header: 'Alias', field: 'alias' },
                        { header: 'Proveedor', field: 'provider' },
                        { header: 'Almacén', field: 'storehouse.name' },
                    ]}
                    count={5}
            />
        )
    }
}
const mapStateToProps = (state) =>{
    return ({
      order: state.order,
      storehouse: state.storehouse
    })
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getAllOrder: () => dispatch(getAllOrder()),
      getStorehouse: () => dispatch(getStorehouse())
      //updSolOrder: (values) => dispatch(updSolOrder(values)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(List)