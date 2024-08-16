import { GameDay, TeamCompetition } from '@/types/models'
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
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'


export const getCompetitionCalendar = async (competition: TeamCompetition) => {
  if (FILE_BASED_COMPETITIONS.includes(competition.name))
    return getFileBasedCalendar(competition)
  return getHandballBelgiumCalendar(competition.serieId)
}

export const getCompetitionCalendarFull = async (competition: TeamCompetition) => {
  const games = FILE_BASED_COMPETITIONS.includes(competition.name)
    ? getFileBasedCalendarFull(competition)
    : getHandballBelgiumCalendarFull(competition.serieId)

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
  return Promise.all([getFutureHandballBelgiumGames(), getFutureFileBasedGames()])
    .then((games) => games.flat())
    .then((games) => {
      const gameDays: GameDay[] = []

      let last_date = ''
      games.forEach((game) => {
        if (game.serie_id)
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