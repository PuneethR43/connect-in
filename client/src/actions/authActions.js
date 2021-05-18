import axios from 'axios'
import { REGISTER_FAILED, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT_SUCCESS, PROFILE_CLEAR } from './types'
import {setAlert} from './alertActions'
import setAuthToken from '../utils/setAuthToken'

// LOAD USER
export const loadUser = () => async(dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
} 

// REGISTER USER
export const register = (formData) => async(dispatch) => {
    try {
        const res = await axios.post('/api/users', formData)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Registered Successfuly', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAILED
        })
    }
}

// LOGIN USER
export const login = (formData) => async(dispatch) => {
    try {
        const res = await axios.post('/api/auth', formData)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Logged-in Successfuly', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// LOGOUT USER
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
    dispatch({
        type: PROFILE_CLEAR
    })
}