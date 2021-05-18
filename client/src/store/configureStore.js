import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from '../reducers/rootReducer'

const initialState = {}

const configureStore = createStore( rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))


export default configureStore