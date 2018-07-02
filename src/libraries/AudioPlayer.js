const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class AudioPlayer {

  constructor(source){

    this.buffer = null
    this.context = new AudioContext()

    fetch(source)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        this.context.decodeAudioData(arrayBuffer, (buffer)=>{
            this.buffer = buffer
        })
      })
  }

  play() {
    if (!this.buffer) return
    var source = this.context.createBufferSource()
    source.buffer = this.buffer
    source.connect(this.context.destination)
    source.start(0)
  }
}
