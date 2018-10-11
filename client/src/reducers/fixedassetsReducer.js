import { GET_FIXEDASSETS, FIXEDASSETS_LOADING, CLEAR_CURRENT_FIXEDASSETS } from '../actions/types'

const initialState = {
  fixedasset: null,
  fixedassets: null,
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case FIXEDASSETS_LOADING:
       return {
         ...state,
         loading: true
       }
    case GET_FIXEDASSETS:
       return {
         ...state,
         fixedassets: action.payload,
         loading: false
       }
    case CLEAR_CURRENT_FIXEDASSETS:
       return {
         ...state,
         fixedassets: null
       }
    default:
      return state
  }
}