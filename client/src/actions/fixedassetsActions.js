import axios from 'axios'
import {
  GET_FIXEDASSETS,
  FIXEDASSETS_LOADING,
  CLEAR_CURRENT_FIXEDASSETS,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types'

// Get all fixedassets
export const getFixedassets= () => dispatch => {
  console.log('in getFixedassets in fixedassetsActions')
  dispatch(setFixedassetLoading())
  axios
  .get('/api/Fixedassets/all')
  .then(res =>
    dispatch({
      type: GET_FIXEDASSETS,
      payload: res.data
    }))
  .catch(err =>
    dispatch({
      type: GET_FIXEDASSETS,
      payload: null
    }))
}



//Get current fixedassets
export const getCurrentFixedassets = () => dispatch => {
  dispatch(setFixedassetLoading())
  axios
    .get('/api/fixedassets')
    .then(res =>
      dispatch({
        type: GET_FIXEDASSETS,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_FIXEDASSETS,
        payload: null
      })
    )
}
// Get posts
export const getAllFixedassets = () => dispatch => {
  axios
    .get('/api/fixedassets')
    .then(res =>
      dispatch({
        type: GET_FIXEDASSETS,
        payload: res.data
     }
   )
    )
   .catch(err =>
     dispatch({
       type: GET_FIXEDASSETS,
       payload: {}
     })
  )
}


//Create fixedassets
export const createFixedassets = (fixedassetsData, history) => dispatch => {
  axios
    .post('/api/fixedassets', fixedassetsData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

// Delete account and profile
export const deleteFixedassets = (fixedassetId) => dispatch => {
  if (window.confirm('Are you sure? This can NOT be done')) {
    axios
      //.delete('/api/fixedassets')
      .delete(`/api/fixedassets/${fixedassetId}`)
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}
//Fixedassets loading
export const setFixedassetLoading  = () => {
  return {
    type: FIXEDASSETS_LOADING
  }
}

//Clear profile
export const clearCurrentFixedassets = () => {
  return {
    type: CLEAR_CURRENT_FIXEDASSETS
  }
}