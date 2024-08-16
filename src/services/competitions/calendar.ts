import { TeamCompetition } from '@/types/models'
import { getHandballBelgiumCalendar } from '@/services/hb/calendar'
import { getFileBasedCalendar } from '@/services/filebased/calendar'

export const getCompetitionCalendar = async (competition: TeamCompetition) => {
  if (competition.name == 'Super Handball League')
    return getFileBasedCalendar(competition)
  return getHandballBelgiumCalendar(competition.serieId)
}
