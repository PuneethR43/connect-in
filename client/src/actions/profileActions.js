import axios from 'axios'
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, PROFILE_CLEAR, GET_PROFILES} from './types'
import {setAlert} from './alertActions'

// GET CURRENTLY LOGGED-IN USER PROFILE
export const getProfile = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// POST CREATE/UPDATE USER PROFILE
export const createProfile = (formData, history, edit=false) => async(dispatch) => {
    try {
        const res = await axios.post('/api/profile', formData)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        if(!edit){
            history.push('/dashboard')
        }

    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// GET ALL PROFILES
export const getAllProfiles = () => async(dispatch) => {
    dispatch({type: PROFILE_CLEAR}) // To remove previous user profile from all profiles 
    try {
        const res = await axios.get('/api/profile/profiles')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// GET PROFILE BY ID
export const getProfileById = (userId) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            msg: error.response.statusText,
            status: error.response.status
        })
    }
}


// PUT ADD EXPERIENCE
export const addExperience = (formData, history) => async(dispatch) => {
    try {
        const res = await axios.put('/api/profile/experience', formData)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added', 'success'))

        history.push('/dashboard')

    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// PUT ADD EDUCATION
export const addEducation = (formData, history) => async(dispatch) => {
    try {
        const res = await axios.put('/api/profile/education', formData)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added', 'success'))

        history.push('/dashboard')

    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// DELETE EXPERIENCE
export const deleteExperience = (exp_id) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${exp_id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// DELETE EDUCATION
export const deleteEducation = (edu_id) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${edu_id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                message: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// DELETE ACCOUNT & CLEAR PROFILE
export const deleteAccount = () => async(dispatch) => {
    if(window.confirm('Are you sure?')){
        try {
            await axios.delete(`/api/profile`)

            dispatch({type: PROFILE_CLEAR})
            dispatch({type: ACCOUNT_DELETED})
            dispatch(setAlert('Your Account has been permenantly Deleted'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { 
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}