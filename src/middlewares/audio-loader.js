const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext()

class AudioPlayer {

  constructor(context){
    this.buffer = null
    this.context = context
  }

  async init (source) {
    const response = await fetch(source)
    const arrayBuffer = await response.arrayBuffer()
    this.buffer = await this.context.decodeAudioData(arrayBuffer)
    return
  }

  play() {
    if (!this.buffer) return

    var source = this.context.createBufferSource()
    source.buffer = this.buffer
    source.connect(this.context.destination)
    source.start(0)
  }
}

async function fetchAudio (source) {
  const audioPlayer = new AudioPlayer(context)
  audioPlayer.init(source)
  return audioPlayer
}

export const AUDIO_LOADER = 'Audio Loader'

const audioLoader = () => next => action => {

  const aAction = action[AUDIO_LOADER]
  if (!aAction) return next(action)

  const { name, source, types } = aAction

  const START_TYPE = types[0]
  const SUCCESS_TYPE = types[1]
  const FAILURE_TYPE = types[2]

  next({
    type: START_TYPE,
    name,
  })

  return fetchAudio(source)
    .then((player) => next({ type: SUCCESS_TYPE, name, player }))
    .catch((error) => next({ type: FAILURE_TYPE, name, error }))
}

export default audioLoader
