import { GameDay, TeamCompetition } from '@/types/models'
import { getHandballBelgiumCalendar, getHandballBelgiumCalendarFull } from '@/services/hb/calendar'
import { getFileBasedCalendar, getFileBasedCalendarFull } from '@/services/filebased/calendar'
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'

export const getCompetitionCalendar = async (competition: TeamCompetition) => {
  if (competition.name in FILE_BASED_COMPETITIONS)
    return getFileBasedCalendar(competition)
  return getHandballBelgiumCalendar(competition.serieId)
}

export const getCompetitionCalendarFull = async (competition: TeamCompetition) => {
  let games = getHandballBelgiumCalendarFull(competition.serieId)
  if (competition.name in FILE_BASED_COMPETITIONS)
    games = getFileBasedCalendarFull(competition)

  return games.then((games) => {
    const gameDays: GameDay[] = []

    let last_date = ''
    games.forEach((game) => {
      if (game.date === last_date) {
        gameDays[gameDays.length - 1].games.push(game)
      } else {
        gameDays.push({date: game.date, games: [game]})
        last_date = game.date
      }
    })
    return gameDays
  })
}