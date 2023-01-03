import happyFramework from '@happyFramework'
import { setToken, getToken } from './token.ts'

enum EButtonStates {
  UP,
  DOWN,
  MOVING_UP,
  MOVING_DOWN,
}

let buttonState = EButtonStates.UP

async function requestStartRecording() {
  const token = getToken()
  const res = await fetch('/api/start-recording', {
    method: 'POST',
    body: JSON.stringify(token),
  })
  const json = await res.json()
  setToken(json.token)
  buttonState = EButtonStates.DOWN
}
async function requestEndRecording() {
  const token = getToken()
  const res = await fetch('/api/end-recording', {
    method: 'POST',
    body: JSON.stringify(token),
  })
  const json = await res.json()
  setToken(json.token)
  buttonState = EButtonStates.UP
}

const OnClickStartButton = () => {
  switch (buttonState) {
    case EButtonStates.UP:
      buttonState = EButtonStates.MOVING_DOWN
      requestStartRecording()
      break
    case EButtonStates.DOWN:
      buttonState = EButtonStates.MOVING_UP
      requestEndRecording()
      break
  }
}

const StartButton = () => {
  let className, children
  switch (buttonState) {
    case EButtonStates.UP:
      className = 'button button-up'
      children = <span>Начать перерыв</span>
      break
    case EButtonStates.DOWN:
      className = 'button button-down'
      children = <span>Перерыв в процессе</span>
      break
    case EButtonStates.MOVING_DOWN:
      className = 'button button-down'
      children = <div className="loader"/>
      break
    default:
    case EButtonStates.MOVING_UP:
      className = 'button button-up'
      children = <div className="loader"/>
      break
  }
  return ({
    elem: 'button',
    onclick: OnClickStartButton,
    className,
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
