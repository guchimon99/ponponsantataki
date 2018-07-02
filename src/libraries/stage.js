export const STATUS_HIDDEN = "STATUS_HIDDEN"
export const STATUS_FAKE = "STATUS_FAKE"
export const STATUS_SHOWN = "STATUS_SHOWN"
export const STATUS_HIT = "STATUS_HIT"

const randomIndexes = (size) => {
  var a = new Array(size).fill(null).map((e,i) => i)
  var b = [], c
  for(var i = 0; i < size; i++){
    c = Math.floor(Math.random() * a.length)
    b.push(a.splice(c,1)[0])
  }
  return b
}

export const generateStage = (size = 9, shown = 1, fake = 2, prev = []) => {

  var stage = new Array(size).fill(STATUS_HIDDEN)

  const fakeIndexes = []
  prev.forEach((cell, index) => {
    if (cell === STATUS_FAKE) fakeIndexes.push(index)
  })

  randomIndexes(size).some(i => {
    if (Math.random() < 0.8) {
      stage[i] = STATUS_SHOWN
      shown -= 1
    }
    return shown < 1
  })

  randomIndexes(size).some((i) => {

    if (shown < 1) return true

    if (stage[i] === STATUS_HIDDEN) {
      stage[i] = STATUS_SHOWN
      shown -= 1
    }

    return false
  })

  randomIndexes(size).some((i) => {
    if (fake < 1) return true

    if (stage[i] === STATUS_HIDDEN) {
      stage[i] = STATUS_FAKE
      fake -= 1
    }

    return false
  })

  return stage
}
