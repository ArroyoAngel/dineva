import {
  GET_ORDER, REG_ORDER, GET_SOLORDER, GET_ORDER_BY_ID,
} from '../actions';
import { convert } from '../../helpers/metada'

import axios from 'axios'
import { addWorkFlow } from '../workflow/actions';
/* GET_USER */

export const regOrder = (payload) => async dispatch => {
  let fileData = await convert(payload.file.xlsx)
  let sendFile = {
    data: fileData,
    name: payload.file.name,
    type: payload.file.type
  }
  for(let producto in payload.file.json){
    payload.file.json[producto].alias=payload.alias
  }
  payload.provider = payload.provider.value
  payload = { ...payload, ...payload.file.json }
  //CORREGIR A GET_BY_UID
  let storehouses = await axios.get(`http://localhost:4000/get/storehouse`).then(values=>values.data).catch(err=>err);
  let store = await storehouses.find(e=>e.id===payload.storehouse).store
  store = store?store:[]
  store.push(payload.order)
  await axios.put(`http://localhost:4000/put/storehouse/${payload.storehouse}`,{...storehouses.find(e=>e.id===payload.storehouse)}).then(values=>values.data).catch(err=>err);
  //FIN CORREGIR
  payload.file = await axios.post(`http://localhost:4000/upload`,{...sendFile}).then(values=>values.data).catch(err=>err);
  const order = await axios.post(`http://localhost:4000/create/order`,payload).then(values=>values.data()).catch(err=>err);
  addWorkFlow('create', 'order', order.id, order)
}

export const getAllOrder = () => async dispatch => {
  let orders = await axios.get(`http://localhost:4000/get/order`).then(values=>values.data).catch(err=>err);
  return dispatch({
      type: GET_ORDER,
      payload: orders
  })
}

export const getOrderByID = (payload) => async dispatch => {
  let order = await axios.get(`http://localhost:4000/order/${payload.id}`).then(values=>values.data).catch(err=>err);
  order = convertJSON_ARRAY(order)
  return dispatch({
      type: GET_ORDER_BY_ID,
      payload: order
  });
};

const convertJSON_ARRAY = (json) => {
  let array = [];
  for(let key in json){
    array.push(json[key])
  }
  return array;
}