import moment from 'moment-timezone'

export const formatDate = (date: string, format: string) => {
  return moment(date).tz('Europe/Brussels').format(format)
}

export const getWeekDayFromDate = (date: string) => {
  const weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
  const d = new Date(date)
  return weekdays[d.getDay()]
}

export const getMonthFromDate = (date: string) => {
  const months = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'December',
  ]
  const d = new Date(date)
  return months[d.getMonth()]
}

export const getDateRangeForGamesOverview = (weeks: number) => {
  const current_date = new Date()
  const week_day = current_date.getDay()
  const day_difference = current_date.getDate() - week_day + (week_day == 0 ? -6 : 1)
  const start_date = new Date(current_date.setDate(day_difference))
  const start_date_str = `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`
  let end_date_str = null
  if (weeks == 0) {
    const copy_start_date = new Date(start_date.getTime())
    const end_date = new Date(copy_start_date.setDate(copy_start_date.getDate() + weeks * 7 - 1))
    end_date_str = `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`
  }
  return [
    start_date_str,
    end_date_str
  ]
}

export const getWeekNumberForGamesOverview = (start_date: string, date: string) => {
  const start = new Date(start_date)
  const current = new Date(date)
  const diff = Math.ceil(Math.abs(current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) - 1
  return Math.floor(diff / 7)
}
