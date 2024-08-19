import { GameDay, GameModel, TeamCompetition } from '@/types/models'
import {
  getHandballBelgiumCalendar,
  getHandballBelgiumCalendarFull,
  getFutureHandballBelgiumGames,
} from '@/services/hb/calendar'
import {
  getFileBasedCalendar,
  getFileBasedCalendarFull,
  getFutureFileBasedGames,
} from '@/services/filebased/calendar'
import { getFutureHandbalNlGames,
  getHandbalNlCalendar,
  getHandbalNlCalendarFull
} from '@/services/handbalnl/calendar'
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'
import { HANDBALNL_BASED_COMPETITIONS } from '@/services/handbalnl/competitions'


export const getCompetitionCalendar = async (competition: TeamCompetition) => {
  return FILE_BASED_COMPETITIONS.some(other => other.name === competition.name) ?
    getFileBasedCalendar(competition) :
    (HANDBALNL_BASED_COMPETITIONS.some(other => other.name === competition.name)) ?
      getHandbalNlCalendar(competition) :
      getHandballBelgiumCalendar(competition.serieId)
}

export const getCompetitionCalendarFull = async (competition: TeamCompetition) => {
  const games = FILE_BASED_COMPETITIONS.some(other => other.name === competition.name) ?
    getFileBasedCalendarFull(competition) :
    (HANDBALNL_BASED_COMPETITIONS.some(other => other.name === competition.name)) ?
      getHandbalNlCalendarFull(competition) :
      getHandballBelgiumCalendarFull(competition.serieId)

  return games.then((games) => {
    const gameDays: GameDay[] = []

    let last_date = ''
    games.forEach((game) => {
      if (game.date === last_date) {
        gameDays[gameDays.length - 1].games.push(game)
      } else {
        gameDays.push({ date: game.date, games: [game] })
        last_date = game.date
      }
    })
    return gameDays
  })
}

export const getFutureGames = async () => {
  return Promise.all([getFutureHandballBelgiumGames(), getFutureFileBasedGames(), getFutureHandbalNlGames()])
    .then((games) => games.flat())
    .then((games) => {
      // sort by key, given us an object with key being the date and the value the array of games
      const groupByDate = games.reduce((acc, game) => {
        const key = game.date
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(game)
        return acc
      }, {} as { [key: string]: GameModel[] })
      // transform the object to an array of GameDay objects, sorted on date and with sorted games on time.
      return Object.entries(groupByDate).map(
        ([date, games]) =>
          ({
            date: date,
            games: games.sort(
              (game1, game2) =>
                game1.time && game2.time ? game1.time.localeCompare(game2.time) : 0),
          }),
      ).sort(
        (day1, day2) =>
          day1.date.localeCompare(day2.date),
      )
    })

}