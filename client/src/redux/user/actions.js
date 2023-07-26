import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
    GET_USER, REG_USER, LOGIN_USER, LOGOUT_USER, GET_USERS
} from '../actions';
import { addWorkFlow } from '../workflow/actions'

/* GET_USER */

export const getUser = (payload) => async dispatch => {
    const user = await axios.get(`http://localhost:4000/get/user/${payload.id}`).then(values=>values.data()).catch(err=>err);
    return dispatch({
        type: GET_USER,
        payload: user
    });
};

export const updateUser = (id, newPayload, history) => async dispatch => {
    const body = {
        cargo: newPayload.cargo,
        ci: newPayload.ci,
        name: newPayload.name,
        lastname: newPayload.lastname,
        phone: newPayload.phone,
    }
    const previous = await axios.get(`http://localhost:4000/get/user/${id}`).then(values=>values.data).catch(err=>err);
    const result = await axios.put(`http://localhost:4000/put/users/${id}`,{...body}).then(values=>values.data).catch(err=>err);
    if(previous!==newPayload){
        addWorkFlow('update', 'users', id, newPayload, previous)
    }
    history.push('/app/user/list')
}

export const getUsers = () => async dispatch => {
    const users = await axios.get(`http://localhost:4000/get/users`).then(values=>values.data).catch(err=>err);
    return dispatch({
        type: GET_USERS,
        payload: users
    });
};

export const regUser = (payload, history) => async dispatch => {
    const user = await axios.post(`http://localhost:4000/create/user`,{...payload }).then(values=>{
        return values.data()
    }).catch(err=>err);
    addWorkFlow('create', 'users', 's/id nuevo', payload, {})
    history.push('/app/user/list')
    /*return dispatch({
        type: REG_USER,
        payload: user
    })*/
}

export const loginUser = (payload) => async dispatch => {
    const data = await axios.post(`http://localhost:4000/authentication/user`,{ user: payload.user, password: payload.password }).then(values=>values.data).catch(err=>err);
    const info = jwt.verify(data, 'keyPassword', (err, decoded)=>{
        if(err){
            localStorage.setItem('user_id', null);
            localStorage.setItem('user_rol', null);
            localStorage.setItem('user_name', null);
            return null
        }else{
            localStorage.setItem('user_id', decoded.data._id);
            localStorage.setItem('user_rol', decoded.data.rol);
            localStorage.setItem('user_name', decoded.data.user);
            return {
                name: decoded.data._id,
                rol: decoded.data.rol,
                user: decoded.data.user,
            }
        }
    })
    window.location.replace('/')
    return dispatch({
        type: LOGIN_USER,
        payload: info
    })
};

export const logoutUser = () => async dispatch => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_rol');
    localStorage.removeItem('user_name');
    window.location.replace('/')
    return dispatch({
        type: LOGOUT_USER,
        payload: null
    })
}