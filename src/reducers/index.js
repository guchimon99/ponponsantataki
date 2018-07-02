import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

const initialEntities = {
  users: {}
}

const auth = (state = null, action) => {
  if (action.type === ActionTypes.FETCH_AUTH) {
    return action.auth
  }
  return state
}

const game = (state = null, action) => {
  if (action.type === ActionTypes.UPDATE_GAME) return action.game
  return state
}

const entities = (state = initialEntities, action) => {

  if (action.entities) {
    return merge({}, state, action.entities)
  }

  return state
}

const error = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR) {
    return null
  } else if (error) {
    return error
  }

  return state
}

const audios = (state = null, action) => {

  if (action.type === ActionTypes.FETCH_AUDIO_START) {
    state = state || {}
    state[action.name] = null
  } else if (action.type === ActionTypes.FETCH_AUDIO_SUCCESS) {
    state[action.name] = action.player
  } else if (action.type === ActionTypes.FETCH_AUDIO_FAILURE) {
    delete [action.name]
  }

  return state
}

const rootReducer = combineReducers({
  auth,
  game,
  entities,
  audios,
  error
})

export default rootReducer
