import axios from 'axios'
import { ADD_FIXEDASSET,
         GET_ERRORS,
         GET_FIXEDASSETS,
         FIXEDASSETS_LOADING,
         DELETE_FIXEDASSETS
        } from './types'

// Add fixedasset
export const addFixedassets = fixedassetsData => dispatch => {
    axios
      .post('/api/fixedassets', fixedassetsData)
      .then(res =>
        dispatch({
          type: ADD_FIXEDASSET,
           payload: res.data
       }
     )
      )
     .catch(err =>
       dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//
// Get fixedassets
export const getFixedassets = () => dispatch => {
  dispatch(setFixedassetsLoading())
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
       payload: null
     })
  )
}

// Delete fixedassets
export const deleteFixedasset = id => dispatch => {
  axios
    .delete(`/api/fixedassets/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_FIXEDASSET,
        payload: id
     }
   )
    )
   .catch(err =>
     dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

// Set loading state
export const setFixedassetsLoading = () => {
  return {
    type: FIXEDASSETS_LOADING
  }
}
