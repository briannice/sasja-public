import { promises as fs } from 'fs'
import yaml from 'js-yaml'

import { CompetitionIntegration } from '@/services/competitions/competition'
import { FILE_BASED_COMPETITIONS } from '@/services/competitions/filebased/competitions'

import { GameModel, RankModel, TeamCompetition } from '@/types/models'

import { getDateRangeForGamesOverview } from '@/utils/date'

export class FileBasedCompetitionIntegration implements CompetitionIntegration {
  public async getCompetitionCalendar(competition: TeamCompetition): Promise<GameModel[]> {
    const file = await fs.readFile(
      process.cwd() + '/static/yaml/calendar/' + competition.name + '.yaml',
      'utf8'
    )

    const games = yaml.load(file) as GameModel[]
    return games.map((game) => {
      game.serie_id = competition.serieId
      game.serie_name = competition.name
      game.serie_short = competition.name
      return game
    })
  }

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    //no way to retrieve full calendar for SHL yet
    return this.getCompetitionCalendar(competition)
  }

  public async getFutureGames(): Promise<GameModel[]> {
    const [start_date] = getDateRangeForGamesOverview(0)
    const games = await Promise.all(
      FILE_BASED_COMPETITIONS.map((competition) => this.getCompetitionCalendar(competition))
    )
    return games.flat().filter((game) => {
      return new Date(game.date).getTime() >= new Date(start_date).getTime()
    })
  }

  public async getGameWeeks(weeks: number): Promise<GameModel[]> {
    const [start_date, end_date] = getDateRangeForGamesOverview(weeks)
    const games = await Promise.all(
      FILE_BASED_COMPETITIONS.map((competition) => this.getCompetitionCalendar(competition))
    )
    return games.flat().filter((game) => {
      const gameDate = new Date(game.date).getTime()
      return gameDate >= new Date(start_date).getTime() && gameDate <= new Date(end_date).getTime()
    })
  }

  public async getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    const file = await fs.readFile(
      process.cwd() + '/static/yaml/ranking/' + competition.name + '.yaml',
      'utf8'
    )
    return yaml.load(file) as RankModel[]
  }
}
