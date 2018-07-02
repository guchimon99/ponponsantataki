import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import gameController from '../middlewares/game-controller'
import audioLoader from '../middlewares/audio-loader'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, gameController, audioLoader)
)

export default configureStore
