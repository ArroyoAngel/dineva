import { Component } from "react";
import { connect } from 'react-redux'

class Register extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <h1>USER REGISTER</h1>
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)