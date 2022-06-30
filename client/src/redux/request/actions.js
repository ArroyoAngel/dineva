import {
  GET_REQUEST, GET_REQUEST_BY_ID, REG_REQUEST,
} from '../actions';

import axios from 'axios'
import { addWorkFlow } from '../workflow/actions';
/* GET_USER */
export const getAllRequest = () => async dispatch => {
  const requests = await axios.get(`http://localhost:4000/get/request`).then(values=>values.data).catch(err=>err);
  return dispatch({
      type: GET_REQUEST,
      payload: requests
  })
}
export const regRequest = (payload, history) => async dispatch => {
  const ordersBD = await axios.get(`http://localhost:4000/get/order`).then(values=>values.data).catch(err=>err);
  const orders  = {}
  ordersBD.map(order => {
    orders[order.order] = order.id
  })
  let newPayload = {}
  let prePayload = {}
  for(let producto in payload.carrito){
    let sw = false
    let current = payload.carrito[producto]
    let posOrder = orders[current.order]
    let originalCurrent = ordersBD.find(e=>e.id===posOrder)[current.bale]
    if(!newPayload[posOrder]){
      prePayload[posOrder]={}
      newPayload[posOrder]={}
    }
    prePayload[posOrder][current.bale] = Object.assign({} , originalCurrent)
    newPayload[posOrder][current.bale] = originalCurrent
    newPayload[posOrder][current.bale].pcs--
    newPayload[posOrder][current.bale].specification = originalCurrent.specification.filter(e=>{
      if(e!==current.specification || sw===true){
        return e
      }else{
        sw=true
      }
    })
  }
  const request = await axios.post(`http://localhost:4000/create/request`,payload).then(values=>values.data()).catch(err=>err);
  addWorkFlow('create', 'request', request.id, request)

  await axios.put(`http://localhost:4000/update/store`,{...newPayload}).then(values=>values.data).catch(err=>err);
  addWorkFlow('update', 'store', newPayload, prePayload )
  history.push('/app/request/list')
}

export const getRequestByID = (payload) => async dispatch => {
  let request = await axios.get(`http://localhost:4000/get/request/${payload.id}`).then(values=>values.data).catch(err=>err);
  request = convertJSON_ARRAY(request)
  return dispatch({
      type: GET_REQUEST_BY_ID,
      payload: request
  });
};

const convertJSON_ARRAY = (json) => {
  let array = [];
  for(let key in json){
    array.push(json[key])
  }
  return array;
}