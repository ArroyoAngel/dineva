import { 
  GET_ORDER, REG_ORDER, REG_SOLORDER, GET_SOLORDER
} from '../actions';

const initialState = []

export default (state = initialState, action) =>{
  let { payload } = action
  if(!payload)payload={}
  switch (action.type) {
      case GET_ORDER:
          return [ ...action.payload ]
      case REG_ORDER:
          return [ ...state, ...payload ]
    default:
        return state
  }
}