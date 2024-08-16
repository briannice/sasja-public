import { RankModel, TeamCompetition } from '@/types/models'
import { promises as fs } from 'fs'
import yaml from 'js-yaml'

export const getFileBasedRanking = async (competition: TeamCompetition) => {
  const file = await fs.readFile(process.cwd() + '/static/yaml/ranking/'+competition.name+'.yaml', 'utf8');
  return yaml.load(file) as RankModel[];
}

