import axios from 'axios'
import { GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  SET_CURRENT_USER } from './types'

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// GET profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
    )
    .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: null
        })
    )
}

// Add Fixedassets
export const addFixedassets = (expData, history) => dispatch => {
  axios
  .post('/api/profile/fixedassets', expData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// Delete account and profile
export const deleteAccount =  () => dispatch => {
  if(window.confirm('Are you sure? This can NOT be done')){
    axios
      .delete('/api/profile')
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
// Delete Fixedassets
export const deleteFixedassets = (id) => dispatch => {
  axios
  .delete(`/api/profile/fixedassets/${id}`)
  .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Get Fixedassets
export const getFixedassets = (id) => dispatch => {
  axios
  .delete(`/api/profile/fixedassets/${id}`)
  .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
  .get('/api/profile/all')
  .then(res =>
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
  .catch(err =>
    dispatch({
      type: GET_PROFILES,
      payload: null
    }))
}

//Clear profile
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}