import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
    GET_WORKFLOW
} from '../actions';

export const getWorkflow = () => async dispatch => {
    let workflow = await axios.get(`http://localhost:4000/get/workflow`).then(values=>values.data).catch(err=>err);
    if(!Array.isArray(workflow))workflow=[]
    
    return dispatch({
        type: GET_WORKFLOW,
        payload: workflow
    });
};

export const addWorkFlow = async (action, collection, document, body=null, prev=null) => {
    const actor = {
        id: localStorage.getItem('user_id'),
        rol: localStorage.getItem('user_rol'),
        name: localStorage.getItem('user_name'),
    }
    const payload = {
        date: new Date(),
        actor: JSON.stringify(actor),
        collection: collection,
        document: document,
        backup: JSON.stringify(prev),
        payload: JSON.stringify(body),
        action: action
    }
    await axios.post(`http://localhost:4000/create/workflow`,{...payload }).then(values=>values.data()).catch(err=>err);
}