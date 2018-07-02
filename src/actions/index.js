import { authRef, usersRef, snapshotToObj } from '../firebase'
import {
  GAME_CONTROLLER,
  GAME_ACTION_START,
  GAME_ACTION_FINISH,
  GAME_ACTION_WHACK,
} from '../middlewares/game-controller'

import {
  AUDIO_LOADER,
} from '../middlewares/audio-loader'

export const FETCH_AUTH = 'FETCH_AUTH'
export const FETCH_ENTITIES = 'FETCH_ENTITIES'
export const SET_ERROR = 'SET_ERROR'
export const RESET_ERROR = 'RESET_ERROR'

export const fetchAuth = () => dispatch => {
  authRef.onAuthStateChanged( auth => {
    dispatch({ type: FETCH_AUTH, auth })
    if (!auth) { dispatch(signIn()) }
  })
}

export const signIn = () => dispatch =>
  authRef.signInAnonymously().then(({ user }) => {
    const { uid } = user
    dispatch(createUser(uid))
  })

export const createUser = (uid) => () =>
  usersRef.doc(uid).set({
    uid,
    name: "逆神の子",
    score: 0,
    setting: {
      soundEffects: false
    }
  })

export const updateScore = (uid, score) => () =>
  usersRef.doc(uid).set({ score }, { merge: true })

export const updateSetting = (uid, setting) => () =>
  usersRef.doc(uid).set({ setting },{ merge: true })

export const updateName = (uid, name) => () =>
  usersRef.doc(uid).set({ name },{ merge: true })

export const fetchUsers = () => dispatch =>
  usersRef.onSnapshot((snapshot) => {
    dispatch({
      type: FETCH_ENTITIES,
      entities: { users: snapshotToObj(snapshot) }
    })
  })

export const resetError = () => ({
  type: RESET_ERROR
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})

export const LOAD_AUDIOS = 'LOAD_AUDIOS'
export const loadAudios = () => ({
  type: LOAD_AUDIOS,
})

export const UPDATE_GAME = 'UPDATE_GAME'
export const startGame = () => ({
  type: UPDATE_GAME,
  [GAME_CONTROLLER]: {
    type: GAME_ACTION_START
  },
})

export const finishGame = () => ({
  type: UPDATE_GAME,
  [GAME_CONTROLLER]: {
    type: GAME_ACTION_FINISH
  },
})

export const whack = (index) => ({
  type: UPDATE_GAME,
  [GAME_CONTROLLER]: {
    type: GAME_ACTION_WHACK,
    index
  },
})

export const FETCH_AUDIO = 'FETCH_AUDIO'
export const FETCH_AUDIO_START = 'FETCH_AUDIO_START'
export const FETCH_AUDIO_SUCCESS = 'FETCH_AUDIO_SUCCESS'
export const FETCH_AUDIO_FAILURE = 'FETCH_AUDIO_FAILURE'

export const fetchAudio = ({name, source}) => ({
  type: FETCH_AUDIO,
  [AUDIO_LOADER]: {
    types: [
      FETCH_AUDIO_START,
      FETCH_AUDIO_SUCCESS,
      FETCH_AUDIO_FAILURE
    ],
    name,
    source,
  }
})
