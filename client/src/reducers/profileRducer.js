import {GET_PROFILE, GET_PROFILES, PROFILE_CLEAR, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILE_BY_ID} from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case GET_PROFILE:
        case GET_PROFILE_BY_ID:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        
        case GET_PROFILES: {
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        }
        case PROFILE_ERROR: {
            return {
                ...state,
                error: payload,
                loading: false
            }
        }
        case PROFILE_CLEAR: {
            return {
                ...state,
                profile: null,
                loading: false,
                repos: []
            }
        }
        case UPDATE_PROFILE: {
            return {
                ...state,
                profile: payload,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}

export default profileReducer