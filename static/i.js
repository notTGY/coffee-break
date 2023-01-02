const startButton = document.getElementById(
  'start-button'
)
const clockButton = document.getElementById(
  'clock'
)
const statsButton = document.getElementById(
  'stats'
)
const infoButton = document.getElementById(
  'info'
)

const EPAGES = {
  CLOCK: 0,
  STATS: 1,
  INFO: 2,
}
const EButtonStates = {
  UP: 0,
  DOWN: 1,
  MOVING_UP: 2,
  MOVING_DOWN: 3,
}
let buttonState
setButtonState(EButtonStates.UP)
function setButtonState(newState) {
  buttonState = newState
  switch (newState) {
    case EButtonStates.UP:
      startButton.classList.remove('button-down')
      startButton.classList.add('button-up')
      startButton.innerHTML = '<span>Начать перерыв</span>'
      break
    case EButtonStates.DOWN:
      startButton.classList.remove('button-up')
      startButton.classList.add('button-down')
      startButton.innerHTML = '<span>Перерыв в процессе</span>'
      break
    case EButtonStates.MOVING_DOWN:
      startButton.classList.remove('button-up')
      startButton.classList.add('button-down')
      startButton.innerHTML = '<div class="loader"/>'
      break
    case EButtonStates.MOVING_UP:
      startButton.classList.remove('button-down')
      startButton.classList.add('button-up')
      startButton.innerHTML = '<div class="loader"/>'
      break
  }
}

async function requestStartRecording() {
  setButtonState(EButtonStates.DOWN)
}
async function requestEndRecording() {
  setButtonState(EButtonStates.UP)
}

startButton.addEventListener('click', e => {
  switch (buttonState) {
    case EButtonStates.UP:
      setButtonState(EButtonStates.MOVING_DOWN)
      requestStartRecording()
      break
    case EButtonStates.DOWN:
      setButtonState(EButtonStates.UP)
      requestEndRecording()
      break
  }
})
