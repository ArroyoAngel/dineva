import { 
  GET_REQUEST, REG_REQUEST,
} from '../actions';

const initialState = []

export default (state = initialState, action) =>{
  switch (action.type) {
      case GET_REQUEST:
          return [ ...action.payload ]
      case REG_REQUEST:
          return { ...state, ...action.payload }
      default:
          return state
  }
}