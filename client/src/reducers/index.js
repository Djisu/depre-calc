import {
  combineReducers
} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import fixedassetsReducer from './fixedassetsReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  fixedassets: fixedassetsReducer
})