import { 
    REG_SOLORDER, GET_SOLORDER
} from '../actions';
  
const initialState = []
  
export default (state = initialState, action) =>{
    let { payload } = action
    if(!payload)payload = {}
    switch (action.type) {
        case REG_SOLORDER:
            return { ...state, ...payload }
        case GET_SOLORDER:
            return [...payload]
        default:
            return state
    }
}