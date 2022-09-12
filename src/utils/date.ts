import moment from 'moment-timezone'

export const formatDate = (date: string, format: string) => {
  return moment(date).tz('Europe/Brussels').format(format)
}

export const getDateRangeForGamesOverview = (weeks: number) => {
  const current_date = new Date()
  const week_day = current_date.getDay()
  const day_difference = current_date.getDate() - week_day + (week_day == 0 ? -6 : 1)
  const start_date = new Date(current_date.setDate(day_difference))
  const copy_start_date = new Date(start_date.getTime())
  const end_date = new Date(copy_start_date.setDate(copy_start_date.getDate() + weeks * 7 - 1))
  const result = [
    `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`,
    `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`,
  ]
  return result
}

export const getWeekNumberForGamesOverview = (start_date: string, date: string) => {
  const start = new Date(start_date)
  const current = new Date(date)
  const diff = Math.ceil(Math.abs(current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) - 1
  return Math.floor(diff / 7)
}
