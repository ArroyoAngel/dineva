import { 
  GET_STOREHOUSE, REG_STOREHOUSE,
} from '../actions';
import { store1, store2, store} from '../../helpers/db'


const initialState = []

export default (state = initialState, action) =>{
  switch (action.type) {
      case GET_STOREHOUSE:
          return [ ...action.payload ]
      case REG_STOREHOUSE:
          return [ ...state, ...action.payload ]
      default:
          return state
  }
}