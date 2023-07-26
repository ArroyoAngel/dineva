import {
    GET_SOLORDER, GET_SOLORDER_BY_ID,
} from '../actions';
import { convert } from '../../helpers/metada'
  
import axios from 'axios'
import { addWorkFlow } from '../workflow/actions';
/* GET_USER */
 
export const regSolOrder = (payload, history) => async dispatch => {
    let imageData = await convert(payload.image)
    let sendImage = {
      data: imageData,
      name: payload.image.name,
      type: payload.image.type
    }
  
    /* URL DEL DOCUMENTO CUALQUIERA */
    payload.image = await axios.post(`http://localhost:4000/upload`,{...sendImage}).then(values=>values.data).catch(err=>err);
    /**ADJUNTAR ESTE URL AL REGISTRO QUE DESEAS */
    const requeriment = await axios.post(`http://localhost:4000/create/solOrder`,{...payload}).then(values=>values.data).catch(err=>err);
    addWorkFlow('create', 'solOrder', requeriment.id, payload, {})
    history.push('/app/order/request-list')
}


export const updSolOrder = async (payload, history) => {
    /*const dataset = []
    
    for(const image of payload.cartulina){
      const temp = await convert(image)
      dataset.push({
        data: temp, 
        name: image.name,
        type: image.type,
      })
    }*/
    const prePayload = Object.assign({} , payload)
    /*payload.cartulina = []
    for(let i=0; i<dataset.length; i++){
      const URL = await axios.post(`http://localhost:4000/upload`,{...dataset[i]}).then(values=>values.data).catch(err=>err);
      payload.cartulina.push(URL)
    }*/
    const previous = await axios.get(`http://localhost:4000/get/solOrder/${payload.code}`).then(values=>values.data).catch(err=>err);
    const requeriment = await axios.put(`http://localhost:4000/put/solOrder/${payload.code}`,{...payload}).then(values=>values.data).catch(err=>err);
    addWorkFlow('put','solOrder', payload.code, previous, { ...previous, ...payload})

    window.location.replace('/app/order/register')
}

export const getAllReq = () => async dispatch => {
  let request = await axios.get(`http://localhost:4000/get/solOrder`).then(values=>values.data).catch(err=>err);
  if(!Array.isArray(request))request=[]
    return dispatch({
        type: GET_SOLORDER,
        payload: request
    })
}

export const getSolOrderByID = (payload) => async dispatch => {
    let solOrder = await axios.get(`http://localhost:4000/get/solOrder/${payload.id}`).then(values=>values.data).catch(err=>err);
    solOrder = convertJSON_ARRAY(solOrder)
    return dispatch({
        type: GET_SOLORDER_BY_ID,
        payload: solOrder
    });
};

const convertJSON_ARRAY = (json) => {
  let array = [];
  for(let key in json){
    array.push(json[key])
  }
  return array;
}