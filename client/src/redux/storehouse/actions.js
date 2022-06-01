import {
  GET_STOREHOUSE, GET_STOREHOUSE_BY_ID, REG_STOREHOUSE,
} from '../actions';
import axios from 'axios'
import { addWorkFlow } from '../workflow/actions'

export const getStorehouse = () => async dispatch => {
  const storehouses = await axios.get(`http://localhost:4000/get/storehouse`).then(values=>values.data).catch(err=>err);
  return dispatch({
      type: GET_STOREHOUSE,
      payload: storehouses
  })
}
export const regStorehouse = (payload) => async dispatch => {
  const storehouse = await axios.post(`http://localhost:4000/create/storehouse`,payload).then(values=>values.data).catch(err=>err);
  addWorkFlow('create', 'storehouse', storehouse.id, storehouse)
  return dispatch({
      type: REG_STOREHOUSE,
      payload: storehouse
  })
}
export const getStorehouseByID = (payload) => async dispatch => {
  let storehouse = await axios.get(`http://localhost:4000/get/storehouse/${payload.id}`).then(values=>values.data).catch(err=>err);
  storehouse = convertJSON_ARRAY(storehouse)
  return dispatch({
      type: GET_STOREHOUSE_BY_ID,
      payload: storehouse
  });
};

const convertJSON_ARRAY = (json) => {
  let array = [];
  for(let key in json){
    array.push(json[key])
  }
  return array;
}