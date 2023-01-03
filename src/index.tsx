import happyFramework from '@happyFramework'
import { ClockPage } from './ClockPage.tsx'
import { StatsPage } from './StatsPage.tsx'
import { InfoPage } from './InfoPage.tsx'

const root = document.getElementById(
  'root'
)

enum EPAGES {
  CLOCK,
  STATS,
  INFO,
}

let page = EPAGES.CLOCK

const App = () => {
  switch (page) {
    case EPAGES.STATS:
      return <StatsPage/>
    case EPAGES.INFO:
      return <InfoPage/>
    default:
    case EPAGES.CLOCK:
      return <ClockPage/>
  }
}

let rerender
root.innerHTML = ''
rerender = happyFramework.init(root, App)

const clockButton = document.getElementById(
  'clock'
)
const statsButton = document.getElementById(
  'stats'
)
const infoButton = document.getElementById(
  'info'
)

clockButton.addEventListener('click', () => {
  page = EPAGES.CLOCK
  rerender()
})
statsButton.addEventListener('click', () => {
  page = EPAGES.STATS
  rerender()
})
infoButton.addEventListener('click', () => {
  page = EPAGES.INFO
  rerender()
})
