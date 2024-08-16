import { GameModel, TeamCompetition } from '@/types/models'
import { promises as fs } from 'fs'
import yaml from 'js-yaml'
import { getDateRangeForGamesOverview } from '@/utils/date'
import { FILE_BASED_COMPETITIONS } from '@/services/filebased/competitions'

export const getFileBasedCalendar = async (competition: TeamCompetition) => {
  const file = await fs.readFile(process.cwd() + '/static/yaml/calendar/' + competition.name + '.yaml', 'utf8')

  return yaml.load(file) as GameModel[]
}

export const getFileBasedCalendarFull = async (competition: TeamCompetition) => {
  //no way to retrieve full calendar for SHL yet
  return getFileBasedCalendar(competition)
}

export const getFileBasedGameweeks = async (weeks: number) => {
  const [start_date, end_date] = getDateRangeForGamesOverview(weeks)
  return Promise.all(
    FILE_BASED_COMPETITIONS.map((name) =>
      getFileBasedCalendar({ name: name } as TeamCompetition)),
  ).then((games) =>
    games.flat()
  ).then((games) =>
    games.filter((game) => {
      const gameDate = new Date(game.date).getTime()
      return gameDate >= new Date(start_date).getTime() && gameDate <= new Date(end_date).getTime()
    }),
  )
}