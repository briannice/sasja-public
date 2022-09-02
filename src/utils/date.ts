import moment from 'moment-timezone'

export const formatDate = (date: string, format: string) => {
  return moment(date).tz('Europe/Brussels').format(format)
}
