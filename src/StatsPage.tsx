import happyFramework from '@happyFramework'
import {
  requestGHToken, getToken, EGH_AUTH,
} from './token.ts'
import { getTimes, MS_IN_DAY } from './utils.ts'

const DESCRIPTION_TEXT =
`Нажми на характеристику чтобы увидеть её статистику по дням недели.
Время отображается в минутах.
`

enum ESTAT_TYPE {
  NONE,
  COUNT = 'c',
  LENGTH = 'l',
  DELAY = 'd',
  CHILL = 'i',
}

const STAT_TYPES = [
  ESTAT_TYPE.COUNT,
  ESTAT_TYPE.LENGTH,
  ESTAT_TYPE.DELAY,
  ESTAT_TYPE.CHILL,
]

const STAT_TEXT = {
  [ESTAT_TYPE.COUNT]: 'число перерывов',
  [ESTAT_TYPE.LENGTH]: 'средняя длина перерывов',
  [ESTAT_TYPE.DELAY]: 'среднее время между перерывами',
  [ESTAT_TYPE.CHILL]: 'индекс зачилленности',
}

const STAT_COLOR = {
  [ESTAT_TYPE.COUNT]: '#8338ec',
  [ESTAT_TYPE.LENGTH]: '#3a86ff',
  [ESTAT_TYPE.DELAY]: '#465f2a',
  [ESTAT_TYPE.CHILL]: '#71b48d',
}

let day = new Date()
let selectedStat = ESTAT_TYPE.NONE
const cache = {}

const format = (value, stat) => {
  if (value == null) return null

  switch (stat) {
    case ESTAT_TYPE.DELAY:
    case ESTAT_TYPE.LENGTH:
      return Math.ceil(Number(value) / 60000).toString()
      break
    case ESTAT_TYPE.CHILL:
      return `${value}%`
      break
    default:
    case ESTAT_TYPE.COUNT:
      return value.toString()
      break
  }
}

const requestStats = async (start) => {
  const token = getToken()
  try {
    const res = await fetch('/api/stats', {
      method: 'POST',
      body: JSON.stringify({token, start}),
    })
    const json = await res.json()

    if (json.message === EGH_AUTH) {
      requestGHToken()
    }

    return json.res
  } catch(e) { console.error(e) }
}

const getData = () => {
  const { weekStart } = getTimes(day)
  const start = weekStart.valueOf()
  if (cache[start]) {
    return cache[start]
  }
  requestStats(start)
    .then(res => {
      cache[start] = res
      if (res) {
        window.rerender()
      }
    })
  return cache[start] = {}
}

const Pager = () => {
  const {
    weekStart,
    weekEnd,
    next,
    prev,
  } = getTimes(day)
  return (
    <div className="pager-row">
      <button
        className="pager"
        onclick={() => day = prev}
        innerText="<"
      />
      <span
        className="pager-date"
        onclick={() => day = new Date()}
      >
        {weekStart.toLocaleDateString()}
        -
        {weekEnd.toLocaleDateString()}
      </span>
      <button
        className="pager"
        onclick={() => day = next}
        innerText=">"
      />
    </div>
  )
}
const Description = () => {
  return (
    <div
      className="stats-description"
      innerText={DESCRIPTION_TEXT}
    />
  )
}

const SelectOption = ({stat, data}) => {
  return (
    <button
      className="selector-card"
      onclick={() => {
        if (stat != selectedStat) {
          selectedStat = stat
        } else {
          selectedStat = ESTAT_TYPE.NONE
        }
      }}
    >
      <span
        innerText={STAT_TEXT[stat]}
      />
      <div className="selector-data-placeholder">
        {
          data != null
            ? (
            <span
              className="selector-data"
              innerText={format(data, stat)}
              style={`color:${STAT_COLOR[stat]}`}
            />
            ) : <div className="loader"/>
        }
      </div>
    </button>
  )
}
const Selector = ({data}) => {
  return {
    elem: 'div',
    className: 'selector',
    children: STAT_TYPES.map(
      (stat) => (
        <SelectOption
          stat={stat}
          data={data ? data[stat] : null}
        />
      )
    )
  }
}


const InfoCircle = (data, index) => {
  const { weekStart } = getTimes(day)
  const thatDay = new Date(
    weekStart.valueOf() + index * MS_IN_DAY
  )
  return (
    <div
      style={`color:${STAT_COLOR[selectedStat]}`}
      className="info-circle-wrapper"
    >
      <div
        style={`border-bottom-color:${STAT_COLOR[selectedStat]}`}
        className="info-circle"
      >
        {data != null ? data : <div className="loader"/>}
      </div>
      <span>{thatDay.toLocaleDateString(
        undefined,
        {day: 'numeric', month: 'short', }
      )}</span>
    </div>
  )
}
const DetailedData = ({data}) => {
  const selectedData = data ? data[selectedStat] : null
  let sanitizedData = selectedData || new Array(7).fill(null, 0, 7)
  if (selectedStat === ESTAT_TYPE.NONE) {
    sanitizedData = []
  }
  const readyData = sanitizedData.map(
    data => format(data, selectedStat)
  )
  return {
    elem: 'div',
    className: 'detailed-data',
    children: readyData.map(InfoCircle)
  }
}

export const StatsPage = () => {
  const {
    week,
    day,
  } = getData()

  return (
    <div id="root">
      <div className="stats-wrapper">
        <Pager/>
        <Description/>
        <Selector data={week}/>
        <DetailedData data={day}/>
      </div>
    </div>
  )
}
