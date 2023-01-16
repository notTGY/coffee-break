import happyFramework from '@happyFramework'
import {
  requestGHToken, getToken, EGH_AUTH,
} from './token.ts'

enum EButtonStates {
  UNKNOWN,
  UP,
  MOVING_DOWN,
  DOWN,
  MOVING_UP,
}

let buttonState = EButtonStates.UNKNOWN

const requestToggleRecording = async () => {
  const token = getToken()
  try {
    const res = await fetch('/api/recording/toggle', {
      method: 'POST',
      body: JSON.stringify({token}),
    })
    const json = await res.json()

    if (json.message === EGH_AUTH) {
      requestGHToken()
    }
  } catch(e) { console.error(e) }
}
const requestButtonStatus = async () => {
  let isRecording
  const token = getToken()
  try {
    const res = await fetch('/api/recording/status', {
      method: 'POST',
      body: JSON.stringify({token}),
    })
    const json = await res.json()
    if (json.message === EGH_AUTH) {
      requestGHToken()
    }
    isRecording = json.res
  } catch(e) { console.error(e) }

  return isRecording
}
const getButtonStatus = async () => {
  const isRecording = await requestButtonStatus()

  newButtonState = isRecording
    ? EButtonStates.DOWN
    : EButtonStates.UP

  if (buttonState === EButtonStates.UNKNOWN) {
    buttonState = newButtonState
    window.rerender()
  }
}

const startRecording = async () => {
  await requestToggleRecording()
  buttonState = EButtonStates.DOWN
  window.rerender()
}
const endRecording = async () => {
  await requestToggleRecording()
  buttonState = EButtonStates.UP
  window.rerender()
}

const OnClickStartButton = () => {
  switch (buttonState) {
    case EButtonStates.UP:
      buttonState = EButtonStates.MOVING_DOWN
      window.rerender()
      startRecording()
      break
    case EButtonStates.DOWN:
      buttonState = EButtonStates.MOVING_UP
      window.rerender()
      endRecording()
      break
  }
}

const StartButton = () => {
  let className, children, disabled
  switch (buttonState) {
    case EButtonStates.UP:
      className = 'button button-up'
      children = <span>Начать перерыв</span>
      disabled = false
      break
    case EButtonStates.DOWN:
      className = 'button button-down'
      children = <span>Перерыв в процессе</span>
      disabled = false
      break
    case EButtonStates.MOVING_DOWN:
      className = 'button button-down'
      children = <div className="loader"/>
      disabled = true
      break
    default:
    case EButtonStates.MOVING_UP:
      className = 'button button-up'
      children = <div className="loader"/>
      disabled = true
      break
  }
  return ({
    elem: 'button',
    onclick: OnClickStartButton,
    className,
    disabled,
    children: [children],
  })
}

export const ClockPage = () => {
  return (
    <div id="root">
      <div className="button-wrapper">
        <StartButton/>
      </div>
    </div>
  )
}

if (buttonState === EButtonStates.UNKNOWN) {
  getButtonStatus()
}
