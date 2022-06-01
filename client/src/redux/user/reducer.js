import { 
    GET_USER, REG_USER, GET_USERS, UPDATE_USERS
} from '../actions';

const initialState = [];

export default (state = initialState, action) =>{
    switch (action.type) {
        case GET_USER:
            return { ...state, ...action.payload }
        case GET_USERS:
            return [ ...action.payload ]
        case UPDATE_USERS:
            return [ ...action.payload ]
        case REG_USER:
            return { ...state, ...action.payload }
        default:
            return state
    }
}