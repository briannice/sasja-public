import { GameModel, TeamCompetition } from '@/types/models'
import { promises as fs } from 'fs'
import yaml from 'js-yaml'
import { getDateRangeForGamesOverview } from '@/utils/date'
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'

export const getFileBasedCalendar = async (competition: TeamCompetition) => {
  const file = await fs.readFile(process.cwd() + '/static/yaml/calendar/' + competition.name + '.yaml', 'utf8')

  const games = yaml.load(file) as GameModel[]
  return games.map((game) => {
    game.serie_id = competition.serieId
    game.serie_name = competition.name
    game.serie_short = competition.name
    return game
  })
}

export const getFileBasedCalendarFull = async (competition: TeamCompetition) => {
  //no way to retrieve full calendar for SHL yet
  return getFileBasedCalendar(competition)
}

export const getFileBasedGameweeks = async (weeks: number) => {
  const [start_date, end_date] = getDateRangeForGamesOverview(weeks)
  return Promise.all(
    FILE_BASED_COMPETITIONS.map((competition) =>
      getFileBasedCalendar(competition)),
  ).then((games) =>
    games.flat(),
  ).then((games) =>
    games.filter((game) => {
      const gameDate = new Date(game.date).getTime()
      return gameDate >= new Date(start_date).getTime() && gameDate <= new Date(end_date).getTime()
    }),
  )
}

export const getFutureFileBasedGames = async () => {
  const [start_date] = getDateRangeForGamesOverview(0)
  return Promise.all(
    FILE_BASED_COMPETITIONS.map((competition) =>
      getFileBasedCalendar(competition)),
  ).then((games) =>
    games.flat(),
  ).then((games) =>
    games.filter((game) => {
      return new Date(game.date).getTime() >= new Date(start_date).getTime()
    }),
  )
}