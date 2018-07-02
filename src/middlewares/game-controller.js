import {
  generateStage,
  STATUS_SHOWN,
  STATUS_HIT,
  STATUS_HIDDEN
} from '../libraries/stage'

export const GAME_CONTROLLER = '[Game Controller]'
export const GAME_ACTION_START = 'GAME_ACTION_START'
export const GAME_ACTION_FINISH = 'GAME_ACTION_FINISH'
export const GAME_ACTION_WHACK = 'GAME_ACTION_WHACK'

var timer = null

export const state = {}

const TICK_INTERVAL = 50
const REFRESH_INTERVAL = 3000
const DEFAULT_FINISH_TIME = 5000
const REACTION_TIME = 100
const STAGE_SIZE = 16
const SHOWN_COUNT = 1

const fakeCount = (size, score) => {
  const count = Math.floor(score / 5) + 1
  return Math.min(Math.floor(size / 2 - 1), count)
}

const stateToGame = (state) => {

  const game = {
    score: state.score,
    restTime: state.finishTime - state.time,
    stage: state.stage,
    isOver: state.isOver
  }

  return game
}

const start = (update) => {
  if (timer) clearTimeout(timer)

  state.time = 0
  state.score = 0
  state.finishTime = DEFAULT_FINISH_TIME
  state.refreshTime = REFRESH_INTERVAL
  state.isOver = false
  state.fakeCount = 0
  state.stage = generateStage(STAGE_SIZE, SHOWN_COUNT, fakeCount(STAGE_SIZE, state.score).fakeCount, [])

  tick(update)
}

const tick = (update) => {

  const { time, finishTime } = state
  if (time > finishTime) {
    state.isOver = true
    update(stateToGame(state))
    return
  }

  const { refreshTime } = state
  if (time > refreshTime) {
    state.refreshTime = time + REFRESH_INTERVAL
    state.stage = generateStage(STAGE_SIZE, SHOWN_COUNT, fakeCount(STAGE_SIZE, state.score), state.stage)
  }

  state.time = time + TICK_INTERVAL

  update(stateToGame(state))
  timer = setTimeout(() => tick(update), TICK_INTERVAL)
}

async function whack (index) {

  const stage = [].concat(state.stage)

  if (stage[index] === STATUS_SHOWN) {
    stage[index] = STATUS_HIT
    state.stage = stage
    state.finishTime += 700
    state.score += 1
    state.refreshTime = state.time + REACTION_TIME
  } else {
    stage[index] = STATUS_HIDDEN
    state.stage = stage
    state.finishTime -= 300
    state.score = Math.max(0, state.score - 1)
  }

  return stateToGame(state)
}

async function finish () {
  return null
}

const gameController = () => next => action => {

  const gAction = action[GAME_CONTROLLER]
  if (!gAction) return next(action)

  if (gAction.type === GAME_ACTION_START) {
    return start((game) => next({
      type: action.type,
      game,
    }))
  }
  else if (gAction.type === GAME_ACTION_FINISH) {
    return finish().then((game) => next({
      type: action.type,
      game,
    }))
  }
  else if (gAction.type === GAME_ACTION_WHACK) {
    return whack(gAction.index).then((game) => next({
      type: action.type,
      game
    }))
  }

  return next(action)
}

export default gameController
