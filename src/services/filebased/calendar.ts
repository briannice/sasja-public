import { GameModel, TeamCompetition } from '@/types/models'
import { promises as fs } from 'fs'
import yaml from 'js-yaml'

export const getFileBasedCalendar = async (competition: TeamCompetition) => {
  const file = await fs.readFile(process.cwd() + '/static/yaml/calendar/'+competition.name+'.yaml', 'utf8');

  return yaml.load(file) as GameModel[];
}

export const getFileBasedCalendarFull = async (competition: TeamCompetition) => {
  //no way to retrieve full calendar for SHL yet
  return getFileBasedCalendar(competition);
}
