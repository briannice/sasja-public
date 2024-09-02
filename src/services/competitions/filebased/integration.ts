import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { AbstractCompetitionIntegration } from '@/services/competitions/abstract/integration'
import yaml from 'js-yaml'
import { FILE_BASED_COMPETITIONS } from '@/services/competitions/competition'
import { promises as fs } from 'fs'

export class FileBasedCompetitionIntegration extends AbstractCompetitionIntegration {

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const file = await fs.readFile(process.cwd() + '/static/yaml/calendar/' + competition.name + '.yaml', 'utf8')

    const games = yaml.load(file) as GameModel[]
    return games.map((game) => {
      game.serie_id = competition.serieId
      game.serie_name = competition.name
      game.serie_short = competition.name
      return game
    })
  }

  public getAllCompetitions(): TeamCompetition[] {
    return FILE_BASED_COMPETITIONS
  }

  public async getCompetitionRanking(competition:TeamCompetition): Promise<RankModel[]> {
    const file = await fs.readFile(process.cwd() + '/static/yaml/ranking/' + competition.name + '.yaml', 'utf8')
    return yaml.load(file) as RankModel[]
  }
}