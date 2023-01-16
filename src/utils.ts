// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
export const MS_IN_DAY = 86400000
export const getTimes = (date) => {
  const startDay = 1
  const d = date.getDay()
  const dayOffset = d <= 0
    ? 7 - startDay
    : d - startDay

  const weekStartTime =
    date.valueOf() - dayOffset*MS_IN_DAY
  const weekStart = new Date(weekStartTime)
  const weekEnd = new Date(
    weekStartTime + 6*MS_IN_DAY
  )
  const prev = new Date(weekStartTime - 6*MS_IN_DAY)
  const next = new Date(weekStartTime + 8*MS_IN_DAY)

  return {
    weekStart,
    weekEnd,
    prev,
    next,
  }
}
