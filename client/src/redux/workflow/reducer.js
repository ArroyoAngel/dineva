import { 
  GET_WORKFLOW, ADD_WORKFLOW
} from '../actions';

const initialState = [];

export default (state = initialState, action) =>{
  let { payload } = action
  console.log('--', payload)
  switch (action.type) {
    case GET_WORKFLOW:
      return [ ...payload ]
    case ADD_WORKFLOW:
      return { ...state, ...payload }
    default:
      return state
  }
}